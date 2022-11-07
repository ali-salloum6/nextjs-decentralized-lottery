import { useEffect } from "react";
import { useMoralis } from "react-moralis";

export default function ManualHeader() {
    const { enableWeb3, deactivateWeb3, account, isWeb3Enabled, isWeb3EnableLoading, Moralis} = useMoralis();

    useEffect(() => {
        if (isWeb3Enabled) return;
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3();
            }
        }
    }, [isWeb3Enabled]);

    useEffect(()=>{
        Moralis.onAccountChanged((account)=>{
            if (account==null) {
                if (typeof window !== "undefined") {
                    window.localStorage.removeItem("connected");
                }
                deactivateWeb3();
            }
        })
    },[isWeb3Enabled])

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <div>
                    <button
                        onClick={async () => {
                            await enableWeb3();
                            if (typeof window !== "undefined") {
                                window.localStorage.setItem("connected", "injected");
                            }
                        }}
                        disabled={isWeb3EnableLoading}
                    >
                        Connect
                    </button>
                </div>
            )}
        </div>
    );
}
