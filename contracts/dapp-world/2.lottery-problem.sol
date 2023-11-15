// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

error EtherMismatchError();
error DuplicateParticipation(string message);

contract LotteryPool {
    uint public constant ticketPrice = 0.1 ether;
    uint public constant PARTICIPANTS_LIMIT = 5;
    uint public prizePool = 0;
    address[] participantsList;
    address previousWinner;

    // For participants to enter the pool
    function enter() public payable {
        // To check if the ticket price is paid
        if (msg.value != ticketPrice) revert EtherMismatchError();
        // To check if the participants limit is reached
        if (isUserInParticipants(msg.sender))
            revert DuplicateParticipation(
                "You have already entered the current lottery"
            );
        // To add the participant to the list
        participantsList.push(msg.sender);
        // To add the prize money to the pool
        prizePool += msg.value;
        if (participantsList.length == PARTICIPANTS_LIMIT) {
            startLottery();
        }
    }

    function startLottery() public payable {
        // To select a winner
        address winner = pickRandomWinner();

        // To transfer the prize money to winner
        payable(winner).transfer(prizePool);
        
        // To set the previous winner
        previousWinner = winner;

        // To reset the participants list
        delete participantsList;

        // reset the prize pool
        prizePool = 0;
    }

    function pickRandomWinner() private view returns (address) {
        // To pick a random winner
        uint randomInt = uint(
            keccak256(
                (
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        block.timestamp,
                        participantsList
                    )
                )
            )
        );
        uint winnerIndex = randomInt % PARTICIPANTS_LIMIT;
        return participantsList[winnerIndex];
    }



    // To check if user is already in participants list
    function isUserInParticipants(address user) private view returns (bool) {
        for (uint i = 0; i < participantsList.length; i++) {
            if (participantsList[i] == user) return true;
        }
        return false;
    }

    // To view participants in current pool
    function viewParticipants() public view returns (address[] memory, uint) {
        return (participantsList, participantsList.length);
    }

    // To view winner of last lottery
    function viewPreviousWinner() public view returns (address) {
        return previousWinner;
    }
}
