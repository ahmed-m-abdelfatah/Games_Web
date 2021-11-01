var msg1 = document.getElementById("message1"),
    msg2 = document.getElementById("message2"),
    msg3 = document.getElementById("message3"),
    answer = Math.floor(Math.random() * 100) + 1,
    no_of_guesses = 0,
    guessed_nums = [];

console.log(answer);

function play() {
    var user_guess = document.getElementById("guess").value;
    if (user_guess < 1 || user_guess > 100) {
        alert("Number between 1~100");
    }
    else {
        guessed_nums.push(user_guess);
        no_of_guesses += 1;
        if (user_guess < answer) {
            msg1.textContent = "Your guess is to low.";
            msg2.textContent = "No. Of Guess: " + no_of_guesses;
            msg3.textContent = "Guessed numbers are: " + "[" + guessed_nums + "]";
        }
        else if (user_guess > answer) {
            msg1.textContent = "Your guess is to high.";
            msg2.textContent = "No. Of Guess: " + no_of_guesses;
            msg3.textContent = "Guessed numbers are: " + "[" + guessed_nums + "]";
        }
        else {
            msg1.textContent = "Yes, you got the correct number";
            msg2.textContent = "The number was: " + answer;
            msg3.textContent = "You got it in " + no_of_guesses + " guess";
            document.getElementById("my_btn").disabled = true;
            document.querySelector("a").style.display = "block";
        }
    }
}