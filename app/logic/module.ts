import { Contract } from "ethers";
import { getJsonRpcProvider } from "./web3";
import SafePassKeyNFT from "./SafePassKeyNFT.json";
import {  Address, Hex, pad } from "viem";
import {
    getClient,
    getModule,
    getAccount,
    installModule,
    isModuleInstalled,
    ModuleType,
  } from "@rhinestone/module-sdk";
import { NetworkUtil } from "./networks";
import { SafeSmartAccountClient, getSmartAccountClient } from "./permissionless";
import { KernelValidator } from "@zerodev/passkey-validator";
import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";   


const webAuthnModule = "0xD990393C670dCcE8b4d8F858FB98c9912dBFAa06"
export const safePassKeyNFT = "0x0b4532B216D7c961356a9D1dD3FD25dB1FDCd294"


export const getSafePassNFTCount = async (chainId: string, account: string): Promise<any> => {

    const provider = await getJsonRpcProvider(chainId)

    const safePassKey = new Contract(
        safePassKeyNFT,
        SafePassKeyNFT.abi,
        provider
    )


    const safePassKeyCount = await safePassKey.balanceOf(account);

    return safePassKeyCount;

}


export const sendTransaction = async (chainId: string, recipient: string, amount: bigint, data: Hex, walletProvider: any, safeAccount: Hex): Promise<any> => {

    const call = { to: recipient as Hex, value: amount, data: data }

    const key = BigInt(pad(webAuthnModule as Hex, {
        dir: "right",
        size: 24,
      }) || 0
    )

    const validators = await isInstalled(parseInt(chainId), safeAccount, webAuthnModule, 'validator') ? [] : [{ address: walletProvider.address, context: await walletProvider.getEnableData()}]

    const smartAccount = await getSmartAccountClient( { chainId, nonceKey: key, address: safeAccount, signUserOperation: walletProvider.signUserOperation, getDummySignature: walletProvider.getDummySignature, validators: validators})

    return await smartAccount.sendTransaction(call);
}



const buildInstallModule = async (chainId: number, safeAccount: Address, address: Address, type: ModuleType, initData: Hex): Promise<any> => {


    const client = getClient({ rpcUrl: NetworkUtil.getNetworkById(chainId)?.url!});

    // Create the account object
    const account = getAccount({
            address: safeAccount,
            type: "safe",
        });


    const accountModule = getModule({
        module: address,
        initData: initData,
        type:  type,
      });

    const executions = await installModule({
        client,
        account,
        module: accountModule,
      });


      return {to: executions[0].target, value: executions[0].value.toString() , data: executions[0].callData}

}



export const isInstalled = async (chainId: number, safeAddress: Address, address: Address, type: ModuleType): Promise<boolean> => {



    const client = getClient({ rpcUrl: NetworkUtil.getNetworkById(chainId)?.url!});


    // Create the account object
    const account = getAccount({
            address: safeAddress,
            type: "safe",
        });


    const accountModule = getModule({
        module: address,
        initData: '0x',
        type:  type ,
      });

     
    try {  
    return await isModuleInstalled({
        client,
        account,
        module: accountModule,
      });
    }
    catch {
        return false;
    }

}


export const addWebAuthnModule = async (safeClient: SafeSmartAccountClient, passKeyValidator: KernelValidator<ENTRYPOINT_ADDRESS_V07_TYPE>) => {


    const buildWebAuthnModule = await buildInstallModule(safeClient.chain.id, safeClient.account.address, webAuthnModule, 'validator', await passKeyValidator.getEnableData() )

    await safeClient.sendTransaction({to: buildWebAuthnModule.to as Hex, value: BigInt(buildWebAuthnModule.value), data: buildWebAuthnModule.data as Hex})
    
}