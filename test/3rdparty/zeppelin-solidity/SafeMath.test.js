const SafeMathMock = global.artifacts.require('SafeMathMock.sol');

const CheckExceptions = require('../../../jsroutines/util/CheckExceptions');


global.contract('SafeMath', (accounts) => {
  const owner = accounts[1];

  let safeMathMockInstance;

  global.before(async () => {
    safeMathMockInstance = await SafeMathMock.new({ from: owner });
  });

  global.it('multiplies correctly', async () => {
    const a = 5678;
    const b = 1234;
    await safeMathMockInstance.multiply.sendTransaction(a, b);
    const result = await safeMathMockInstance.result();

    global.assert.strictEqual(result.toNumber(), a * b);
  });

  global.it('adds correctly', async () => {
    const a = 5678;
    const b = 1234;
    await safeMathMockInstance.add.sendTransaction(a, b);
    const result = await safeMathMockInstance.result();

    global.assert.strictEqual(result.toNumber(), a + b);
  });

  global.it('subtracts correctly', async () => {
    const a = 5678;
    const b = 1234;
    await safeMathMockInstance.subtract.sendTransaction(a, b);
    const result = await safeMathMockInstance.result();

    global.assert.strictEqual(result.toNumber(), a - b);
  });

  global.it('should throw an error if subtraction result would be negative', async () => {
    const a = 1234;
    const b = 5678;

    await CheckExceptions.checkContractThrows(safeMathMockInstance.subtract.call,
                                              [a, b],
                                              'It should not be possible');
  });

  global.it('should throw an error on addition overflow', async () => {
    const a = 115792089237316195423570985008687907853269984665640564039457584007913129639935;
    const b = 1;

    await CheckExceptions.checkContractThrows(safeMathMockInstance.add.call,
                                              [a, b],
                                              'It should not be possible');
  });

  global.it('should throw an error on multiplication overflow', async () => {
    const a = 115792089237316195423570985008687907853269984665640564039457584007913129639933;
    const b = 2;

    await CheckExceptions.checkContractThrows(safeMathMockInstance.multiply.call,
                                              [a, b],
                                              'It should not be possible');
  });
});
