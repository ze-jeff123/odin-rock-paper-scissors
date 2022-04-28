function numToName(num) {
    switch (num) {
        case 1 : 
            return "rock";
        case 2 :
            return "paper"
        case 3 : 
            return "scissors"
    }
}

function nameToNum(name) {
    name = name.toLowerCase();
    switch (name) {
        case "rock" : 
            return 1;;
        case "paper" :
            return 2;
        case "scissors" : 
            return 3;
    }
}

function computerPlay() {
    let num = Math.floor(Math.random() * 3) + 1;
    return numToName(num)
}

function Capitalize(s) {
    return s.slice(0 , 1).toUpperCase() + s.slice(1)
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    
    playerNum = nameToNum(playerSelection);
    computerNum = nameToNum(computerSelection)
    
    if (playerNum == undefined || computerNum == undefined) {
        return undefined;
    }


    if (playerNum === computerNum) {
        return { res : 0 , msg : `Draw! Both players ${Capitalize(computerSelection)}` }
    }

    ///1 < 2 , 2 < 3 , 3 < 1


    let sign = 1;
    if (playerNum > computerNum) {
        [playerNum , computerNum] = [computerNum , playerNum]
        sign = -1;
    }

    let result;
    if (playerNum == 1 && computerNum == 2) {
        result = -1; 
    }
    if (playerNum == 1 && computerNum == 3) {
        result = 1;
    }
    if (playerNum == 2 && computerNum == 3) {
        result = -1;
    }

    result = result * sign;

    let msg;
    if (result == 1) {
        msg = `You win! ${Capitalize(playerSelection)} beats ${Capitalize(computerSelection)}`
    } else {
        msg = `You lose! ${Capitalize(computerSelection)} beats ${Capitalize(playerSelection)}`
    }

    return {res : result , msg : msg};
}

function game() {
    let playerScore = 0, computerScore = 0;
    for(let i = 0; i < 5; ) {
        let playerSelection = prompt("Make your choice: ");
        let computerSelection = computerPlay();
        roundResult = playRound(playerSelection , computerSelection);

        if (roundResult == undefined) {
            console.log("Invalid entry, check for misspellings and try again!");
        } else {
            console.log(`CPU played ${computerSelection}`)
            console.log(roundResult.msg);
            if (roundResult.res == 1) {
                i++;
                playerScore++;
            } else if(roundResult.res == -1) {
                i++;
                computerScore++;
            }

            console.log(`Score: ${playerScore}(You) - ${computerScore}(CPU)`);
        }
    }

    let winner = (playerScore > computerScore) ? "player" : "CPU";
    
    console.log(`Game is finished, ${winner} wins!`)
}



