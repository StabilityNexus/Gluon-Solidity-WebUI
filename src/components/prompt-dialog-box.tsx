"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Chains } from "@/lib/chains";

interface PromptDialogBoxProps {
  children: React.ReactNode;
}

export default function PromptDialogBox({ children }: PromptDialogBoxProps) {
  const [chainId, setChainId] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (contractAddress) {
      router.push(`/g#${chainId}#${contractAddress}`);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="text-lg font-bold rounded-full mt-5 px-5 bg-gray-300 text-black hover:text-white hover:bg-black">
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enter Stablecoin Contract Address</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter the contract address of the stablecoin you want to use.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Select onValueChange={(value) => setChainId(value)}>
            <SelectTrigger className="my-2">
              <SelectValue placeholder="Select Chain" />
            </SelectTrigger>
            <SelectContent>
              {Chains.map((chain) => (
                <SelectItem key={chain.value} value={chain.value}>
                  {chain.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="0xABCD1234"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            className="my-2"
          />

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}