let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newGameBtn= document.getElementById("new-game");
let restartBtn= document.getElementById("restart");
let msgRef = document.getElementById("message");

//Winning pattern Array
let winningPattern = [
    [0,1,2],
    [0,3,6],
    [2,5,8],
    [6,7,8],
    [1,4,5],
    [1,4,7],
    [0,4,8],
    [2,4,6],
];

// If you get time get to understand this xturn concept in greater depth <3

//Player X plays first
let xTurn = true;
let count = 0;

//Disable all buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));

    //enable popUp
    popupRef.classList.remove("hide");
};

//Enable all butttons (for new game and restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });

    //disable popup
    popupRef.classList.add("hide");
};

const winFunction = (letter) => {
    disableButtons();
    if(letter == "X"){
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins!";
    } else{
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins!";
    }
};

const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F601; <br> Its a draw...";
};

//New Game
newGameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

restartBtn.addEventListener("click", () => {
    count =0;
    enableButtons();
});



// // This function is executed when a player wins
// const winFunction = (letter) => {
//     disableButtons();
// };

//Win-Logic
winChecker = () => {
    //Loop through all win patterns
    for(let i of winningPattern){
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ]
        
        //Check if elements are filled
        //If three empty elements are the same and would give a win as would

        if(element1 != "" && (element2 != "") & (element3 != "")){
            if (element1 == element2 && element2 == element3){
                //if all 3 elements have the same values then pass the values to winFunction
                winFunction(element1);
            }
        }
    }
};

//Display x/o for each click.
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if(xTurn){
            xTurn = false;
            //display x
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn= true;
            element.innerText = "O";
            element.disabled = true;
        }

        //Increment count on each click.
        count +=1;
        if (count == 9){
            drawFunction();
        }

        //Check for win on every click
        winChecker();
    });
});

//Enable buttons and disable popup on page load
window.onload = enableButtons;



