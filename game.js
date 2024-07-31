//step 1 checking JS and jQuery
// alert("Hi");

//Step 2 Create a new pattern

var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
//step 4 Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
var userClickedPattern = [];

//step 7 
var started = false;
var level = 0;

$(document).keypress(function (e) { 
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;           
    }   
});

//step 4
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    //step 6
    animatePress(userChosenColour);
    //step 8
    checkAnswer(userClickedPattern.length-1);

});

//step 8 Check the User's Answer Against the Game Sequence8
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);     
        } 
    }
    //step 9
        else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            startOver();      
        } 
}

//step2
function nextSequence(){
    //step 7
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    //step 2
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //step 3 Use jQuery to select the button with the same id as the randomChosenColour
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    //step 5 Call a new function called playSound() that takes a single input parameter called name.
    playSound(randomChosenColour);
}

//step 3 and 5 play sound
function playSound(name){
    var audio = new Audio(name + ".mp3");
    audio.play();
}

//step 6 animate press
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

//step 10
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
