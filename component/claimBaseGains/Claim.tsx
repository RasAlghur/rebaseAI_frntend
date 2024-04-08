import React, { useState, useEffect } from 'react';
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import readTree from "../constant/readTree.json";
import { useIsMounted } from '../useIsMounted';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { BASEG_TEST_CLAIM_ADDR, claimABI } from '../constant/rebaseABI';

const Claim = () => {
  const [getAddress, setGetAddress] = useState<string>('');
  const [getProof, setGetProof] = useState<string[]>([]);
  const [getIndex, setGetIndex] = useState<string>('');
  const [getAmount, setGetAmount] = useState<string>('');
  const { address } = useAccount();
  const mounted = useIsMounted();
  const { data: hash, isPending, writeContract } = useWriteContract();

  const jsonString = JSON.stringify(readTree);

  useEffect(() => {
    try {

      const tree = StandardMerkleTree.load(JSON.parse(jsonString));

      for (const [i, v] of tree.entries()) {
        if (v[0] === address) {
          const proof = tree.getProof(i);
          setGetProof(proof);
          setGetAddress(v[0]);
          setGetIndex(v[1]);
          setGetAmount(v[2]);
          break; // Once a match is found, exit the loop
        }
      }
    } catch (error) {
      console.log('Error loading Merkle tree:', error);
    }
  }, [address, jsonString]);

  const { data: verifyClaimed } = useReadContract({
    abi: claimABI,
    address: BASEG_TEST_CLAIM_ADDR,
    functionName: "airdropped",
    args: [address],
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  async function submit() {
    if (mounted && getAddress && verifyClaimed == true && address) {
      return <div>
        Already Claimed
      </div>
    } 
    else {
      writeContract({
        address: BASEG_TEST_CLAIM_ADDR,
        abi: claimABI,
        functionName: 'claim',
        args: [getIndex, getAmount, getProof],
      });
    }
  }

  return (
    <div>
      <div>
        <h1>
          {mounted && getAddress && address ? <p>
            Verify Eligibility:
            {getAddress ? 'Congratulation, You are Eligible to Claim Airdrop' : 'Ops, You are not Eligible to Claim Airdrop'}
          </p> : 'Ops, You are not Eligible to Claim Airdrop'}
        </h1>
        <h1>
          {mounted && getAmount ? <p>
            Claim Amount:
            {getAddress ? getAmount : '0'}
          </p> : '0'}
        </h1>
        <button
          className=' w-16 rounded-full border-4 border-black'
          disabled={isPending}
          onClick={submit}
        >
          {mounted && getAddress && address ? <p>
            {getAddress ? isPending ? 'Confirming...' : isConfirming ? 'Waiting for confirmation...' : isConfirmed ? 'Claimed' : verifyClaimed === true ? 'Already Claimed' : 'Claim' : 'Not Eligible'}
          </p> : 'Not Eligible'}
        </button>
        <div>
          {hash && <div>
            <a href={`https://testnet.bscscan.com/tx/${hash}`}>Claimed Successfully: view  Txn at {hash}</a>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Claim;
