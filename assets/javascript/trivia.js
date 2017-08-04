//furst let's inject our #id's and .Classes in ".ready" method when its accures.
$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); // function for MaterializeCSS parallax componenet
    $('.tooltipped').tooltip({ // delay function for button tool tips
        
    });


    $("#introSection").fadeIn(500 , function() { // fade in page elements
        // fadeIn function
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }
// the clock will start to go back during the "waiting" fot user's answer. 
    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30; //30 sec*
        var myInterval = setInterval(function() { 

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) { 
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 30
                }, 1000 * 10);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "When America Was Founded?",
            "c": ["1776", "1677", "1767"],
            "answer": 0
        },
        // question 2
        {
            "q": "Who did not sign the Declaration of Independence?",
            "c": ["George Washington", "John Hancock ", "Thomas Jefferson"],
            "answer": 0
        },
        // question 3
        {
            "q": "Which President was the only one to serve more than two terms?",
            "c": ["Abraham Lincoln", "Bill Clinton", "Franklin D. Roosevelt"],
            "answer": 2
        },
        // question 4
        {
            "q": "In what year did America land the first man on the moon?",
            "c": ["1966", "1996", "1969"],
            "answer": 2
        },
        // question 5
        {
            "q": "Which country did America buy the Louisiana Purchase from?",
            "c": ["France", "England", "Geamany"],
            "answer": 0
        },
        // question 6
        {
            "q": "On what day did the Great Depression start?",
            "c": ["white Sunday", "Black Tuesday", "Red Friday"],
            "answer": 1
        },
        // question 7
        {
            "q": "What were the two types of slaves?",
            "c": ["Barn and Field", "House and Field", "Public and Private"],
            "answer": 1
        },
        // question 8
        {
            "q": "How long was a field slaves work day?",
            "c": ["8 Hours", "Day and Night", "Sunrise to Sunset"],
            "answer": 2
        },
        // question 9
        {
            "q": "The deadliest war in American history is?",
            "c": ["Civil War", "Vietnam War", "World War II"],
            "answer": 0
        },
        // question 10
        {
            "q": "Who was the first American to go into space?",
            "c": ["Buzz Aldrin", "Alen B. Shaperd", "Neil Amrstrong"],
            "answer": 1
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops the game
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string and not as a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } 
            else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});
