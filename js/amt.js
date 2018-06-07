//a basic catching game, but transformed so the player needs to "catch" the documents needed for the registration office (Bürgeramt in german)
//it has no end. It ends just if you die (hit the wall)
//levels are descriptive and not numeric.

$(document).ready(function(){
  $("#scoreBoard").hide(); 
  
  $('#start').on('click',function(){
    $("#start").hide(); 
    $(".hide").hide(); 
    $("#scoreBoard").show(); 

      var direction = 'right'; //starting direction
      var speed = 600; //the starting speed
      var counter = null;   
      var doc = []; //placeholder for the document 
      var score = ""; //I'll update that each time the person catches the document
      var person = [8, 8]; //initial person position


  //function for moving the person around
  function updatepersonCell(){
    var personNew = [];
    switch(direction){
      case 'right':
        personNew = [person[0], person[1]+1];
        break;
      case 'left':
        personNew = [person[0], person[1]-1];
        break;
      case 'up':
        personNew = [person[0]-1, person[1]];
        break;
      case 'down':
        personNew = [person[0]+1, person[1]];
        break;
    }

    //when catching the document, this happens
    var newCell = $('tr').eq(personNew[0]).find('td').eq(personNew[1]); 

    

    if(newCell.length == 0) {
      gameOver();
    } else {
        if(newCell.hasClass('documentCell') ) {
          getdoc();
          createNewDoc();
          score++;
          // set the "levels" of what happens. Each time the person hits the document, a new message is displayed.          
          $('#scoreBoard').html('Your Score : ' + score);
          clearInterval(counter);
          startGame();
        }
        person = personNew;
        movePerson();
      }
    }


  //function for getting a random number
  function getRandomNumber(limit) {
    return parseInt(Math.random() * limit % limit);
  }

  //function for binding keys with the direction

    function getNewDirection (event) {
      if (event.keyCode == 37 && direction != "right"){
        direction = "left";
      }
      if (event.keyCode == 39 && direction != "left"){
        direction = "right";
      }
      if (event.keyCode == 38 && direction != "down"){
        direction = "up";
      }
      else if (event.keyCode == 40 && direction != "up"){
        direction = "down";
      }
    };

//////////operations regarding appearing/dissapearing of the document
   //getting a random document location each time.
   function getdoc() {
    return doc = [getRandomNumber(20), getRandomNumber(20)];
  }

  function createNewDoc() {
    console.log(getRandomNumber(20));
    $('td').removeClass('documentCell'); //removing the doc when the person hits it
    $('tr').eq(getdoc()[0]).find('td').eq(getdoc()[1]).addClass('documentCell'); //adding the class documentCell to a row/column with an index of a random number between 1 and 20.
  }

  function movePerson (){
    $('td').removeClass('personCell');
    $('tr').eq(person[0]).find('td').eq(person[1]).addClass('personCell');     //moving the person by deleting and adding class personCell
  }

  ////////the function for creating the board (got it from StackOverflow, not mine)
  function createBoard() {
    var rowhtml = '';
    for(var i = 0; i < 20; i++) {
      rowhtml +='<td cellpadding="0" cellspacing="0"></td>'
    }
    html = [];
    for( var i = 0; i < 20; i++ ) {
      html.push('<tr cellpadding="0" cellspacing="0">' + rowhtml + '</tr>');
    }
    $(document.body).append('<table>' + html.join('\n') + '</table>'); //html.join('\n') makes a new line 
    getdoc();
  }


  //the updater for the speed and the auto-update of the position
  function startGame() {
    counter = setInterval(updatepersonCell, speed);
  }

  //initiating the game
    createBoard();
    createNewDoc();
    $(document).bind('keydown', getNewDirection);
    startGame();

  //what to display when the game is over
  function gameOver() {
    $('div.gameOver').show();
    clearInterval(counter);
    $("table").hide(); 
    $("#scoreBoard").hide();
  }
  });
  });