import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import useMetaMask from "../../../wallet/hook";


function Header() {

    
  const {
    connect,
    disconnect,
    isActive,
    account,
    walletModal,
    handleWalletModal,
    switchActive,
    library
  } = useMetaMask();

    // Define some basic styles
  const textStyle = {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: '#ed2525',
    borderColor: '#333',
    color: '#fff',
  };

  return(
    <header className="p-3 mb-3">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="https://butane.tech" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none me-lg-auto">
            <img className="logo-image" src={process.env.PUBLIC_URL +'/assets/images/logo/p3.png'} alt="mdo" width="auto" height="42"/>
          </a>

          {isActive?
            (
              <div className="dropdown text-end">
                <a href="/" className="d-block link-light text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={process.env.PUBLIC_URL +'/assets/images/users/user.png'} alt="mdo" width="56" height="56" className="rounded-circle"/>
                </a>
                <ul className="dropdown-menu text-small">
                  <li><a className="dropdown-item" style={textStyle} href="/"> {account ? account.slice(0, 4).concat(`...${account.slice(-4)}`) : 'Not Connect'} </a></li>
                  <l><hr className="dropdown-divider"/></l>

                  <li><a className="dropdown-item"  onClick={() => disconnect()}>Sign out</a></li>
                </ul>
              </div>
            ):(
              <a href="/wallet">
                <button className="btn rounded-pill" style={buttonStyle}>Connect Wallet</button> 
              </a>
            )
          }
        </div>
      </div>
    </header>
  );
}
export default Header;