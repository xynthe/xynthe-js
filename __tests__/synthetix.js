import { SynthetixJs } from '../dist/main.node';
import config from './config';
const snxjs = new SynthetixJs({ networkId: config.networkId });
const sUSD = snxjs.utils.toUtf8Bytes('sUSD');

test('Should return Synthetix total supply', async () => {
  const totalSupply = await snxjs.Synthetix.totalSupply();
  return expect(snxjs.utils.formatEther(totalSupply)).toBeTruthy();
});

test('Should throw Missing signer error', async () => {
  await expect(snxjs.Synthetix.issueSynths(sUSD, 10)).rejects.toThrow('missing signer');
});

// test(
//   'Should execute transaction signed with private key but fail on insufficient funds',
//   async () => {
//     const signer = new SynthetixJs.signers.PrivateKey(
//       null,
//       1,
//       '0x0123456789012345678901234567890123456789012345678901234567890123'
//     );
//     const snxjs = new SynthetixJs({ signer, networkId: 42 });
//     await expect(snxjs.Synthetix.issueSynths(sUSD, snxjs.util.parseEther('100'))).rejects.toThrow(
//       'insufficient funds for gas * price + value'
//     );
//   },
//   15000
// );