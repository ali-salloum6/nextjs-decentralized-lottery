import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useEffect, useState } from "react";
import { BigNumber, ethers, ContractTransaction } from "ethers";
import { useNotification } from "web3uikit";
import React from "react";

interface contractAddressesInterface {
    [key: string]: string[];
}

export default function LotteryEntrance() {
    const addresses: contractAddressesInterface = contractAddresses;
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const chainId: string = parseInt(chainIdHex!).toString();
    const lotteryAddress = chainId in addresses ? addresses[chainId][0] : null;
    const [entranceFee, setEntranceFee] = useState("0");
    const [numPlayers, setNumPlayers] = useState("0");
    const [recentWinner, setRecentWinner] = useState("0");

    const dispatch = useNotification();

    const {
        runContractFunction: enterLottery,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "enterLottery",
        params: {},
        msgValue: entranceFee,
    });

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getEntranceFee",
        params: {},
    });

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getNumberOfPlayers",
        params: {},
    });

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getRecentWinner",
        params: {},
    });

    async function updateUI() {
        const entranceFeeFromCall = ((await getEntranceFee()) as BigNumber).toString();
        const numPlayersFromCall = ((await getNumberOfPlayers()) as BigNumber).toString();
        const recentWinnerFromCall = (await getRecentWinner()) as string;
        setEntranceFee(entranceFeeFromCall);
        setNumPlayers(numPlayersFromCall);
        setRecentWinner(recentWinnerFromCall);
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled]);

    const handleSuccess = async function (tx: ContractTransaction) {
        await tx.wait(1);
        handleNewNotification();
        updateUI();
    };

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
        });
    };

    return (
        <div className="p-7">
            {lotteryAddress ? (
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async function () {
                            await enterLottery({
                                onSuccess: (tx) => handleSuccess(tx as ContractTransaction),
                                onError: (error) => console.log(error)
                            });
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div>Enter Lottery</div>
                        )}
                    </button>
                    <div className="p-5">Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>
                    <div className="p-5">Number Of Players: {numPlayers} </div>
                    <div className="p-5"> Recent Winner: {recentWinner} </div>
                </div>
            ) : (
                <div>No Lottery Address Detcted</div>
            )}
        </div>
    );
}
