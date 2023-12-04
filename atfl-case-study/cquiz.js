document.addEventListener("DOMContentLoaded", function () {
    const checkAnswerButton = document.getElementById("checkanswer");

    if (checkAnswerButton) {
        checkAnswerButton.addEventListener("click", function () {
            // Navigate to the PHP file
            window.location.href = "D:\XAMPP\htdocs\CNYC\landing.php";
        });
    }

    const nextPageButton = document.getElementById("nextPageButton");

    if (nextPageButton) {
        nextPageButton.addEventListener("click", function () {
            // Navigate to another HTML file
            window.location.href = "custom-quiz.html";
        });
    }
});
document.getElementById("question_btn").onclick = function () {
    var title = document.getElementById("quizTitle");
    var userName = document.getElementById("userName");
    var quizTime = document.getElementById("time");
    var errorMsg = document.getElementById("error");
    var checkInt = parseInt(quizTime.value);

    if (title.value == 0 || userName.value == 0 || quizTime.value == 0) {
        errorMsg.innerHTML = "Please fill the empty fields";
        errorMsg.style.color = "red";
        title.focus();
    } else {
        errorMsg.innerHTML = "";
        localStorage.setItem("name", userName.value);
        localStorage.setItem("title", title.value);
        localStorage.setItem("time", checkInt);
        document.getElementById("start-screen").setAttribute("style", "display:none");
        document.getElementById("input-quiz").removeAttribute("style");
        document.getElementById("quizName").innerHTML = localStorage.getItem("quizTitle");
    }
}

var question = document.getElementById("question");
var opt1 = document.getElementById("option1");
var opt2 = document.getElementById("option2");
var opt3 = document.getElementById("option3");
var opt4 = document.getElementById("option4");
var answer = document.getElementById("answer");

function Questions(question, option1, option2, option3, option4, answer) {
    this.question = question;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
    this.answer = answer;
}

var arrQuestions = [];
var num = 2;
var index = 0;

document.getElementById("nxtQtn").onclick = function () {
    var error1 = document.getElementById("error1");
    if (question.value == 0 || opt1.value == 0 || opt2.value == 0 || opt3.value == 0 || opt4.value == 0) {
        error1.innerHTML = "Please fill out all the empty fields"
        error1.style.color = "red";
        question.focus();
    }
    else if (answer.selectedIndex === 0) {
        error1.innerHTML = "Please Select the answer";
        error1.style.color = "red";
        answer.focus();
    }
    else {
        error1.innerHTML = "";
        arrQuestions[index] = new Questions(question.value, opt1.value, opt2.value, opt3.value, opt4.value, answer.value);
        index++;

        question.value = null;
        opt1.value = null;
        opt2.value = null;
        opt3.value = null;
        opt4.value = null;
        answer.selectedIndex = 0;

        question.setAttribute("placeholder", "Question " + num.toString());
        num++;
    }
}

document.getElementById("done").onclick = function () {

    var error1 = document.getElementById("error1");
    if (question.value == 0 || opt1.value == 0 || opt2.value == 0 || opt3.value == 0 || opt4.value == 0) {
        error1.innerHTML = "Please fill out all the empty fields"
        error1.style.color = "red";
        question.focus();
    }
    else if (answer.selectedIndex === 0) {
        error1.innerHTML = "Please Select the answer";
        error1.style.color = "red";
        answer.focus();
    }
    else {
        error1.innerHTML = "";
        arrQuestions[index] = new Questions(question.value, opt1.value, opt2.value, opt3.value, opt4.value, answer.value);

        document.getElementById("input-quiz").setAttribute("style", "display:none");
        document.getElementById("created").removeAttribute("style");
        document.getElementById("madeBy").innerHTML = "Created by: " + localStorage.getItem("name");
        document.getElementById("titleOfQuiz").innerHTML = "Quiz Name: " + localStorage.getItem("title");
        document.getElementById("timeOfQuiz").innerHTML = "Duration: " + localStorage.getItem("time") + "min";
        document.getElementById("totalQuestions").innerHTML = "Total Questions: " + (index + 1).toString();
    }
}

var quizQuestion = document.getElementById("quizQuestion");
quizQuestion.style.color = "white";
var quizOptn1 = document.getElementById("optn1");
var quizOptn2 = document.getElementById("optn2");
var quizOptn3 = document.getElementById("optn3");
var quizOptn4 = document.getElementById("optn4");
var quizTimer = document.getElementById("quizTimer");
var result = 0;
var next = 0;
var score = 0;


document.getElementById("takeQuiz").onclick = function () {

    document.getElementById("created").setAttribute("style", "display:none");
    document.getElementById("mainQuiz").removeAttribute("style");
    quizQuestion.innerHTML = "Question "+ (next + 1).toString() + ": " + arrQuestions[0].question;
    quizOptn1.innerHTML = arrQuestions[0].option1;
    quizOptn2.innerHTML = arrQuestions[0].option2;
    quizOptn3.innerHTML = arrQuestions[0].option3;
    quizOptn4.innerHTML = arrQuestions[0].option4;


    var min = localStorage.getItem("time") - 1;
    var sec = 59;
    var timeStart = setInterval(function () {
        quizTimer.innerHTML = digits(min,sec);
        quizTimer.style.color = "white";

        sec--;
        if (min < 0) {
            clearInterval(timeStart);
            alert("TIME OUT");
            var totalScore = 100 / (index + 1);
            score = result * totalScore;
            score = Math.round(score);
            document.getElementById("mainQuiz").setAttribute("style", "display:none");
            document.getElementById("resultContainer").removeAttribute("style");
            var first = document.getElementById("congratz");
            var second = document.getElementById("yourScore");
            var third = document.getElementById("correctQuestions");
            if (score >= 60) {
                first.innerHTML = "Congratulations you Passed!";
                first.style.color = "#5BB06C";
            }
            else {
                first.innerHTML = "Sorry you Failed!";
                first.style.color = "red";
            }
            second.innerHTML = "Score Percentage: " + score + "%";
            third.innerHTML = "Score: " + result + "/" + (index + 1);
            second.style.color = "white";
            third.style.color = "white";
        }
        else if (sec == 0) {
            min--;
            sec = 60;
        }
    }, 1000)

    function digits(num1,num2){
        if(num1>9 && num2>9){
            return num1 + ":" + num2;
        }
        else if( num1<10 && num2>9){
            return "0" + num1 + ":" + num2;
        }
        else if(num1>9 && num2<10)
        {
            return num1 + ":" + "0" + num2;
        }
        else if (num1<10 && num2<10){
            return "0" + num1 + ":" + "0" + num2; 
        }
    }
}

document.getElementById("nextButton").onclick = function () {
    var correct = document.querySelector("input[name='option']:checked");
    if (correct == null) {
        document.getElementById("noSelect").innerHTML = "Please choose an option";
        document.getElementById("noSelect").style.color = "red";
    }
    else {
        document.getElementById("noSelect").innerHTML = "";
        correct.checked = false;
        if (correct.value == arrQuestions[next].answer) {
            result++;
        }
        if (next == arrQuestions.length - 1) {
            var totalScore = 100 / (index + 1);
            score = result * totalScore;
            score = Math.round(score);
            document.getElementById("mainQuiz").setAttribute("style", "display:none");
            document.getElementById("resultContainer").removeAttribute("style");
            var first = document.getElementById("congratz");
            var second = document.getElementById("yourScore");
            var third = document.getElementById("correctQuestions");
            if (score >= 60) {
                first.innerHTML = "Congratulations you Passed!";
                first.style.color = "#5BB06C";
            }
            else {
                first.innerHTML = "Sorry you Failed!";
                first.style.color = "red";
            }
            second.innerHTML = "Score Percentage: " + score + "%";
            third.innerHTML = "Score: " + result + "/" + (index + 1);
            second.style.color = "white";
            third.style.color = "white";
           
        }
        next++;
        if (next != arrQuestions.length) {
            quizQuestion.innerHTML = "Question " + (next + 1).toString() + ": " + arrQuestions[next].question;
            quizQuestion.style.color = "white";
            quizOptn1.innerHTML = arrQuestions[next].option1;
            quizOptn2.innerHTML = arrQuestions[next].option2;
            quizOptn3.innerHTML = arrQuestions[next].option3;
            quizOptn4.innerHTML = arrQuestions[next].option4;
        }
    }

}

document.getElementById("restartQuiz").onclick = function () {
    // Reset quiz-related variables for the user's progress
    result = 0;
    next = 0;
    score = 0;

    // Clear any displayed messages or values
    document.getElementById("noSelect").innerHTML = "";

    // Show the main quiz section
    document.getElementById("mainQuiz").removeAttribute("style");
    document.getElementById("resultContainer").setAttribute("style", "display:none");

    // Reset radio button selections
    var radioButtons = document.querySelectorAll("input[name='option']");
    radioButtons.forEach(function (button) {
        button.checked = false;
    });

    // Display the first question
    displayQuestion();
};

function displayQuestion() {
    // Display the current question
    quizQuestion.innerHTML = "Question " + (next + 1).toString() + ": " + arrQuestions[next].question;
    quizOptn1.innerHTML = arrQuestions[next].option1;
    quizOptn2.innerHTML = arrQuestions[next].option2;
    quizOptn3.innerHTML = arrQuestions[next].option3;
    quizOptn4.innerHTML = arrQuestions[next].option4;
}