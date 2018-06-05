//a basic "snake" game, but transformed so the player needs to "catch" the documents needed for the registration office (Bürgeramt in german)
//it has no end, it just gets harder. It ends just if you die (hit the wall)
//levels are descriptive and not numeric.

$(document).ready(function(){
 
  var direction = 'right'; //starting direction
  var speed = 600; //the starting speed
  var ticker = null; 
  var doc = []; //placeholder for the document 
  var score = 0;
  var size = 20;
  var snakeCells = [10, 14];
  var snakeHead = [10, 14];
  

  function renderSnake (){
    $('td').removeClass('snakeCell snakeHead');
    for (var cell in snakeCells){
      $('tr').eq( snakeCells[cell][0] ).find('td').eq(snakeCells[cell][1]).addClass('snakeCell');
    }
  }

  //function for moving the person around
  function updateSnakeCell(){
    var snakeNewHead = [];
    switch(direction){
      case 'right':
        snakeNewHead = [ snakeHead[0], snakeHead[1]+1 ];
        break;
      case 'left':
        snakeNewHead = [ snakeHead[0], snakeHead[1]-1 ];
        break;
      case 'up':
        snakeNewHead = [ snakeHead[0]-1, snakeHead[1] ];
        break;
      case 'down':
        snakeNewHead = [ snakeHead[0]+1, snakeHead[1] ];
        break;
    }

    //when hitting the document, this happens
    var newCell = $('tr').eq(snakeNewHead[0]).find('td').eq(snakeNewHead[1]);

    if( newCell.length == 0 ) {
      gameOver();
    } else {
        if(newCell.hasClass('documentCell') ) {
          getdoc();
          renderdoc();
          // set the "levels" of what happens. Each time the person hits the document, a new message is displayed.          
          $('#scoreBoard').html('Your Score : ' + score);
          speed = speed - 10 > 5 ? speed - 10 : speed;
          clearInterval(ticker);
          startGame();
        }
        snakeCells[0] = snakeHead = snakeNewHead;
        renderSnake();
      }
    }


  //function for getting a random number
  function getRandomNumber( limit ) {
    return parseInt(Math.random() * limit % limit);
  }

  //function for binding keys with the direction
  function getNewDirection( keyCode ) {
    var codes = {
      37 : 'left',
      38 : 'up',
      39 : 'right',
      40 : 'down'
    };

    //function for binding keys with the direction
    if ( typeof codes[ keyCode ] != 'undefined' ) {
      var newDirection = codes[ keyCode ], changeDirection = true;
      switch( direction ) {
        case 'up' :
          changeDirection = newDirection != 'down';
          break;
        case 'down' :
          changeDirection = newDirection != 'up';
          break;
        case 'right' :
          changeDirection = newDirection != 'left';
          break;
        case 'left' :
          changeDirection = newDirection != 'right';
          break;
      }
      direction = changeDirection ? newDirection : direction;
    }
  }

////////the function for rendering the board size (got it from StackOverflow, not mine)
  function renderBoard() {
    var rowhtml = '';
    for(var i = 0; i < size; i++) {
      rowhtml +='<td cellpadding="0" cellspacing="0"></td>'
    }
    html = [];
    for( var i = 0; i < size; i++ ) {
      html.push( '<tr cellpadding="0" cellspacing="0">' + rowhtml + '</tr>');
    }
    $(document.body).append('<table>' + html.join( '\n' ) + '</table>');
    getdoc();
  }


//////////operations regarding appearing/dissapearing of the document
   //getting a random document location each time.
   function getdoc() {
    doc = [getRandomNumber($('tr').length), getRandomNumber($('tr:eq(0)>td').length)];
  }

  function renderdoc() {
    $('td').removeClass( 'documentCell' ); //removing the doc when the person hits it
    $('tr').eq( doc[0] ).find('td').eq(doc[1]).addClass('documentCell'); //generating a new doc
  }

  //the updater for the speed and the auto-update of the position
  function startGame() {
    ticker = setInterval(updateSnakeCell, speed);
  }

  //what to display when the game is over
  function gameOver() {
    $('div.gameOver').show('fast', function() {
      $(this).animate({top:250}, 'slow');
    });
    clearInterval(ticker);
  }

  //initiating the game
    renderBoard();
    renderdoc();
    $( document ).bind('keydown', function(e) {
      getNewDirection(e.keyCode);
    });
    startGame();
  });