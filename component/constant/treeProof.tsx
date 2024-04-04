import React, { useState, useEffect } from 'react'
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { allowedList } from '../constant/rebaseABI';
import readTree from "./readTree.json";
import { useIsMounted } from '../useIsMounted';
import { useAccount } from 'wagmi'

export async function treeProof() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { address } = useAccount();
    const treeProof = StandardMerkleTree.load(readTree);

    for (const [i, v] of treeProof.entries()) {
        if (v[0] === '0x0000000000000000000000000000000000000001') {
            // (3)
            const proof = treeProof.getProof(i);
            console.log("Value:", v);
            console.log("Proof:", proof);
            const ProofAddress = proof[0];
            const ProofIndex = proof[0];
            const Proof = proof[0];
            return {ProofAddress, ProofIndex, Proof};
        }
    }
}