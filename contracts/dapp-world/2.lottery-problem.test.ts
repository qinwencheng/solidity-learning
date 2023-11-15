import { ethers } from 'hardhat';
import { expect } from 'chai';
// If desired, you can get the contract instance type this way:
import { LotteryPool } from '../../typechain-types';

describe('LotteryPool', function () {
    let lotteryPool: LotteryPool;

    beforeEach(async function () {
        const LotteryPool = await ethers.getContractFactory('LotteryPool');
        lotteryPool = await LotteryPool.deploy();
    });

    it('should allow a user to enter the lottery', async function () {
        const [owner] = await ethers.getSigners();
        const amount = ethers.parseEther('0.1');
        await lotteryPool.connect(owner).enter({ value: amount });
        const [participants, count] = await lotteryPool.viewParticipants();
        expect(participants[0]).to.equal(owner.address);
        expect(count).to.equal(1);
        expect(await lotteryPool.prizePool()).to.equal(amount);
    });

    it('should allow players to enter the pool with 0.1 eth', async function () {
        const [player1, player2, player3, player4, player5] = await ethers.getSigners();
        const amount = ethers.parseEther('0.1');
        await lotteryPool.connect(player1).enter({ value: amount });
        await lotteryPool.connect(player2).enter({ value: amount });
        await lotteryPool.connect(player3).enter({ value: amount });
        await lotteryPool.connect(player4).enter({ value: amount });
        // await lotteryPool.connect(player5).enter({ value: amount });
        const [participants, len] = await lotteryPool.viewParticipants()
        expect(participants).to.deep.equal(
            [player1.address, player2.address, player3.address, player4.address],
        );
        expect(len).to.equal(4);
    });

    it('should revert if players try to enter the pool with more or less than 0.1 eth', async function () {
        const [player1, player2] = await ethers.getSigners();
        const amount1 = ethers.parseEther('0.2');
        const amount2 = ethers.parseEther('0.05');
        await expect(lotteryPool.connect(player1).enter({ value: amount1 })).to.be.reverted;
        await expect(lotteryPool.connect(player2).enter({ value: amount2 })).to.be.reverted;
    });

    it('should revert if players try to enter the pool twice in the same round', async function () {
        const [player1, player2, player3, player4] = await ethers.getSigners();
        const amount = ethers.parseEther('0.1');
        await lotteryPool.connect(player1).enter({ value: amount });
        await lotteryPool.connect(player2).enter({ value: amount });
        await lotteryPool.connect(player3).enter({ value: amount });
        await lotteryPool.connect(player4).enter({ value: amount });
        await expect(lotteryPool.connect(player1).enter({ value: amount })).to.be.reverted;
    });

    it('should start the lottery when participants limit is reached', async function () {
        const signers = await ethers.getSigners();
        const amount = ethers.parseEther('0.1');
        for (let i = 0; i < 5; i++) {
            await lotteryPool.connect(signers[i]).enter({ value: amount });
        }
        const [, count] = await lotteryPool.viewParticipants();
        expect(count).to.equal(0);
        const previousWinner = await lotteryPool.viewPreviousWinner();
        expect(previousWinner).to.not.equal(ethers.ZeroAddress);
    });

    it('should randomly select a winner and transfer the pool amount to the winner after 5 players enter the pool', async function () {
        const signers = await ethers.getSigners();
        const amount = ethers.parseEther('0.1');
        
        const preWei = [];
        for (let i = 0; i < 5; i++) {
            preWei.push(await ethers.provider.getBalance(signers[i].address));
            await lotteryPool.connect(signers[i]).enter({ value: amount });
            const after_amount = await ethers.provider.getBalance(signers[i].address);
        }
        const winner = await lotteryPool.viewPreviousWinner();
        console.log(winner);

        expect(winner).to.be.oneOf(
            signers.slice(0, 5).map((signer) => signer.address),
        );

        let max_profit = 0n;
        for (let i = 0; i < 5; i++) {
            const nowProfit = await ethers.provider.getBalance(signers[i].address) - preWei[i];
            max_profit = nowProfit > max_profit ? nowProfit : max_profit;
        }
        expect(max_profit).to.closeTo(ethers.parseEther('0.4'), amount);
    });

    it('should start a new round of lottery after the previous one is completed', async function () {
        const [player1, player2, player3, player4, player5, player6, player7, player8, player9, , player10] = await ethers.getSigners();
        const amount = ethers.parseEther('0.1');
        expect(await lotteryPool.prizePool()).equal(0);
        await lotteryPool.connect(player1).enter({ value: amount });
        await lotteryPool.connect(player2).enter({ value: amount });
        await lotteryPool.connect(player3).enter({ value: amount });
        await lotteryPool.connect(player4).enter({ value: amount });
        expect(await lotteryPool.prizePool()).equal(4n * amount);
        const [, len1] = await lotteryPool.viewParticipants()
        expect(len1).to.equal(4);
        expect(await lotteryPool.prizePool()).equal(4n * amount);
        await lotteryPool.connect(player5).enter({ value: amount });
        const [, len2] = await lotteryPool.viewParticipants()
        expect(len2).to.equal(0);

        const winner1 = await lotteryPool.viewPreviousWinner();
        expect(await lotteryPool.prizePool()).equal(0);

        await lotteryPool.connect(player6).enter({ value: amount });
        await lotteryPool.connect(player7).enter({ value: amount });
        await lotteryPool.connect(player8).enter({ value: amount });
        await lotteryPool.connect(player9).enter({ value: amount });
        const [participants, len3] = await lotteryPool.viewParticipants()
        expect(len3).to.equal(4);
        expect(participants).to.deep.equal([player6.address, player7.address, player8.address, player9.address]);
        await lotteryPool.connect(player10).enter({ value: amount });
        const winner2 = await lotteryPool.viewPreviousWinner();
        expect(winner1).to.not.equal(winner2);
    });
});


