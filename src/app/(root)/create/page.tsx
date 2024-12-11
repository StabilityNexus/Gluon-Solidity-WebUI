import React from "react";
import FormCard from "@/components/form-card";
import { Chains } from "@/lib/chains";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Create New Deployment</h1>
          <h3 className="text-pretty text-base ml-1 text-zinc-400">Fill this form to create new Deployment</h3>
        </div>
        <div className="mx-auto w-full max-w-6xl items-start gap-6">
          <div className="grid gap-6">
            <FormCard
              title="ERC-20 Token"
              description="Details about existing ERC-20 token used for deployment"
              inputs={[
                { placeholder: "Name" },
                { placeholder: "Symbol" },
                { placeholder: "Token Address (existing ERC-20 token)" },
              ]}
              dropdowns={[
                {
                  placeholder: "Select Chains",
                  options: Chains.map(chain => ({ value: chain.value, label: chain.label })),
                },
              ]}
            />
            <FormCard
              title="Stable Tokens"
              description="Details about stable tokens (neutrons) to be minted"
              inputs={[
                { placeholder: "Name" },
                { placeholder: "Symbol" },
              ]}
            />
            <FormCard
              title="Reserve Tokens"
              description="Details about reserve tokens (protons) to be minted"
              inputs={[
                { placeholder: "Name" },
                { placeholder: "Symbol" },
              ]}
            />
            <FormCard
              title="Treasury Details"
              description="Details related to the treasury configuration."
              inputs={[
                { placeholder: "Treasury Address" },
                { placeholder: "Initial Treasury Fee" },
                { placeholder: "Treasury Revenue Target" },
              ]}
            />
            <FormCard
              title="Ratios and Fees"
              description="Configuration of critical and target ratios, and fees for fission and fusion."
              inputs={[
                { placeholder: "Critical Ratio" },
                { placeholder: "Target Ratio" },
                { placeholder: "Fee for Fission" },
                { placeholder: "Fee for Fusion" },
                { placeholder: "Decay Rate" },
              ]}
            />
            <FormCard
              title="Additional Fees"
              description="Configuration of additional fees."
              inputs={[
                { placeholder: "Reserve Fee" },
                { placeholder: "Vault Creator Fee" },
                { placeholder: "Dev Fee" },
              ]}
              footerButtonText="Create Stablecoin"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
