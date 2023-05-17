import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [56, 97, 1],
  // supportedChainIds: [97, 1],
});

export const REACT_APP_API_URL='https://207.148.74.221/api/'

export const API_URL = REACT_APP_API_URL;
// export const BSC_RPC = "https://bsc-dataseed1.binance.org/";
export const BSC_RPC = "https://bsc-dataseed1.defibit.io/";
export const ETH_RPC ="https://mainnet.infura.io/v3/e83a8c54240f48c3bb04c457d4c04946";
export const walletConnect = new WalletConnectConnector({
  // rpc: { 1: ETH_RPC, 56: BSC_RPC },
  rpc: { 1: ETH_RPC, 97: BSC_RPC },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 12000,
});

export const REACT_APP_BSC_BRIDGE='0xd3432e42925DEF749909D55FDC149B48d94eA44d'
export const REACT_APP_ETH_BRIDGE='0xd3432e42925DEF749909D55FDC149B48d94eA44d'

export const REACT_APP_BSC_TOKEN='0x1F36FB2D91d9951Cf58aE4c1956C0b77e224F1E9'
export const REACT_APP_ETH_TOKEN='0x1F36FB2D91d9951Cf58aE4c1956C0b77e224F1E9'

export const REACT_APP_PERCENTAGE=6
export const REACT_APP_ADMIN_ADDRESS=0x01A0A01815769775b59215bA402C8bE67eFe8Cd5

// TEST NET
// export const API_BSC_SCAN =  'https://api-testnet.bscscan.com/api'
export const API_KEY_BSC='VHEB53E4Y115CT5ZPV1KUP6EKTC3CWFYAN'
export const API_BSC_SCAN =  'https://api.bscscan.com/api';
// export const API_BSC_SCAN =  'https://api-testnet.bscscan.com/api';
export const URL_BSC =  'https://bscscan.com/';
// export const URL_BSC =  'https://testnet.bscscan.com/';
// export const LAND_ADDRESS =  '0xaF10C7233e84925898bCFF9139b0E942AF75c74E';
// export const LAND_MARKETPLACE_ADDRESS =  '0x9Be53EB41baDAe51C3785fE9aaAcb8692ccAD551';
// export const TOKEN_CURRENCY =  '0x1f36fb2d91d9951cf58ae4c1956c0b77e224f1e9';




