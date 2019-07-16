class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.$ul = null;
    this.startId = null;
    this.setupTowers();
    this.render();
    $("ul").on('click', this.clickTower.bind(this))
  }

  setupTowers() {
    for (let i = 0; i < 3; i++) {
      const $ul = $("<ul>");
      $ul.attr('id', `${i}`);
      this.$el.append($ul);
      for (let j = 0; j < 3; j++) {
        const $li = $("<li>");
        $ul.append($li);
      }
    }
  }

  render() {
    $(".disc1").removeClass("disc1");
    $(".disc2").removeClass("disc2");
    $(".disc3").removeClass("disc3");
    const $towers = $("ul")

    for (let i = 0; i < 3; i++) {
      const $tower = $towers.eq(i);
      const discs = this.game.towers[i];
      const $lis = $tower.children();
      let j = 2;
      discs.forEach((disc) => {
        $lis.eq(j).addClass(`disc${disc}`);
        j--;
      })
    }
  }

  clickTower(e) {
    const $ul = $(e.currentTarget);
    const towerId = parseInt($ul.attr('id'))
    if (this.startId === null) {
      this.startId = towerId; 
      this.$ul = $ul;
      this.$ul.addClass("selected");
    } else {
      const endId = towerId;
      if (this.game.move(this.startId, endId)) {
        this.render();
        if (this.game.isWon()) {
          alert("You won!");
        }
      } else {
        alert("Not a valid move!")
      }
      this.$ul.removeClass("selected");
      this.$ul = null;
      this.startId = null;
    }
  }

}

module.exports = View;