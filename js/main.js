$(document).ready(function(){
$(function(){
  $("#dialog").dialog(){  //setting the dialog box displaying each time you open the page

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
});
});




