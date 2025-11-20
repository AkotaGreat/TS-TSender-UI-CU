"use client"
import  {InputField}  from "./ui/InputFields"
import { useState, useMemo, useEffect } from "react";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants";
import { useChainId, useConfig, useAccount, useWriteContract } from 'wagmi'
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { calculateTotal } from "@/utils/calculateTotal/calculateTotal";
import { Spinner } from "./ui/Spinner";

export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('tsender_tokenAddress') || '' : '');
    const [recipients, setRecipients] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('tsender_recipients') || '' : '');
    const [amounts, setAmounts] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('tsender_amounts') || '' : '');
    const [isLoading, setIsLoading] = useState(false);
    const [isMetaMaskOpen, setIsMetaMaskOpen] = useState(false);
    const [tokenDetails, setTokenDetails] = useState<{name: string; symbol: string; decimals: number; totalSupply: string; balance: string;} | null>(null);
    const [loadingTokenDetails, setLoadingTokenDetails] = useState(false);
    const chainId  = useChainId()
    const config = useConfig()
    const account = useAccount()
    const total= useMemo(() => BigInt(Math.floor(calculateTotal(amounts) * (10 ** 18))), [amounts]);
    const { data: hash, isPending, writeContractAsync } = useWriteContract()
    useEffect(() => {if (typeof window !== 'undefined') {localStorage.setItem('tsender_tokenAddress', tokenAddress);}}, [tokenAddress]);
    useEffect(() => {if (typeof window !== 'undefined') {localStorage.setItem('tsender_recipients', recipients);}}, [recipients]);
    useEffect(() => {if (typeof window !== 'undefined') {localStorage.setItem('tsender_amounts', amounts);}}, [amounts]);
    useEffect(() => 
        {if (!tokenAddress || tokenAddress.length !== 42) {setTokenDetails(null);return;}

        async function fetchTokenDetails() {
            setLoadingTokenDetails(true);
            try {
            const [name, symbol, decimals, totalSupply, balance] = await Promise.all([
                readContract(config, {
                abi: erc20Abi,
                address: tokenAddress.trim() as `0x${string}`,
                functionName: 'name',
                }),
                readContract(config, {
                abi: erc20Abi,
                address: tokenAddress.trim() as `0x${string}`,
                functionName: 'symbol',
                }),
                readContract(config, {
                abi: erc20Abi,
                address: tokenAddress.trim() as `0x${string}`,
                functionName: 'decimals',
                }),
                readContract(config, {
                abi: erc20Abi,
                address: tokenAddress.trim() as `0x${string}`,
                functionName: 'totalSupply',
                }),
                readContract(config, {
                abi: erc20Abi,
                address: tokenAddress.trim() as `0x${string}`,
                functionName: 'balanceOf',
                args: [account.address],
                }),
            ]);

            setTokenDetails({
                name: name as string,
                symbol: symbol as string,
                decimals: Number(decimals),
                totalSupply: (totalSupply as bigint).toString(),
                balance: (balance as bigint).toString(),
            });
            } catch (error) {
            console.error('Error fetching token details:', error);
            setTokenDetails(null);
            } finally {
            setLoadingTokenDetails(false);
            }
        }

        fetchTokenDetails();
        }, [tokenAddress, account.address, config]
    );
    

    async function getApprovedAmount(tsenderAddress: string | null): Promise<bigint> {
        if (!tsenderAddress) {
            alert ('Address not found, use supported chain')
            return BigInt(0);

        }
        const response = await readContract(config, {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: 'allowance',
            args: [account.address, tsenderAddress as `0x${string}`],
        })
        return response as bigint
    }   

    async function handleSubmit() {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const tsenderAddress = chainsToTSender[chainId]["tsender"];
            const approvedAmount = await getApprovedAmount(tsenderAddress);
            
            
            if (approvedAmount < total) {  
                setIsMetaMaskOpen(true);

                try {
                    const approvalHash = await writeContractAsync({
                        abi: erc20Abi,
                        address: tokenAddress as `0x${string}`,
                        functionName: 'approve',
                        args: [tsenderAddress as `0x${string}`, BigInt(total)],
                    });

                    setIsMetaMaskOpen(false);

                    const approvalReceipt = await waitForTransactionReceipt(config, {
                        hash: approvalHash,
                    });

                    console.log("Approval confirmed:", approvalReceipt);
                } catch (err) {
                    console.error("Approval error:", err);
                    setIsMetaMaskOpen(false);
                    setIsLoading(false);
                    return; 
                }
            }

            setIsMetaMaskOpen(true);

            const txHash = await writeContractAsync({
                abi: tsenderAbi,
                address: tsenderAddress as `0x${string}`,
                functionName: 'airdropERC20',
                args: [
                    tokenAddress as `0x${string}`,
                    recipients.split(/[\n,]+/).map((addr:string) => addr.trim()).filter((addr:string) => addr !== '') as `0x${string}`[],
                    amounts.split(/[\n,]+/).map((num:string) => num.trim()).filter((num:string) => num !== '').map((num:string) => BigInt(Math.floor(parseFloat(num) * (10 ** 18)))),
                    BigInt(total),
                ],
            });

            setIsMetaMaskOpen(false);

            const receipt = await waitForTransactionReceipt(config, {
                hash: txHash,
            });
            
            console.log("Airdrop tx confirmed:", receipt);
            alert("Great work, tokens airdropped successfully!");

        } catch (err) {
            console.error("Airdrop error:", err);
            alert("Transaction failed. Check console for details.");
        } finally {
            setIsMetaMaskOpen(false);
            setIsLoading(false);
        }
    }
    

    return (
        <div>
            <InputField 
            label="Token Address"
            placeholder="0x.."
            value={tokenAddress}
            onChange= {setTokenAddress} />
            
            <InputField 
            label="Recipients (comma or new line separated)"
            placeholder="0x.., 0x.."
            value={recipients}
            onChange= {setRecipients}
            large= {true} />

            <InputField 
            label="Amounts (wei; comma or new line separated)"
            placeholder="100, 200, 300..."
            value={amounts}
            onChange= {setAmounts}
            large= {true} />

           {(isMetaMaskOpen||isPending)&&(<div className="my-3"><Spinner/><p className="text-sm text-gray-500 text-center">{isMetaMaskOpen?"Waiting for MetaMask...":"Transaction pending..."}</p></div>)}


            <button onClick={handleSubmit} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">Send Tokens</button>

        
            {tokenAddress && (
            <div className="bg-gray-50 rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Details</h3>
                
                {loadingTokenDetails ? (
                <div className="flex items-center gap-2 text-gray-600">
                    <Spinner />
                    <span>Loading token details...</span>
                </div>
                ) : tokenDetails ? (
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium text-gray-900">{tokenDetails.name}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-600">Symbol:</span>
                    <span className="font-medium text-gray-900">{tokenDetails.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-600">Decimals:</span>
                    <span className="font-medium text-gray-900">{tokenDetails.decimals}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-600">Your Balance:</span>
                    <span className="font-medium text-gray-900">
                        {(Number(tokenDetails.balance) / (10 ** tokenDetails.decimals)).toFixed(4)} {tokenDetails.symbol}
                    </span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-600">Total Supply:</span>
                    <span className="font-medium text-gray-900">
                        {(Number(tokenDetails.totalSupply) / (10 ** tokenDetails.decimals)).toLocaleString()} {tokenDetails.symbol}
                    </span>
                    </div>
                </div>
                ) : (
                <p className="text-gray-600 text-sm">Enter a valid token address to see details</p>
                )}
            </div>
            )}
        </div>
    )
}