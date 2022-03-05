import { useWallet } from "@solana/wallet-adapter-react"
export const Connect = () =>{ 
   const {connect} = useWallet()
    return (
    <div onClick={connect} style={{float:'right', cursor:'pointer'}}>
        CONNECT
    </div>
)
}