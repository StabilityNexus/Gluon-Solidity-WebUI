"use client";
import React, { useState, useEffect } from "react";
import { MoveRight, MoveLeft } from "lucide-react";
import InteractionCardComponent from "./interaction-card";
import { Button } from "@/components/ui/button";
import Metrics from "./metrics";
import Footer from "./footer";

export default function Interaction({
  chainId,
  deploymentAddress,
}: {
  chainId: string;
  deploymentAddress: string;
}) {
  const [operation, setOperation] = useState<
    "fission" | "fusion" | "stake" | "unstake"
  >("fission");
  const [baseToken, setBaseToken] = useState<string>("");
  const [stableToken, setStableToken] = useState<string>("");
  const [reserveToken, setReserveToken] = useState<string>("");
  const [stakedStableToken, setStakedStableToken] = useState<string>("");
  const [stakedReserveToken, setStakedReserveToken] = useState<string>("");

  const isFissionMode = operation === "fission";
  const isFusionMode = operation === "fusion";
  const isStakeMode = operation === "stake";
  const isUnstakeMode = operation === "unstake";

  const handleOperationSwitch = (newOperation: typeof operation) => {
    setOperation(newOperation);
    setBaseToken("");
    setStableToken("");
    setReserveToken("");
    setStakedStableToken("");
    setStakedReserveToken("");
  };

  const handleExecute = () => {
    console.log("Executing:", operation);
  };

  const metrics = [
    { label: "Supply", value: "500 321 XYZL\n205 738 XYZS" },
    { label: "Backing", value: "TVL: 1 000 000 XYZ \n10% of XYZ's supply" },
    {
      label: "Prices",
      value:
        "1 XYZS = 2 XYZ \n1 XYZL = 1.5 XYZ \n1 sXYZS = 1.3 XYZS \n1 SXYZL = 1.6 XYZL",
    },
    { label: "Reserve Ratio", value: "50%" },
    { label: "Percentage Staked", value: "30%" },
  ];

  return (
    <>
      <div className="flex flex-col items-center space-y-8">
        {/* Operation Buttons */}
        <div className="flex space-x-4 mt-10">
          {["fission", "fusion", "stake", "unstake"].map((op) => (
            <Button
              key={op}
              variant={operation === op ? "default" : "outline"}
              onClick={() => handleOperationSwitch(op as typeof operation)}
            >
              {op.charAt(0).toUpperCase() + op.slice(1)}
            </Button>
          ))}
        </div>

        {/* Main Interaction Section */}
        <div className="flex items-center space-x-8">
          {/* Token Inputs */}
          <InteractionCardComponent
            title="Base Token"
            value={baseToken}
            onChange={(e) => setBaseToken(e.target.value)}
            balance="20"
            tokenName="XYZ"
            isEditable={isFissionMode}
            isRelevant={isFissionMode || isFusionMode}
          />

          {/* Arrow & Execute Button */}
          <div className="flex flex-col items-center space-y-4">
            {/* First Arrow */}
            {isFusionMode ? (
              <MoveLeft
                className={`w-8 h-8 transform -rotate-45 transition-transform ${operation === "fusion" ? "border-dashed" : ""}`}
              />
            ) : (
              <MoveRight className="w-8 h-8 transform -rotate-45 transition-transform" />
            )}

            {/* Second Arrow */}
            {isFusionMode ? (
              <MoveLeft
                className={`w-8 h-8 transform rotate-45 transition-transform ${operation === "fusion" ? "border-dashed" : ""}`}
              />
            ) : (
              <MoveRight className="w-8 h-8 transform rotate-45 transition-transform" />
            )}
          </div>

          {/* Output Tokens */}
          <div className="space-y-4">
            <InteractionCardComponent
              title="Stable Token (Neutron)"
              value={stableToken}
              onChange={(e) => setStableToken(e.target.value)}
              balance="20"
              tokenName="XYZN"
              isEditable={isFusionMode || isStakeMode}
              isRelevant={true}
            />
            <InteractionCardComponent
              title="Reserve Token (Proton)"
              value={reserveToken}
              onChange={(e) => setReserveToken(e.target.value)}
              balance="20"
              tokenName="XYZP"
              isEditable={isFusionMode || isStakeMode}
              isRelevant={true}
            />
            <Button
              // variant="destructive"
              onClick={handleExecute}
              className="w-full bg-amber-500"
            >
              Execute{" "}
              {`${operation.charAt(0).toUpperCase()}${operation.slice(1)}`}
            </Button>
          </div>

          <div className="flex flex-col items-center space-y-4">
            {/* First Arrow */}
            {isUnstakeMode ? (
              <MoveLeft
                className={`w-8 h-8 transform -rotate-45 transition-transform ${operation === "unstake" ? "border-dashed" : ""}`}
              />
            ) : (
              <MoveRight className="w-8 h-8 transform -rotate-45 transition-transform" />
            )}

            {/* Second Arrow */}
            {isUnstakeMode ? (
              <MoveLeft
                className={`w-8 h-8 transform rotate-45 transition-transform ${operation === "unstake" ? "border-dashed" : ""}`}
              />
            ) : (
              <MoveRight className="w-8 h-8 transform rotate-45 transition-transform" />
            )}
          </div>

          {/* Staked Token Section */}
          <div className="flex items-center space-x-8">
            <div className="space-y-4 mb-12">
              <InteractionCardComponent
                title="Staked Stable Token"
                value={stakedStableToken}
                onChange={(e) => setStakedStableToken(e.target.value)}
                balance="20"
                tokenName="hXYZN"
                isEditable={isUnstakeMode}
                isRelevant={isStakeMode || isUnstakeMode}
              />
              <InteractionCardComponent
                title="Staked Reserve Token"
                value={stakedReserveToken}
                onChange={(e) => setStakedReserveToken(e.target.value)}
                balance="20"
                tokenName="hXYZP"
                isEditable={isUnstakeMode}
                isRelevant={isStakeMode || isUnstakeMode}
              />
            </div>
          </div>
        </div>
        {/* Metrics Display */}
        <div className="mx-2">
          <Metrics metrics={metrics} />
        </div>
      </div>
      <Footer chainId={chainId} deploymentAddress={deploymentAddress} />
    </>
  );
}
