class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  clickSquare(e) {
    if (e.target === e.currentTarget) {
      return;
    }
    const $li = $(e.target);
    const int = parseInt($li.attr('id'));
    const row = Math.floor(int / 3);
    const col = int % 3;
    const pos = [row, col];
    const mark = this.game.currentPlayer;
    try {
      this.game.playMove(pos);
    } catch(err) {
      alert("Invalid square choice!");
      return;
    }
    this.makeMove($li, mark);
    if (this.game.isOver()) {
      if (this.game.winner()) {
        alert("Congratulations, player " + mark + " won!");
      } else {
        alert("No winner :(");
      }
    }
  }

  bindEvents() {
    const $ul = $("ul");
    $ul.on('click', this.clickSquare.bind(this));
  }

  makeMove($square, mark) {
    $square.addClass("clicked");
    $square.append(mark);
  }

  setupBoard() {
    const $ul = $("<ul>");
    this.$el.append($ul);
    for (let i = 0; i < 9; i++) {
      const $li = $("<li>");
      $li.attr('id', `${i}`);
      $ul.append($li);
    }
  }
}

module.exports = View;
