import React, { useState, useEffect } from 'react'
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { allowedList } from '../constant/rebaseABI';
import readTree from "../constant/readTree.json";
import { useIsMounted } from '../useIsMounted';
import { useAccount } from 'wagmi';


const Claim = () => {
  const [getproofAddress, setGetProofAddress] = useState();
  const [getproofIndex, setGetProofIndex] = useState();
  const [getproof, setGetProof] = useState();
  const { address } = useAccount();
  const mounted = useIsMounted();

  const treeRoot = StandardMerkleTree.of(allowedList, ["address", 'uint256', "uint256"]);
  const treeProof = StandardMerkleTree.load(readTree);

  // (2)

  useEffect(() => {
    try {
      for (const [i, v] of treeProof.entries()) {
        if (v[0] === '0x0000000000000000000000000000000000000001') {
          // (3)
          const proof = treeProof.getProof(i);
          setGetProofAddress(proof[0]);
          setGetProofIndex(proof[1]);
          setGetProof(proof[2]);
          console.log("Value:", v);
          console.log("Proof:", proof);
        }
      }
    } catch (error) {
      console.log('No data')
    }
  }, [treeProof, address]);



  return (
    <div>
      <div>
        MerkTree:
        {treeRoot.root}
      </div>

      <div>
        {mounted
          ?
          <p>
            ProofAddress: {getproofAddress}
          </p>
          : null
        }
      </div>
      <div>
        {mounted
          ?
          <p>
            ProofIndex: {getproofIndex}
          </p>
          : null
        }
      </div>
      <div>
        {mounted
          ?
          <p>
            Proof: {getproof}
          </p>
          : null
        }
      </div>

      {/* {tree.} */}
      {/* 0xd4dee0beab2d53f2cc83e567171bd2820e49898130a22622b10ead383e90bd77 */}
      {/* 0xd4dee0beab2d53f2cc83e567171bd2820e49898130a22622b10ead383e90bd77 */}
      {/* 0xa363ce445148603408e6b99e5f58271a80b194bfce04d7270672f0ac98e086f5 */}
    </div>
  )
}

export default Claim;