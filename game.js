var levl = 0;
var started = false;
$(document).keypress(function (event) {
    if (!started) {
        $("#level-title").text("Level " + levl);
        nextSequence();
        started = true;
    }
});

var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over! Press Any Key to Restart.");

        startOver();
    }
}


function nextSequence() {

    userClickedPattern = [];

    levl++;

    $("#level-title").text("Level " + levl);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    var audio = new Audio("./sounds/" + randomChosenColor + ".mp3");
    audio.play();
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    levl = 0;
    started = false;
    gamePattern = [];
}