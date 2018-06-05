$(document).ready(function(){
$(function(){
  $("#dialog").dialog({  //setting the dialog box displaying each time you open the page

    modal: true,
    draggable: true,
    resizable: false, 
    height: 100,
    width: 500,
    show: {
      effect: "blind",
      duration: 1000
    },
    hide: {
      effect: "blind",
      duration: 1000
    },
    buttons: {
      "YES, I N I T I A L I Z E": function () { //when you click on this, the dialogue disappears
        $(this).dialog('close');
    }
    }
});

  var player = "<div id='player'></div>";

  //function for moving the character with keys up/down etc

    $div_name = "#player"; //Name of the div I'm controlling
    $speed = 200; //Higher is slower
    $move = "100"; //Amount if px  I want to move the element by
    $("body").keydown(function (e) {
        e.preventDefault();
        switch (e.keyCode) {
            case 37:
                //left
                $($div_name).animate({
                    right: "+=" + $move
                }, $speed, function () {});
                break;
            case 38:
                //up
                $($div_name).animate({
                    bottom: "+=" + $move
                }, $speed, function () {});
                break;
            case 39:
                //right
                $($div_name).animate({
                    right: "-=" + $move
                }, $speed, function () {});
                break;
            case 40:
                //down
                $($div_name).animate({
                    bottom: "-=" + $move
                }, $speed, function () {});
                break;
        }
});

});
});




