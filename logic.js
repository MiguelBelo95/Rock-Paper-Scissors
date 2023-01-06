
const buttons = document.querySelectorAll(".btn");
const main = document.querySelector(".main");
const playerResult = document.querySelector('.player-result');
const computerResult = document.querySelector('.computer-result');
const endAlrt = document.querySelector("#end-alert");
const endDesc = document.querySelector("#end-desc");
const returnMainBtn = document.querySelector("#retry-btn");
const announceRound = document.getElementById('round-result');


let userResult = 0;
let cpuResult = 0;

playerResult.textContent = userResult;
computerResult.textContent = cpuResult;

const playerResultBorder = document.getElementById("result-player-box");
const computerResultBorder = document.getElementById("result-computer-box");


buttons.forEach(button => {
	button.addEventListener('click', playRound);
});

function getComputerChoice() {
	console.log('2. getComputerChoice()');
	const possibleChoice = ["rock", "paper", "scissor"];
	let randomNumber = Math.floor((Math.random() * 10) % 3);
	let computerChoice = possibleChoice[randomNumber];

	//Aplly choice highlight border
	const cpuChoiceBtn = document.getElementById(`${computerChoice}`);
	highlightBorder(cpuChoiceBtn, 'cpu');

	return computerChoice;
}

function playRound() {
	console.log('1. I\´m at the first stage, PlayRound()');
	const playerSelection = this.id;
	const computerChoice = getComputerChoice();
	const winner = checkWinner();
	console.log(`Winner: ${winner}`);

	if (!winner) {
		 setTimeout(() => {compareResults(playerSelection, computerChoice);}, 1500);
	}
	if (winner) {
		console.log("I never enter here, it seems");
		endGame();
	}
}

function highlightBorder(border, classType) {
	console.log('2.1 HighlightBorder() I should come here first');
	console.log(border);
	console.log(classType);
	border.classList.add(`${classType}`); //(${playing} || ${cpu})
	setTimeout(() => {removeTransition(border, classType);}, 1200);
}

function removeTransition(border, classType) {
	console.log('2.2 removeTransition() then disappear');
	border.classList.remove(`${classType}`);
}


function compareResults(playerSelection, computerSelection) {
	console.log('4. I pop when there\´s no winner ');
	playerSelection = playerSelection.toLowerCase();
	computerSelection = computerSelection.toLowerCase();
	let resultMsg = undefined;

	if (playerSelection == computerSelection) {
	  resultMsg = `It's a draw. You chose ${playerSelection} and the computer also!`;
	} else if (
	  (playerSelection == "rock" && computerSelection == "scissor") ||
	  (playerSelection == "paper" && computerSelection == "rock") ||
	  (playerSelection == "scissor" && computerSelection == "paper")
	) {
	  resultMsg = `You win!! You chose ${playerSelection}, which beats the computer choice, ${computerSelection}.`;
	  highlightBorder(playerResultBorder, "playing");
	  ++userResult;
	} else {
	  resultMsg = `Computer wins!! You chose ${playerSelection}, which loses against the computer choice, ${computerSelection}.`;
	  highlightBorder(computerResultBorder, "playing"); 
	  ++cpuResult;
	}
	announceRound.textContent = resultMsg;
	playerResult.textContent = userResult;
	computerResult.textContent = cpuResult;
}

function checkWinner() {
	console.log('3. checkwinner()')
	return (userResult == 5 || cpuResult == 5);}
function endGame() {
	rplContent();
	if (userResult > cpuResult) {
		endDesc.textContent = "Congratulations!! You won against the computer!!"
		returnMainBtn.textContent = "Play again";
		
	} else {
		endDesc.textContent="What a loser! You've lost against the computer";
		returnMainBtn.textContent = "Try again?";
		
	};
}

function rplContent() {
	main.classList.add("disappear");
	endAlrt.classList.remove("disappear");
  
	returnMainBtn.addEventListener("click", () => {
	  main.classList.remove("disappear");
	  endAlrt.classList.add("disappear");
	  resetGame();
	});
}

function resetGame() {
	userResult = 0;
	cpuResult = 0;
	playerResult.textContent = userResult;
	computerResult.textContent = cpuResult;
	announceRound.textContent = "";
}

