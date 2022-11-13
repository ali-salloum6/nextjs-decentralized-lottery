import React from "react";
import { ConnectButton } from "web3uikit";

export default function Header(props) {
    return (
        <div className={props.className}>
            <div className="text-xl">Decentralized Lottery</div>
            <div>
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    );
}
