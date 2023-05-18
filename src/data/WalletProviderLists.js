import { walletProvider } from "./Constats";

export const list  = [
    {
      name: 'Metamask',
      description:'A crypto wallet and gateway to blockchain apps',
      icon:'assets/images/wallet/mask.jpeg',
      provider: walletProvider.METAMASK,
    },
    {
      name: 'Trust Wallet',
      description:'Always secure and protected,wherever you go',
      icon:'assets/images/wallet/trust.jpeg',
      provider: walletProvider.TRUSTWALLET,
    },
    {
      name: 'Safepal',
      description:'The most trusted and secure crypto wallet',
      icon:'assets/images/wallet/safepal.jpeg',
      provider: walletProvider.SAFEPAL,
    },
    {
      name: 'Wallet Connect',
      description:'The communications protocol for web3',
      icon:'assets/images/wallet/walcon.jpeg',
      provider: walletProvider.WALLET_CONNECT,
    },
  ];
  