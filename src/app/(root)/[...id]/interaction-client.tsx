"use client"
import { useEffect, useState } from 'react';
import Interaction from "@/components/interaction";

export default function InteractionClient({
    initialChainId,
    initialAddress,
}: {
    initialChainId: string;
    initialAddress: string;
}) {
    const [chainId, setChainId] = useState<string>(initialChainId);
    const [deploymentAddress, setDeploymentAddress] = useState<string>(initialAddress);

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        const [parsedChainId, parsedAddress] = hash.split('#');
        if (parsedChainId && parsedAddress) {
            setChainId(parsedChainId);
            setDeploymentAddress(parsedAddress);
        }
    }, []);

    return (
        <div className="w-full h-full">
            <Interaction chainId={chainId} deploymentAddress={deploymentAddress} />
        </div>
    );
}