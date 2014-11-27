//variables
var failCounter = 0;
var idNum = 0;
var interval = 1500;
var successCounter = 0;

//===============================================
//user defined functions
//===============================================

//===============================================
//gameStart is called each time the user clicks on the "OK" button
//===============================================

function gameStart() {
  var intervalId;

  //all of the "action" of the tiles game occurs within a setInterval function - this is our event
  //loop. by declaring var intervalId and saving it, we can clear unneeded event loops

  intervalId = setInterval(function () {

    //first, we clear all highlights and then choose a tile at random and highlight it
    tiles.removeClass("highlight");
    var randomId = "#tiles-" + Math.floor((Math.random() * 64) + 1);
    $(randomId).addClass("highlight");

    //event binder for "click"
    $(".highlight").on("click", function () {
      if($(".highlight:hover").length != 0) {   // <-- this line of code is from http://stackoverflow.com/questions/
                                                // 1273566/how-do-i-check-if-the-mouse-is-over-an-element-in-jquery
        successCounter++;                      //it prevents false positives
      }
    });
    //failCounter increments on each iteration of the loop,
    failCounter++;                    //forcing user to either play along or lose



    //we need to clear previous interval ID or that one will run along with the new one we create,
    //causing tiles to flash at improper intervals. We also need to unbind old click handler. If we
    //don't unbind click handler, the first click of each new round will register multiple times.

    if (successCounter >= 10) {
      failCounter = 0;
      successCounter = 0;
      clearInterval(intervalId);
      $("div").off("click");
      successfulLevel();
    }
    if (failCounter >= 20) {
      clearInterval(intervalId);
      gameFail();
    }
  }, interval);
}

//display closing dialog box using jQuery UI dialog box construct
function gameDone() {
  $("#dialogQuit").dialog({
    modal: true,
    show: "blind",
    width: "500"
  });
  //hide the default close button
  $("div#dialogQuit").dialog().prev().find(".ui-dialog-titlebar-close").hide();
  $("#border").effect("fold", {mode: "hide"}, 4000);
}

//display when player fails level
function gameFail() {
  $("#dialogFail").dialog();                                                   //display "Game Over" dialog box
  $("#dialogFail").dialog().prev().find(".ui-dialog-titlebar-close").hide();   //hide the default close button
  $("#border").effect("fold", {mode: "hide"}, 8000);
}

//display winning level dialog box
function successfulLevel(){
  
  var $dialogSuccess = $("#dialogSuccess");
  
  $dialogSuccess.dialog({
    modal: true,
    show: "puff",
    width: "540",
    buttons: {
      "C'MON DAD! This time FASTER!": function(){
        interval *= .88;
        $dialogSuccess.dialog("close");
        gameStart();
      },
      "Stick a fork in me, I'm done": function(){
        $dialogSuccess.dialog("close");
        gameDone();
      }
    }
  });
  
  $dialogSuccess.dialog().prev().find(".ui-dialog-titlebar-close").hide();   //hide the default close button

}

//===============================================
// In this first section, we set up our HTML elements dynamically
//===============================================

//create an 8x8 grid of divs with appropriate classes for styling
for (var i = 1; i < 9; i++) {
  for (var j = 1; j < 9; j++) {
    $("div#border").append("<div class=\"col" + j + " row" + i + "\"></div>");
  }
}

//add unique id's to every div
var tiles = $("div#border>div");

tiles.each(function () {
  idNum++;
  var idString = "tiles-" + idNum;
  $(this).attr({id: idString});
});

//FontAwesome used for symbols on individual tiles. Here, we apply them by rows
$(".row1").addClass("fa-tags").append(document.createTextNode(""));                   // 
$(".row2").addClass("fa-music").append(document.createTextNode(""));                  // 
$(".row3").addClass("fa-weibo").append(document.createTextNode(""));                  // 
$(".row4").addClass("fa-fighter-jet").append(document.createTextNode(""));            // 
$(".row5").addClass("fa-stack-overflow").append(document.createTextNode(""));         // 
$(".row6").addClass("fa-github-square").append(document.createTextNode(""));          // 
$(".row7").addClass("fa-eye-slash").append(document.createTextNode(""));              // 
$(".row8").addClass("fa-leaf").append(document.createTextNode(""));                   // 

//display opening dialog box

var $dialogStart = $("#dialogStart");

$dialogStart.dialog({
  modal: true,
  show: "puff",
  hide: "blind",
  width: "540",
  buttons: {
    "Yeah, why not...": function(){
      $dialogStart.dialog("close");
      gameStart();
    },
    "No way...I'm outta here!": function(){
      $dialogStart.dialog("close");
      gameDone();
    }
  }
});

//hide the default close button
$dialogStart.dialog().prev().find(".ui-dialog-titlebar-close").hide();

