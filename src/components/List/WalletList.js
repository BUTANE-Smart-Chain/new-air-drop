import React from "react";

function WalletList({list,connectWallet}) {
    return (
      <div className='row'>
      {
        list
        ? list.map((item, idx) => {
            return (
              <div key={idx} className='col-lg-6 col-md-6 col-sm-6 col-12' 
                  onClick={() => {
                      connectWallet(item.provider);
                  }}>
                  <div className='card shadow-sm p-3 mb-5 rounded bg-transparent border-white wallet-card' style={{backdropFilter: "blur(6px)"}}>
                      <div className="card-body">
                          <div className='text-center'>
                              <img className="icon-lg wallet-img" src={process.env.PUBLIC_URL +'/'+item.icon} alt={item.name}/>
                              <h2 className="mt-2 title-text wallet-title">{item.name}</h2>
                              <p className="wallet-description">{item.description}</p>
                          </div>
                      </div>
                  </div>
              </div>
            )
          }) : ""
        }
      </div>
    );
  }
  export default WalletList;