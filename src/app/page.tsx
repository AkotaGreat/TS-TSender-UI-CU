"use client";

import HomeContent from "@/components/ui/HomeContent";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export default function Home() {
  const { isConnected } = useAccount()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading...</div>;
  }
  
  return (
    <div> 
      {isConnected ? <div><HomeContent /></div> : <div>Please connect a wallet...</div>}
      
    </div>
  );
}
