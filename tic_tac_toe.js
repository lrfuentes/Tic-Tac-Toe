const cells = document.querySelectorAll('div');
for(let cell of cells){
    cell.addEventListener('click', (e) => {
        GameboardUI.playRoundUI(e.target);
    });
}
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
        //.getAttribute('data-index')
        const player = Gameboard.get_active_player();
        element.innerHTML = player.token;
        const gameboard = Gameboard.playRound(element.getAttribute('data-index'));
        if(gameboard != true){
            const msg = document.querySelector('header > h2');
            msg.textContent = gameboard;
        }
    }

    return {
        playRoundUI,
    }
})();
/*Gameboard.playRound(1);
Gameboard.playRound(0);
Gameboard.playRound(3);
Gameboard.playRound(2);
Gameboard.playRound(8);
Gameboard.playRound(5);
Gameboard.playRound(7);
Gameboard.playRound(4);
Gameboard.playRound(6);*/