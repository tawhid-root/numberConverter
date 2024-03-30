//---------------------dom element--------------------

let input = document.getElementById("input");
let numberToWord = document.getElementById("NumberToWord");
let wordToNumber = document.getElementById("WordToNumber");
let Reset = document.getElementById("Reset");

//---------------what happend if click-------------------

numberToWord.addEventListener("click", numberToWordConverter);
wordToNumber.addEventListener("click", wordToNumberConverter);
Reset.addEventListener("click", ResetAll);

//----------------write ther function-----------------

function numberToWordConverter() {

    input.value = Number(input.value);

    if (input.value === "NaN" || input.value === "0") {

        input.value = "invalid";

    } else {

        // Define arrays for number words
        let ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        let teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        let tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        let thousands = ['', 'thousand', 'million', 'billion', 'trillion'];

        // Function to convert a number less than 1000 to words
        function convertLessThanOneThousand(number) {
            let numStr = '';

            if (number % 100 < 10) {

                numStr += ones[number % 10];
                number = Math.floor(number / 10);

            } else if (number % 100 < 20) {

                numStr += teens[number % 10];
                number = Math.floor(number / 100);

            } else {

                numStr += ones[number % 10];
                number = Math.floor(number / 10);

                numStr = tens[number % 10] + " " + numStr;
                number = Math.floor(number / 10);

            }

            if (number > 0) {

                numStr = (number >= 10) ? ones[Math.floor(number / 10)] + ' hundred ' + numStr : ones[number] + ' hundred ' + numStr;

            }

            return numStr;
        }

        // Main function to convert a number to words
        function convertNumberToWords(number) {
            if (number === 0) {
                return 'zero';
            }

            let numStr = '';
            let i = 0;

            do {
                let chunk = number % 1000;
                if (chunk !== 0) {
                    numStr = convertLessThanOneThousand(chunk) + " " + thousands[i] + ' ' + numStr;
                }
                number = Math.floor(number / 1000);
                i++;
            } while (number > 0);

            return numStr.trim();
        }

        // Example usage
        let number = input.value;
        let words = convertNumberToWords(number);
        input.value = words;


    }

}

function wordToNumberConverter() {
    // Define arrays for number words
    let onesMap = {
        'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4,
        'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9
    };
    let teensMap = {
        'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
        'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19
    };
    let tensMap = {
        'ten': 10, 'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50,
        'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90
    };
    let thousandsMap = {
        'thousand': 1000, 'million': 1000000, 'billion': 1000000000, 'trillion': 1000000000000
    };

    // Function to convert words to numbers
    function convertWordsToNumber(words) {
        let wordArray = words.toLowerCase().split(' ');

        let number = 0;
        let chunk = 0;

        for (let i = 0; i < wordArray.length; i++) {
            let word = wordArray[i];
            if (onesMap[word] !== undefined) {
                chunk += onesMap[word];
            }
            else if (teensMap[word] !== undefined) {
                chunk += teensMap[word];
            }
            else if (tensMap[word] !== undefined) {
                chunk += tensMap[word];
            }
            else if (thousandsMap[word] !== undefined) {
                number += chunk * thousandsMap[word];
                chunk = 0;
            }
            else if (word === 'hundred') {
                chunk *= 100;
            }
        }

        number += chunk;

        return number;
    }

    // Example usage
    let words = input.value;
    let number = convertWordsToNumber(words);
    input.value = number;

}

function ResetAll() {
    input.value = "";
    output.innerText = "Output";
}