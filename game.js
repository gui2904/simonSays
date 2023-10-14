var gamePattern = []

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = []

var started = false;

var level = 0;

$(".btn").click("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    console.log(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    animatePress(userChosenColor);

});

function checkAnswer(currentLevel) {
    console.log(currentLevel);
    console.log(gamePattern[currentLevel]);
    console.log(gamePattern);

    console.log(userClickedPattern[currentLevel]);
    console.log(userClickedPattern);


    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("seccess.");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }

    } else {
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
      startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    level ++;
    $("h1").text("Level " + level);
}


function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    }, 100);
    setTimeout();

}

$(document).click(function() {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

