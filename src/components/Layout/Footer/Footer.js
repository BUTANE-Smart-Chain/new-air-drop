import React from "react";
class Footer extends React.Component {
  render() {
    return(
      <div className ="container footer-margin">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center ">
            <a href="https://butane.tech/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              <img src={process.env.PUBLIC_URL +'/assets/images/logo/p3.png'} width="auto" height="32" alt="Butane Logo"/>
            </a>
            <span className="mb-3 mb-md-0 text-muted">&copy; 2023 Butane_Network Referral</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3"><a className="text-muted" href="https://twitter.com/Butane_Network"><i className="fa fa-twitter"></i></a></li>
            <li className="ms-3"><a className="text-muted" href="https://discord.gg/zk4t92b9MX"><i className="fa fa-discord"></i></a></li>
            <li className="ms-3"><a className="text-muted" href="https://t.me/butanechain"><i className="fa fa-telegram"></i></a></li>
          </ul>
        </footer>
      </div>
    );
  }
}
export default Footer;