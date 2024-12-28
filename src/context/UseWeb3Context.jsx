import { useContext } from "react";
import { Web3context } from "./Web3Context";
import { use } from "react";

export const useWeb3Context = ()=>{
    return useContext(Web3context);
}