
const buttons = document.querySelectorAll(".btn");
let userResult = 0;
let cpuResult = 0;
const main = document.querySelector(".main");
const playerResult = document.querySelector('.player-result');
const computerResult = document.querySelector('.computer-result');
playerResult.textContent = userResult;
computerResult.textContent = cpuResult;
const endAlrt = document.querySelector("#end-alert");
const endDesc = document.querySelector("#end-desc");
const returnMainBtn = document.querySelector("#retry-btn");
const announceRound = document.getElementById('round-result');



buttons.forEach(button => {
	button.addEventListener('click', playRound)
});

function getComputerChoice() {
	const possibleChoice = ["rock", "paper", "scissor"];
	let randomNumber = Math.floor((Math.random() * 10) % 3);
	let computerChoice = possibleChoice[randomNumber];
	return computerChoice;
}

function playRound() {
	const playerSelection = this.id;
	const computerChoice = getComputerChoice();
	const winner = checkWinner();
	console.log(`Winner: ${winner}`);

	if (!winner) {
		 compareResults(playerSelection, computerChoice);
	} else (endGame());
}


function compareResults(playerSelection, computerSelection) {
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
	  userResult++;
	} else {
	  resultMsg = `Computer wins!! You chose ${playerSelection}, which loses against the computer choice, ${computerSelection}.`;
	  cpuResult++;
	}
	announceRound.textContent = resultMsg;
	playerResult.textContent = userResult;
	computerResult.textContent = cpuResult;
}

function checkWinner() {return (userResult == 5 || cpuResult == 5);}
function endGame() {
	rplContent();
	if (userResult > cpuResult) {
		endDesc.textContent = "Congratulations!! You won against the computer!!"
		returnMainBtn.innerText = "Play again";
		const audio = new Audio());
		audio.play();
	} else {
		endDesc.textContent="What a loser! You've lost against the computer";
		returnMainBtn.innerText = "Try again?";
		const audio = new Audio('sounds/Sad-SoundBible.com-759843766.wav');
		audio.play();
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