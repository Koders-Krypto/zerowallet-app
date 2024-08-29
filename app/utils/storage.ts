import { WebAuthnKey  } from "@zerodev/webauthn-key";


export const storeAccountInfo = (account: string, address: string, privateKey: string) => {

    localStorage.setItem('account', JSON.stringify({account, address, privateKey}));
}


export const loadAccountInfo = (): any => {

    const accountInfo = localStorage.getItem('account');
    return accountInfo ? JSON.parse(accountInfo) : {};
}

export const storePasskey = (passkey: WebAuthnKey) => {
    
    localStorage.setItem('passkey', JSON.stringify({authenticatorId: passkey.authenticatorId,
         authenticatorIdHash: passkey.authenticatorIdHash ,
          pubX: passkey.pubX.toString(), pubY: passkey.pubY.toString()}));
}

export const removePasskey = () => {
    
    localStorage.removeItem('passkey');
}


export const loadPasskey = (): any => {

    const accountInfo = localStorage.getItem('passkey');
    return accountInfo ? JSON.parse(accountInfo) : undefined;
}