var audioList = getLevels();
var currentLevel = 1;
var timeoutId = 0;
$("#stop-msg").hide();

$(document).keypress(myFunction);
$("#turn-msg").click(myFunction);

function myFunction() {
  $("#turn-msg").css("font-size", "1rem");
  $(".start-stop").css("margin", "2% 40%");
  $("h1").text("Level " + currentLevel);
  document.onkeydown = function(e) {
    return false;
  };

  $("#stop-msg").show();
  $("#stop-msg").click(function(){location.reload();});
  $("#turn-msg").show();
  $("#turn-msg").text("Listen & Watch");
  $(".btn").css("pointer-events", "none");

  var playedBtns = playAudio(audioList, currentLevel);
  afterAudioPlayed(currentLevel);

  timeToLose = setTimeout(function(){
    lostGame();
  },currentLevel*800+200+currentLevel*1000+500);

  var countClick = 0;
  var clickedBtns = [];
  $(".btn").click(function(event) {
      clickedBtns.push("sounds/"+event.currentTarget.id+".mp3");
      makeSound(event.currentTarget.id);
      countClick++;
      var is_same = (playedBtns.length == clickedBtns.length) && playedBtns.every(function(element, index) {
        return element === clickedBtns[index];
      });
      if (timeToLose > 0) {
        if (countClick==currentLevel) {
          $(".btn").off("click");
          console.log(is_same);
          if (is_same==true) {
            clearTimeout(myTime);
            clearTimeout(timeToLose);
            mySec = 0;
            currentLevel++;
            $(".btn").on("click");
            $("#turn-msg").text("⭐").css("font-size", "2rem");
            setTimeout(function(){
              $("#turn-msg").css("font-size", "1rem");
              myFunction();
            },1000);
          } else {
            lostGame();
          }
        }
      } else {
          lostGame();
      }

  });
}

function getLevels() {
  var levelNumber = 0;
  var audioList = [];
  while (levelNumber < 60) {
    audioList.push(Math.floor(Math.random() * 4));
    levelNumber++;
  }
  return audioList;
}

var myTime;
var mySec = 0;
function startTime () {
  var countDown = currentLevel+1-Math.floor((new Date().getSeconds()/new Date().getSeconds()) + mySec);
  $("#turn-msg").text("Time Left: "+countDown);
  if ($("h1").html().includes("You Lost")) {
    $("#turn-msg").text("Yes");
  }
  mySec+=0.5;
  myTime = setTimeout(function(){ startTime(); }, 500);
}

function afterAudioPlayed(currentLevel){
  setTimeout(function(){
    clearTimeout(myVar);
    document.onkeydown = function(e) {return true;};
    $(".btn").css("pointer-events", "auto");
    myVar = null;
    startTime();
  },800*currentLevel+200);
}

function lostGame () {
  makeSound();
  clearTimeout(myTime);
  clearTimeout(timeToLose);
  myTime = null;
  mySec = 0;
  $(".btn").off("click");
  $("h1").text("You Lost... Try Again?");
  $("#turn-msg").text("Yes").click(function(){location.reload();});
}


var myVar;

function playAudio(audioList, currentLevel) {
  var fileList = [];
  var bb = ["green", "red", "yellow", "blue"];
  audioList.forEach(function(element) {
    fileList.push("sounds/" + bb[element] + ".mp3");
  });
  myBoundMethod = (function(sProperty) {
    var bb = new Audio(arguments.length > 0 ? this[sProperty] : this);
    bb.play();
    if (bb.src.includes("green")) {
      $(".green").css("background-color", "#32ff6a");
      setTimeout(function() {
        $(".green").css("background-color", "green");
      }, 300);
    } else if (bb.src.includes("red")) {
      $(".red").css("background-color", "#ff9191");
      setTimeout(function() {
        $(".red").css("background-color", "red");
      }, 300);
    } else if (bb.src.includes("yellow")) {
      $(".yellow").css("background-color", "#ffffc6");
      setTimeout(function() {
        $(".yellow").css("background-color", "yellow");
      }, 300);
    } else if (bb.src.includes("blue")) {
      $(".blue").css("background-color", "#aee7e8");
      setTimeout(function() {
        $(".blue").css("background-color", "blue");
      }, 300);
    }
  }).bind(fileList);
  for (var i = 0; i < currentLevel; i++) {
    myVar = setTimeout(myBoundMethod, 800 * i, i.toString());
  }
  return fileList.slice(0, currentLevel);
}


function makeSound(key) {
  switch (key) {

    case "green": // Detecting Green
      var green = new Audio("sounds/green.mp3");
      green.play();
      $(".green").css("background-color", "#32ff6a");
      setTimeout(function() {
        $(".green").css("background-color", "green");
      }, 300);
      break;
    case "4":
      var np4 = new Audio("sounds/green.mp3");
      np4.play();
      break;
    case "ArrowLeft":
      var arrowLeft = new Audio("sounds/green.mp3");
      arrowLeft.play();
      break;

    case "red": // Detecting Red
      var red = new Audio("sounds/red.mp3");
      red.play();
      $(".red").css("background-color", "#ff9191");
      setTimeout(function() {
        $(".red").css("background-color", "red");
      }, 300);
      break;
    case "5":
      var np5 = new Audio("sounds/red.mp3");
      np5.play();
      break;
    case "Clear":
      var clear = new Audio("sounds/red.mp3");
      clear.play();
      break;

    case "yellow": // Detecting Yellow
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      $(".yellow").css("background-color", "#ffffc6");
      setTimeout(function() {
        $(".yellow").css("background-color", "yellow");
      }, 300);
      break;
    case "1":
      var np1 = new Audio("sounds/yellow.mp3");
      np1.play();
      break;
    case "End":
      var end = new Audio("sounds/yellow.mp3");
      end.play();
      break;

    case "blue": // Detecting Blue
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      $(".blue").css("background-color", "#aee7e8");
      setTimeout(function() {
        $(".blue").css("background-color", "blue");
      }, 300);
      break;
    case "2":
      var np2 = new Audio("sounds/blue.mp3");
      np2.play();
      break;
    case "ArrowDown":
      var arrowDown = new Audio("sounds/blue.mp3");
      arrowDown.play();
      break;

    default:
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
  }
}


//
// function checkTimeLeft () {
//   var timeToLose = $("#turn-msg").html().slice(10,13);
//   if (timeToLose == 0) {
//     console.log("timeToLose: ",timeToLose);
//     myStopFunction(0);
//   } else {
//     myTime = setTimeout(function(){ checkTimeLeft();}, 500);
//   }
//   return timeToLose;
// }

// function myStopFunction (currentLevel) {
//   setTimeout(function(){
//     clearTimeout(myTime);
//   },currentLevel*1000+500);
//   // currentLevel*800+currentLevel*1000+1600
//   myTime = null;
//   mySec = 0;
// }
//
// function myStopFunction2(currentLevel) {
//   setTimeout(function() {
//     clearTimeout(myVar);
//     document.onkeydown = function(e) {return true;};
//     $(".btn").css("pointer-events", "auto");
//   }, 800 * currentLevel + 100);
//   myVar = null;
//   setTimeout(function() {
//     startTime();
//     myStopFunction(currentLevel);
//   }, 800 * currentLevel + 500);
// }
