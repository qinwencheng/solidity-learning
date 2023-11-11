import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Constants } from '../../typechain-types';

describe('Constants', function () {
  let constants: Constants;

  beforeEach(async function () {
    const ConstantsFactory = await ethers.getContractFactory('Constants');
    constants = await ConstantsFactory.deploy();
  });

  it('should have the correct constants', async function () {
    expect(await constants.MY_ADDRESS()).to.equal('0x777788889999AaAAbBbbCcccddDdeeeEfFFfCcCc');
    expect(await constants.MY_UINT()).to.equal(123);
});

  it('should have the correct variables', async function () {
    expect(await constants.my_var_address()).to.equal('0x777788889999AaAAbBbbCcccddDdeeeEfFFfCcCc');
    expect(await constants.my_var_uint()).to.equal(123);
  });
});