//---------------------dom element--------------------

let output = document.getElementById("output");
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

        // ------------Define arrays for number words------------
        let ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        let tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        let thousands = ['', 'thousand', 'million', 'billion', 'trillion'];


        let number = input.value;

        number = number.split("");

        mainfunction(number);
        lastWork(number);

        function mainfunction(currentArray) {
            switch (currentArray.length) {
                case 1:
                    currentArray[0] = ones[currentArray[0]];
                    break;
                case 2:
                    currentArray[0] = tens[currentArray[0]];
                    currentArray[1] = ones[currentArray[1]];
                    break;
                case 3:
                    currentArray[0] = ones[currentArray[0]] + " hundred";
                    currentArray[1] = tens[currentArray[1]];
                    currentArray[2] = ones[currentArray[2]];
                    break;
                case 4:
                    currentArray[0] = tens[currentArray[0]] + " thousand";
                    currentArray[1] = ones[currentArray[1]] + " hundred";
                    currentArray[2] = tens[currentArray[2]];
                    currentArray[3] = ones[currentArray[3]];
                    break;
                case 5:
                    currentArray[0] = tens[currentArray[0]];
                    currentArray[1] = ones[currentArray[1]] + " thousand";
                    currentArray[2] = ones[currentArray[2]] + " hundred";
                    currentArray[3] = tens[currentArray[3]];
                    currentArray[4] = ones[currentArray[4]];
                    break;
                case 6:
                    currentArray[0] = ones[currentArray[0]] + " million";
                    currentArray[1] = tens[currentArray[1]];
                    currentArray[2] = ones[currentArray[2]] + " thousand";
                    currentArray[3] = ones[currentArray[3]] + " hundred";
                    currentArray[4] = tens[currentArray[4]];
                    currentArray[5] = ones[currentArray[5]];
                    break;
                case 7:
                    currentArray[0] = tens[currentArray[0]];
                    currentArray[1] = ones[currentArray[1]] + " million";
                    currentArray[2] = tens[currentArray[2]];
                    currentArray[3] = ones[currentArray[3]] + " thousand";
                    currentArray[4] = ones[currentArray[4]] + " hundred";
                    currentArray[5] = tens[currentArray[5]];
                    currentArray[6] = ones[currentArray[6]];
                    break;
                default:
                    let number_extra = [];
                    for (let i = 0; currentArray.length > 7; i++) {

                        if (currentArray.length % 7 === 0) {

                            if (currentArray.length !== 7) {

                                number_extra[i] = currentArray.splice(0, 7);
                            }


                        } else if (currentArray.length % 7 !== 0) {

                            number_extra[i] = currentArray.splice(0, currentArray.length % 7);

                        } else {
                            console.log("something worng");
                        }
                    }

                    number_extra.forEach((value) => {
                        mainfunction(value);
                    });

                    mainfunction(number);


                    number_extra.forEach((value) => {
                        value.push("billion");
                    });

                    number = [number_extra, number].flat(2);
                    break;
            }
        }

        function lastWork(lastTask) {

            lastTask = lastTask.join(" ");
            //1 to 19
            lastTask = lastTask.replace("ten one", "eleven");
            lastTask = lastTask.replace("ten two", "twelve");
            lastTask = lastTask.replace("ten three", "thirteen");
            lastTask = lastTask.replace("ten four", "fourteen");
            lastTask = lastTask.replace("ten five", "fifteen");
            lastTask = lastTask.replace("ten six", "sixteen");
            lastTask = lastTask.replace("ten seven", "seventeen");
            lastTask = lastTask.replace("ten eight", "eighteen");
            lastTask = lastTask.replace("ten nine", "nineteen");
            lastTask = lastTask.replace(",", " ");

            output.innerText = lastTask;
        }


    }

}



function wordToNumberConverter() { }

function ResetAll() {
    input.value = "";
    output.innerText = "Output";
}

