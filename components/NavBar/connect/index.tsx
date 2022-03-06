import { useWallet } from "@solana/wallet-adapter-react"
import React, { FC, useMemo, useState} from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { WalletModal } from "./walletModel";
import { WalletMultiButton } from "./wallet-adapter-react-ui/src";
import { clusterApiUrl } from '@solana/web3.js';
import type { AppProps } from 'next/app'
import { HTMLFactory } from "react";

// Default styles that can be overridden by your app
// require('./walletConnect.css');

interface WalletProps {
    children : React.ReactNode
}

export const Connect = ({children}:WalletProps) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
        ],
        [network]
    );

    const [visible, setVisible] = useState(false);

    return (

            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <Con onClick={(e)=>setVisible(true)} />
                    {visible? <WalletModal/> : null }
                </WalletModalProvider>
            </WalletProvider>

    );
};

interface ConProps {
onClick : (e: React.MouseEvent<HTMLElement>) => void
}

export const Con = ({onClick}:ConProps) =>{ 
   const { publicKey, wallet, disconnect,connect, connected, disconnecting } = useWallet();
   console.log({publicKey,wallet,connect, connected, disconnecting})
   const dis = async () =>{ 
       console.log('disconnecting')
       await disconnect()
       console.log('done')
   }
    return (
    <div onClick = {connected? dis: onClick} style={{float:'right', cursor:'pointer'}} 
    >
       {connected? 'DISCONNECT': 'CONNECT'}

    </div>
)
}







// import { useWallet } from '@solana/wallet-adapter-react';
// import React, { FC, MouseEventHandler, useCallback, useMemo } from 'react';
// import { Button, ButtonProps } from './Button';
// import { WalletIcon } from './WalletIcon';

// export const WalletConnectButton: FC<ButtonProps> = ({ children, disabled, onClick, ...props }) => {
//     const { wallet, connect, connecting, connected } = useWallet();

//     const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
//         (event) => {
//             if (onClick) onClick(event);
//             // eslint-disable-next-line @typescript-eslint/no-empty-function
//             if (!event.defaultPrevented) connect().catch(() => {});
//         },
//         [onClick, connect]
//     );

//     const content = useMemo(() => {
//         if (children) return children;
//         if (connecting) return 'Connecting ...';
//         if (connected) return 'Connected';
//         if (wallet) return 'Connect';
//         return 'Connect Wallet';
//     }, [children, connecting, connected, wallet]);

//     return (
//         <Button
//             className="wallet-adapter-button-trigger"
//             disabled={disabled || !wallet || connecting || connected}
//             startIcon={wallet ? <WalletIcon wallet={wallet} /> : undefined}
//             onClick={handleClick}
//             {...props}
//         >
//             {content}
//         </Button>
//     );
// };
