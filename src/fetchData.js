import { ethers } from 'ethers';
import { SEPOLIA_RPC_URL } from '@env';
import { wrapPromise } from './wrapPromise';

export const fetchBlockData = (blockNo) => {
    const promise = (async () => {
      // I am using Alchemy RPC URL here. EtherscanProvider is also usable for mainnet
      const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);

      const latestBlock = await provider.getBlockNumber();
      const blockFetched = blockNo > latestBlock ? latestBlock : (blockNo || latestBlock);
      const block = await provider.getBlock(blockFetched);

      return {
        blockNumber: blockFetched,
        block: block,
      };
    })();

    return wrapPromise(promise);
  };

export const fetchTransactionData = (hash) => {
  const promise = (async () => {
    const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
    const transaction = await provider.getTransactionReceipt(hash);
    return {
      txnFee: transaction.gasPrice * transaction.gasUsed,
    };
  })();

  return promise;
};
