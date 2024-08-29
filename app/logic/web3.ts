import { AbstractProvider, ethers } from "ethers"
import { NetworkUtil } from "./networks";


export const getJsonRpcProvider = async(chainId: string): Promise<AbstractProvider> => {

    console.log("Use JsonRpcProvider")

    console.log(NetworkUtil.getNetworkById(parseInt(chainId))?.url)
    
    return new ethers.JsonRpcProvider(NetworkUtil.getNetworkById(parseInt(chainId))?.url)
}