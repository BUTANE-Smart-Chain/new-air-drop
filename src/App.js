import logo from './logo.svg';
import './styles/App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import CommingSoon from "./pages/ComingSoon";

import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { MetaMaskProvider } from "./wallet/hook";
import ConnectWallet from "./pages/ConnectWallet";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:rel/:id" element={<Home />} />
        <Route path="/home/:rel/:id" element={<Home />} />
        <Route path="/soon" element={<CommingSoon />} />
        <Route path="/wallet" element={<ConnectWallet />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
