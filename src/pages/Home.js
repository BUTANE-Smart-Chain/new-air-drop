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
        document.title = " Referral Program - Butane Network";
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
                        
                        <h1 className="display-5 lh-1 my-3 title-text fw-600">Referral<br/>Butane $BBC</h1>
                        <p className="lead py-3">
                            <div className='mb-4'>Connect your wallet to generate your referral link to share to your friends and family.</div>
                            <div>Make Sure To Use Butane Smart Chain</div>
                            <a className='text-warning' href='https://docs.butane.tech/developers/network-details/usdbbc-mainnet-+-testnet' rel='noreferrer' target='_blank'>
                                <div>Add BBC Network to your wallet</div>
                            </a>
                        </p>
                    </div>
                    <div className="col-lg-6">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            {isActive && account?
                                <>
                                    <button 
                                        type="button" 
                                        className="btn btn-info btn-lg px-4 w-100" 
                                        disabled={loading}
                                        onClick={handleCopyToClipboard()}>
                                            <i className="fa-regular fa-coin-blank"></i>{loading?'Loading Faucet...':'Copy your referral link'}
                                    </button>
                                </>
                                :
                                <a href="/wallet" className='w-100'>
                                    <button type="button" className="btn btn-primary btn-lg px-4 w-100" >
                                        <i className="fa-regular fa-coin-blank"></i>Connect Your Wallet
                                    </button>
                                </a>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Home;
