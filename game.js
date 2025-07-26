
let isGameActive = true;
let gameState = ["","","","","","","","","",""];
const status = document.getElementById("status");
const cells = document.querySelectorAll(".cells");
let playerLocked= false;

const winCondition = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,5,6]
]

document.querySelectorAll(".player").forEach(button => {
  let currentPlayer=""
  button.addEventListener("click", () => selectPlayer(button));
  
});
function selectPlayer(button){
    if(playerLocked) return;
    
    currentPlayer = button.textContent;
    status.textContent = `Player ${currentPlayer}'s Turn`;
    console.log(currentPlayer);
    playerLocked = true;

    document.querySelectorAll(".player").forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.6"; // Optional: fade look
        btn.style.cursor = "not-allowed";
    });
    
}


function handleClick(event){
    if (currentPlayer=="") {
        alert("Please select a player (X or O) to start the game.");
        return;
    }

    const index = event.target.dataset.index;

    if(gameState[index]!=="" || !isGameActive) return;

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkResult();
}

function checkResult(){
    let roundwin = false;
    let win=[];
    if (!gameState.includes("")) {
    status.textContent = "Draw!";
    isGameActive = false;
    return;
    }

    for (let cond of winCondition ){
        const [a,b,c] = cond;
        if(gameState[a]!=="" && gameState[a]==gameState[b] && gameState[b] == gameState[c]){
            roundwin = true;
            win=[a,b,c];
            document.getElementById("winSound").play();
            break;
        }
    }

    if(roundwin){
        status.textContent= `Player ${currentPlayer} Wins!`
        isGameActive=false;

        win.forEach(index=>{
            cells[index].classList.add("win");
        })
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });

        return;

    }

    

    // Switch turns
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s Turn`;
}


function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  status.textContent ="";
   playerLocked=false;
 

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });

 

  
}

// Add click event listeners to each cell
cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

// status.textContent= `Player ${currentPlayer} 's turn!`;


