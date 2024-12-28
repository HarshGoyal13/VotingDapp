import {useEffect, useState } from "react"
import {Web3context} from "./Web3Context"
import {getWeb3State} from "../utils/GetWeb3State"
import { HandelAccountChange } from "../utils/HandelAccountChange"
import { HandelChainChange } from "../utils/HandelChainChange"

const Web3Provider = ({children}) => {

    const [web3State , setWeb3State] = useState({
        contractInstance :null,
        selectedAccount : null,
        chainId: null,
        signer:null, 
        provider:null,
    })

    const handelwallet = async() =>{
     try{
      const {contractInstance ,selectedAccount, chainId, signer, provider} = await getWeb3State();
      console.log(contractInstance ,selectedAccount, chainId, signer, provider)
      setWeb3State({contractInstance ,selectedAccount, chainId,signer, provider});
     }catch(error){ 
      console.log(error);
     }
    }

    useEffect(()=>{
      // accountsChanged: Triggered when the user switches accounts in MetaMask.
      window.ethereum.on('accountsChanged',()=> HandelAccountChange(setWeb3State));

      // chainChanged: Triggered when the user switches to a different blockchain network (e.g., Ethereum Mainnet to Polygon).
      window.ethereum.on('chainChanged',()=> HandelChainChange(setWeb3State));

      return ()=>{
      // Remove the listeners to avoid memory leaks or duplicate event handlers when the component is destroyed or re-rendered.
        window.ethereum.removeListener('accountsChanged',()=> HandelAccountChange(setWeb3State));
        window.ethereum.removeListener('chainChanged',()=> HandelChainChange(setWeb3State));
      }

    })

  return (
    <>
    <Web3context.Provider value={{web3State, handelwallet}}>
    {children}
    </Web3context.Provider>

    </>
    
  )
}

export default Web3Provider


