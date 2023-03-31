// created sets as an object(i think) for fun. Contains all possible characters in different arrays, as well as our empty tub to be added to by criteria. A tubreset function is also included to simplify clearing it at the end of password generation.
var sets = {
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    special: ['/', '%', '$', '#', '@', '^', '*', '(', ')'],
    lower: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    upper: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    tub: [],
    tubreset: function () { this.tub = [] }
}
var generateBtn = document.querySelector("#generate");
function generatePassword() {
  // Our length function prompts a response, if not within our requested range calls the function again to start us over until returning an acceptable value.
    function length() {
        var L = window.prompt("How long are we making the password?\nChoose a number between 8 and 120.")
        if (L > 8 && L < 120) {
            return L
        } else if (!L) {
            return
        }
        else {
            alert("More than 8... But less than 120... Try again.")
            return length();
        }
    }
    // Criteria, set up again as an object (I think?) just for fun. Tested out storing values, found a way to check for necessary repeat by just checking our tub for empty at the end of it.
    function getcriteria() {
        var checks = {
            up: function () { if (window.confirm("Are we including uppercase letters?")) { sets.tub.push(sets.upper) } },
            low: function () { if (window.confirm("Are we including lowercase letters?")) { sets.tub.push(sets.lower) } },
            num: function () { if (window.confirm("Are we using numbers today?")) { sets.tub.push(sets.numbers) } },
            sp: function () { if (window.confirm("Are we using special characters today?")) { sets.tub.push(sets.special) } },
            run: function () { this.up(); this.low(); this.num(); this.sp(); }
        }
        checks.run();
        if (sets.tub.length == 0) {
            alert("Hey man, you gotta give me something to work with. Try that again.")
            getcriteria();
        }
    }
    function getPassword(leng) {
        var new_password = '';
        for (let i = 0; i < leng; i++) {
            rtype = Math.floor(Math.random() * sets.tub.length)
            rindex = Math.floor(Math.random() * sets.tub[rtype].length)
            new_password += sets.tub[rtype][rindex]
        }
        sets.tubreset();
        console.log(sets.tub)
        return new_password;
    }
    var pass_length = length();
    getcriteria();
    return getPassword(pass_length)
}
function writePassword() {
    var passwordText = document.querySelector("#password");
    passwordText.value = generatePassword();
}
generateBtn.addEventListener("click", writePassword);