const buttonColors = ["red", "green", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

function nextSequence() {
  userPattern = [];
  let randomNum = Math.floor(Math.random() * 4);
  let randomColor = buttonColors[randomNum];
  let btn = $(`#${randomColor}`);
  btn.addClass(`${randomColor}-lit`);
  gamePattern.push(randomColor);
  playSound(randomColor);
  level++;
  $("h1").text(`Level ${level}`);
  setTimeout(function () {
    btn.removeClass(`${randomColor}-lit`);
  }, 200);
}

function userChoice(color) {
  if (started) {
    userPattern.push(color);
    playSound(color);
    animatePress(color);
    checkAnswer(userPattern.length - 1);
  }
}

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    let wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("h1").text("Game Over!");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $("p").show();
}

function playSound(color) {
  let btnAudio = new Audio(`sounds/${color}.mp3`);
  btnAudio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

$(document).on("keydown", function () {
  if (!started) {
    $("p").hide();
    started = true;
    flashAll();
    setTimeout(nextSequence, 800);
  }
});

$("body").on("tap", function () {
  if (!started) {
    $("p").hide();
    started = true;
    flashAll();
    setTimeout(nextSequence, 800);
  }
});

$(".btn").on("click", function (event) {
  userChoice(event.currentTarget.id);
});

function flashAll() {
  $("#green").addClass("green-lit");
  setTimeout(function () {
    $("#green").removeClass("green-lit");
    $("#red").addClass("red-lit");
  }, 100);
  setTimeout(function () {
    $("#red").removeClass("red-lit");
    $("#blue").addClass("blue-lit");
  }, 200);
  setTimeout(function () {
    $("#blue").removeClass("blue-lit");
    $("#yellow").addClass("yellow-lit");
  }, 300);
  setTimeout(function () {
    $("#yellow").removeClass("yellow-lit");
  }, 400);
}

flashAll();
