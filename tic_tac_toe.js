const btn = document.querySelector('button');
const cells = document.querySelectorAll('div');
const msg = document.querySelector('header > h2');
btn.addEventListener('click', (e) => {
    GameboardUI.resetGame();
});
function activateListener(){
   for(let cell of cells){
        cell.addEventListener('click', cellListener);
    }
}

function deactivateListener(){
    for(let cell of cells){
        cell.removeEventListener('click', cellListener);
    }
}

function cellListener(event){
    GameboardUI.playRoundUI(event.target);
}

activateListener();

const Gameboard = (function () {
    let gameboard = ['', '', '', '', '', '', '', '', ''];
    const winningCombinations = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                                  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
    let player_one = 'Player #1';
    let player_two = 'Player #2';
    let players = [
        {
            name: player_one,
            token: 'X'
        },
        {
            name: player_two,
            token: 'O'
        }
    ];
    let active_player = players[0];

    function switchActivePlayer(){
        active_player = (active_player === players[0] ? players[1] : players[0]);
    }

    const get_active_player = () => active_player;

    function checkWin(){
        for (const combination of winningCombinations) {
            const [a, b, c] = combination; 

            if (gameboard[a] !== '' && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
                return true; 
            }
        }
        return false;
    }

    function checkTie() {
        return gameboard.every(cell => cell !== '');
    }

    function playRound(index){
        if(gameboard[index] == ''){
            gameboard[index] = get_active_player().token;
            if(checkWin()){
                return `${get_active_player().name} has won the game`;
            }
            if(checkTie()){
                return 'The game ended in a tie';
            }
            switchActivePlayer();
            return true;
        }
        return true;
    }

    function restartGame(){
        gameboard = ['', '', '', '', '', '', '', '', ''];
        active_player = players[0];
    }
    return {
        playRound,
        restartGame,
        get_active_player,
    };
})();
const GameboardUI = (function (){
    function playRoundUI(element){
        const player = Gameboard.get_active_player();
        if(element.innerHTML != 'X' && element.innerHTML != 'O'){
            element.innerHTML = player.token;
            const gameboard = Gameboard.playRound(element.getAttribute('data-index'));
            if(gameboard != true){
                msg.textContent = gameboard;
                deactivateListener();
                btn.classList.add('active');
            }
        }
    }
    function resetGame(){
        Gameboard.restartGame();
        for(let cell of cells){
            cell.textContent = '';
        }
        btn.classList.remove('active');
        msg.textContent = 'Playing Tic Tac Toe';
        activateListener();
    }
    return {
        playRoundUI,
        resetGame
    }
})();