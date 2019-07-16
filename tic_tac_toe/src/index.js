const View = require('./ttt-view.js') // require appropriate file
const Game = require('../solution/game.js')// require appropriate file

window.Game = Game;
window.View = View;


  $(() => {
    const game = new Game();
    console.log(game);
    $el = $(".ttt");
    const view = new View(game, $el);
  });
