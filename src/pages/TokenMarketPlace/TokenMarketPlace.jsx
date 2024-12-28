
import { useEffect,useState } from "react";
import { useWeb3Context } from "../../context/UseWeb3Context";
import { ethers } from "ethers";
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Navigation/Layout"
import erc20Abi from "../../constant/erc20Abi.json"
import tokenMarketplaceAbi from "../../constant/tokenmarketplace_ABi.json"
import TokenBalance from "../../Components/TokenMarketPlace/TokenBalance";
import TokenPrice from "../../Components/TokenMarketPlace/TokenPrice";
import BuyToken from "../../Components/TokenMarketPlace/BuyToken";
import Selltoken from "../../Components/TokenMarketPlace/Selltoken";


const TokenMarketPlace = () => {

  const navigate = useNavigate();
    const [tokenMarketplaceInstance,setTokenMarketplaceInstance]=useState(null)
    const [erc20ContractInstance,setErc20ContractInstance]=useState(null)
    const {web3State}=useWeb3Context()
    const {signer,provider}=web3State;

    useEffect(()=>{
      const erc20TokenInit = ()=>{
        try{
          const contractAddress = "0xb91F1801C7b99BB1e45139e52E5ec6916654CD4b";
          const erc20ContractInstance = new ethers.Contract(contractAddress, erc20Abi, provider);
          setErc20ContractInstance(erc20ContractInstance);
        }catch(error){
          toast.error("Error start the vote")
          console.log(error);
        }
      }
      provider && erc20TokenInit();
    }, [provider]);


    useEffect(()=>{
      const tokenMarketplaceInit = ()=>{
        try{
          const contractAddress = "0xfBD1507816E58434B6D0AF43c34b0258C2263a32";
          const tokenMarketplaceContractInstance = new ethers.Contract(contractAddress, tokenMarketplaceAbi, signer);
          setTokenMarketplaceInstance(tokenMarketplaceContractInstance);
        }catch(error){
          toast.error("Error : token Market place")
          console.log(error);
        }
      }
      signer && tokenMarketplaceInit();
    }, [signer]);


    const handleClick = () => {
      navigate('/caste-vote'); // Replace '/desired-route' with the actual route you want to navigate to
    };

  return (
    <div>
    <Layout title={"Token Marketplace"}>

    <TokenPrice contractInstance={tokenMarketplaceInstance} />
  
      {/* Token Balance */}
      <TokenBalance erc20ContractInstance={erc20ContractInstance} />
      <br />
  
      {/* Token Price */}

      <br />
  
      {/* Buy and Sell Token Components Side by Side */}
      <div className="flex flex-wrap justify-center gap-8">
        {/* Buy Token */}
        <div className="w-[400px]">
          <BuyToken contractInstance={tokenMarketplaceInstance} />
        </div>
  
        {/* Sell Token */}
        <div className="w-[400px]">
          <Selltoken 
            erc20ContractInstance={erc20ContractInstance} 
            contractInstance={tokenMarketplaceInstance} 
          />
        </div>
      </div>

      <div className="flex justify-center items-center mt-20">
      <button 
        onClick={handleClick} 
        className="group relative inline-flex items-center text-teal-700 text-lg font-semibold py-2 px-6 hover:text-teal-800"
      >
        <span className="mr-2">if you have tokens , then wait for start voting</span>
        <span className="group-hover:translate-x-2 transform transition duration-300">
          &rarr; 
        </span>
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-500 to-teal-800 scale-x-0 group-hover:scale-x-100 transform transition duration-300"></span>
      </button>
    </div>

  
    </Layout>
  </div>
  
  )
}

export default TokenMarketPlace