import React, { useState, useEffect } from 'react'
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import readTree from "../constant/readTree.json";
import { useIsMounted } from '../useIsMounted';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { BASEG_TEST_CLAIM_ADDR, BASEG_TEST_TOKEN, claimABI } from '../constant/rebaseABI';

const Claim = () => {
  const [getproofAddress, setGetProofAddress] = useState<string>('');
  const [getproofIndex, setGetProofIndex] = useState<string>('');
  const [getProof, setGetProof] = useState<string>('');
  const [getproofAmount, setGetProofAmount] = useState<string>('');
  const [getIndex, setGetIndex] = useState<string>('');
  const [getAmount, setGetAmount] = useState<string>('');
  const { address } = useAccount();
  const mounted = useIsMounted();
  const { data: hash, isPending, writeContract } = useWriteContract()

  const treeProof = StandardMerkleTree.load(readTree);
  useEffect(() => {
    try {
      for (const [i, v] of treeProof.entries()) {
        if (v[0] === address) {
          const proof = treeProof.getProof(i);
          setGetProof(proof);
          setGetProofAddress(proof[0]);
          setGetProofIndex(proof[1]);
          setGetProofAmount(proof[2]);
          setGetIndex(v[1]);

          setGetAmount(v[2]);

          // console.log("Value:", v);
          // console.log("Index:", v[1]);
          // console.log("Amount:", v[2]);
          console.log("Proof:", proof);
          // console.log("Proof Address:", proof[0]);
          // console.log("Proof Index:", proof[1]);
          // console.log("Proof Amount:", proof[2]);
        }
      }
    } catch (error) {
      console.log('No data')
    }
  }, [treeProof, address]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  async function submit() {
    writeContract({
      address: BASEG_TEST_CLAIM_ADDR,
      abi: claimABI,
      functionName: 'claim',
      args: [getIndex, getAmount, getProof],
    });
    // console.log(getIndex)
  }

  return (
    <div>
      {/* FOR VERIFICATION, IT WILL BE REMOVED FROM HERE TO LINE 113*/}
      {/* FOR VERIFICATION, IT WILL BE REMOVED FROM HERE TO LINE 113*/}
      {/* FOR VERIFICATION, IT WILL BE REMOVED FROM HERE TO LINE 113*/}
      <div>
        <h1>
          {mounted
            ?
            <p>
              ProofAddress: {getproofAddress}
            </p>
            : null
          }
        </h1>
        <h1>
          {mounted
            ?
            <p>
              ProofIndex: {getproofIndex}
            </p>
            : null
          }
        </h1>
        <h1>
          {mounted
            ?
            <p>
              Proof: {getproofAmount}
            </p>
            : null
          }
        </h1>
        <h1>
          {mounted && (
            <p>
              Index:
              {getIndex || "0"}
            </p>
          )}{" "}
        </h1>
        <h1>
          {mounted && (
            <p>Amount:
              {getAmount || "0"}
            </p>
          )}{" "}
        </h1>
      </div>
      {/* CLAIM BUTTON */}
      {/* CLAIM BUTTON */}
      {/* CLAIM BUTTON */}
      <div>
        <button
          className=' w-16 rounded-full border-4 border-black'
          disabled={isPending}
          onClick={submit}
        >
          {isPending ? 'Confirming...' : isConfirmed ? 'Transaction confirmed' : 'Claim'}
        </button>
        <div>
          {isConfirming && <div>Waiting for confirmation...</div>}
          {/* {isConfirmed && <div>Transaction confirmed.</div>} */}
          {/* https://testnet.bscscan.com/tx/0xba82d994a24207cd23d1ad473690820375e41a0f5b3a79fd8e840e24ade2e4de */}
          {hash && <div>
            <a href="https://testnet.bscscan.com/tx/$hash"></a>
            Transaction Hash: {hash}</div>}
        </div>
      </div>

      {/* {tree.} */}
      {/* 0xd4dee0beab2d53f2cc83e567171bd2820e49898130a22622b10ead383e90bd77 */}
      {/* 0xd4dee0beab2d53f2cc83e567171bd2820e49898130a22622b10ead383e90bd77 */}
      {/* 0xa363ce445148603408e6b99e5f58271a80b194bfce04d7270672f0ac98e086f5 */}
    </div>
  )
}

export default Claim;