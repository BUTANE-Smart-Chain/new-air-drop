
import AbiToken from "../abi/AbiToken.json";
export const Global ={
    URL :'https://butane.tech',
}
export const walletProvider = {
    METAMASK: 'metaMask',
    TRUSTWALLET: 'trustWallet',
    SAFEPAL: 'safePal',
    WALLET_CONNECT: 'walletConnect'
};

//TESTNET
export const RPC_NODE_TESTNET={
    http:"https://apis.ankr.com/1d773c13580146fb9c5419ee763d2543/9deca392b81a904bd9568c58d3f47228/binance/full/test",
    wss:"wss://apis.ankr.com/wss/1d773c13580146fb9c5419ee763d2543/9deca392b81a904bd9568c58d3f47228/binance/full/test",
}

export const RPC_NODE={
    http:"https://apis.ankr.com/b2a3cdabe89d478f8f41e738832c92fb/9deca392b81a904bd9568c58d3f47228/binance/full/main",
    wss:"wss://apis.ankr.com/wss/b2a3cdabe89d478f8f41e738832c92fb/9deca392b81a904bd9568c58d3f47228/binance/full/main"
}

export const REF_AIRDROP={
   address:'0x0000000000000000000000000000000000000000',
   pool:'0x2eCF06c0B72ebf3185a114cbD471b6BB911f7841'
}


export const TOKEN_STAKE ={
    address:'0x43B3629bb8E1d889Ebc9299e0E2406491b0152d4',
    abi: AbiToken
}
