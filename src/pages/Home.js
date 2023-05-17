import React, { useState,useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {list } from '../data/PoolLists';
import AbiFaucet from "../abi/AbiFaucet.json";
import {RPC_NODE_TESTNET,REF_AIRDROP,TOKEN_STAKE,Global} from "../data/Constats";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import useMetaMask from "../wallet/hook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-bootstrap-modal';


function Home({rel,id}) {
    const [poolList, setPoolList] = useState(list);
    const [loading, setLoading] = useState(false);
    const [selectedFaucet, setSelectedFaucet] = useState(list[0].contract);
    const [selectedAddress, setSelectedAddress] = useState(list[0].assetAddress);
    const [tokenName, setTokenName] = useState(null);
    const [tokenSymbol, setTokenSymbol] = useState(null);
    const [tokenDecimal, setTokenDecimal] = useState(null);
    const [tokenSupply, setTokenSupply] = useState(null);
    const [refferal, setRefferal] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const RPC_NODE = RPC_NODE_TESTNET;
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
    const params = useParams();
    const navigate = useNavigate();
    const web3Obj = library;
   

     //--- function notify
    const notify = (isError, msg) => {
        if (isError) {
        toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT,
        });
        } else {
        toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT,
        });
        }
    };

    const tokenInfo= async()=>{
        try {
            var web3 = new Web3(RPC_NODE.http);
            var tokenStakeContract = new web3.eth.Contract(TOKEN_STAKE.abi, TOKEN_STAKE.address);
            var decimals = await tokenStakeContract.methods.decimals().call();
            var name = await tokenStakeContract.methods.name().call();
            var symbol = await tokenStakeContract.methods.symbol().call();
            var totalSupply= await tokenStakeContract.methods.totalSupply().call();
            var pow = 10 ** decimals;
            setTokenName(name);
            setTokenSymbol(symbol);
            setTokenDecimal(decimals);
            setTokenSupply(totalSupply/pow);
            
        }catch(err){
            notify(true, err);
            console.log('err',err);
        }
    }

    const claimAirdrop = async () => {
        var address = REF_AIRDROP.pool;

        setLoading(true);
        try {
            var contract = new web3Obj.eth.Contract(AbiFaucet, address);
            await contract.methods
            .claim(refferal)
            .send({ from: account })
            .then(() => {
                notify(false,'Success Claim Aidrop');
                setLoading(false);
            });
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const handleOptionChange = () => (e) => {
        var idx = e.target.value;
        setSelectedFaucet(list[idx].contract);
        setSelectedAddress(list[idx].assetAddress);
    };
    const handleCopyToClipboard = () => (e) => {
        navigator.clipboard.writeText(Global.URL+'/reff/'+account);
        notify(false,'Copied - '+selectedAddress.slice(0, 4).concat(`...${selectedAddress.slice(-4)}`));
    };

    useEffect(() => {
        document.title = "XPacman Airdrop";
        tokenInfo();
    }, []);

    useEffect(() => {
        console.log('account',account);
    }, [account,isActive]);

    useEffect(() => {
        if(params.id && params.id!=null){
            setRefferal(params.id);
        }else{
            setRefferal(REF_AIRDROP.address);
        }

        if(params.rel && params.rel!=='reff'){
            navigate('/');
        }

    }, [params]);
    return (
        <>
        <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row align-items-center g-5 py-5">
           
            <div className="col-lg-6">
                <div className='head-bar'/>
                <h1 className="display-5 lh-1 my-3 title-text fw-600">Airdrop<br/>XPacman Token</h1>
                
                <p className="lead py-3">
                    <div className='mb-4'>Connect your wallet and claim or generate your refferal link to share airdrop</div>
                    <div>Use Testnet Binance Smart Chain</div>
                    <a className='text-warning' href='https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain' rel='nofollow' target='_blank'><div>Add Testnet BSC Network to your wallet</div></a>
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                </div>
            </div>
            <div className="col-lg-6">
                <label className='small'>Token Address:</label>
                <div className='text-white mb-3'>{TOKEN_STAKE.address}</div>
                <label className='small'>Token Name:</label>
                <div className='text-white mb-3'>{tokenName}</div>
                <label className='small'>Symbol:</label>
                <div className='text-white mb-3'>{tokenSymbol}</div>
                <label className='small'>Decimals:</label>
                <div className='text-white mb-3'>{tokenDecimal}</div>
                <label className='small'>Total Suply:</label>
                <div className='text-white mb-3'>{tokenSupply?.toFixed(0)}</div>

             
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    {isActive && account?
                        <button 
                            type="button" 
                            className="btn btn-warning btn-lg px-4 w-100" 
                            disabled={loading}
                            onClick={() => {
                                claimAirdrop();
                            }}>
                                <i class="fa-regular fa-coin-blank"></i>{loading?'Loading Faucet...':'Claim Airdrop!'}
                        </button>
                        :
                        <a href="/wallet" className='w-100'><button type="button" className="btn btn-primary btn-lg px-4 w-100" ><i class="fa-regular fa-coin-blank"></i>Connect Your Wallet</button></a>
                    }
                    
                </div>
                {isActive && account?
                <>
                <div className='text-center my-4'>- OR -</div>
                <button 
                    type="button" 
                    className="btn btn-info btn-lg px-4 w-100" 
                    disabled={loading}
                    onClick={handleCopyToClipboard()}>
                        <i class="fa-regular fa-coin-blank"></i>{loading?'Loading Faucet...':'Copy your referal link'}
                </button>
                </>
                :''
                
                }
            </div>
            </div>
        </div>
        
        <ToastContainer />
        </>
    )
}

export default Home
