let playerScore = 0; 
let computerScore = 0;

function selectionIdToName(id) {
    switch (id) {
        case 1:
            return "rock";
        case 2:
            return "paper"
        case 3:
            return "scissors"
    }
}

function nameToSelectionId(name) {
    name = name.toLowerCase();
    switch (name) {
        case "rock":
            return 1;;
        case "paper":
            return 2;
        case "scissors":
            return 3;
    }
}

function computerPlay() {
    let id = Math.floor(Math.random() * 3) + 1;
    return selectionIdToName(id)
}

function capitalize(s) {
    return s.slice(0, 1).toUpperCase() + s.slice(1)
}


//Returns 1 if player wins, -1 if player loses, 0 if draw
function getWinner(playerSelectionId, computerSelectionId) {
    if (playerSelectionId === computerSelectionId) {
        return 0;
    }

    let sign = 1;
    if (playerSelectionId > computerSelectionId) {
        [playerSelectionId, computerSelectionId] = [computerSelectionId, playerSelectionId]
        sign = -1;
    }

    let result;
    if (playerSelectionId == 1 && computerSelectionId == 2) {
        result = -1;
    }
    if (playerSelectionId == 1 && computerSelectionId == 3) {
        result = 1;
    }
    if (playerSelectionId == 2 && computerSelectionId == 3) {
        result = -1;
    }

    ///the goal of sign is to reverse the result back in case we reversed the selections
    ///at the beggining
    return result * sign;
}
function getRoundResult(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();

    let playerSelectionId = nameToSelectionId(playerSelection);
    let computerSelectionId = nameToSelectionId(computerSelection)

    if (playerSelectionId == undefined || computerSelectionId == undefined) {
        return undefined;
    }


    if (playerSelectionId === computerSelectionId) {
        return { res: 0, msg: `Draw! Both players ${capitalize(computerSelection)}` }
    }

    let result = getWinner(playerSelectionId, computerSelectionId);


    let msg;
    if (result == 1) {
        msg = `You win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`
    } else {
        msg = `You lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}`
    }

    return { res: result, msg: msg };
}

function displayAnnouncement(announcementText) {
    const announcerNode = document.querySelector(".announcer");
    announcerNode.textContent = announcementText;
}
function playRound(playerSelection) {
    let computerSelection = computerPlay();
    roundResult = getRoundResult(playerSelection, computerSelection);

    if (roundResult == undefined) {
        displayAnnouncement("Invalid entry, check for misspellings and try again!");
    } else {
        let announcementText = "";

        announcementText += `CPU played ${computerSelection}` + "\r\n";
        announcementText += roundResult.msg + "\r\n";
        if (roundResult.res == 1) {
            playerScore++;
        } else if (roundResult.res == -1) {
            computerScore++;
        } 

        announcementText += `Score: ${playerScore}(You) - ${computerScore}(CPU)` + "\r\n";
        displayAnnouncement(announcementText);
    }
}

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        playRound(button.dataset.selection);
    })
});