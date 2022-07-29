import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../../AppContext";
import { Flex, OutlineButton} from "../SwapBoard";
import { isMobile } from "react-device-detect";
import { CopyIcon } from "../Icons";
import useClickOutside from "../../hooks/useClickOutside";
import { GradientText } from "../commonStyle";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import logo from '../../assets/image/logo.png';
import accessTokenBtn from "../../assets/image/accessTokenBtn.svg";
import '../../App.css';
import './index.css';


export const NAV_HEIGHT = "120px";

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1rem;
  z-index: 300;
  background-color: black;
  height: ${NAV_HEIGHT};
  @media (max-width: 768px) {
    height:70px;
    padding:0;
  }
`;

const StyledLogoIcon = styled.img`
  width: ${({ width }) => width ?? "100%"};
  height: auto;
  margin-right: 8px;
`;


const StyledAddress = styled(OutlineButton)`
  padding: 8px 1rem;
`;


const RenderConnectButton = (
  account,
  handleConnect,
  openModalHandler,
  myRefCode,
  
  
) => {

  const onCopyRef = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_WEB_DOMAIN}/market?ref=${myRefCode}`
    );
    withReactContent(Swal).fire({
      imageUrl: "/mouse.svg",
      imageWidth: "auto",
      imageHeight: "auto",
      imageAlt: "Custom image",

      title: (
        <span style={{ color: "rgba(30, 147, 255, 1)" }}>Copied Success!</span>
      ),
      textColor: "green",
      html: (
        <span style={{ color: "rgb(128, 128, 128)", fontWeight: 400 }}>
          Share to your friend now !!!
        </span>
      ),
      focusConfirm: false,
      confirmButtonText: "Continue",

      backdrop: `#e7edf599`,
    });
  };

  if (window.ethereum) {
    if (!account) {
      return (
            <div onClick ={handleConnect} className="connectBtnWallet">
              <div className="titleConnectWallet">Connect Wallet</div>
              <img src={accessTokenBtn} alt="Connect Wallet" className="imageConnectWallet" />
            </div>
      );
    }
  } else {
    if (isMobile)
      return (
        <OutlineButton
          style={{ textDecoration: "none" }}
          target="_blank"
          as="a"
          href={process.env.REACT_APP_METAMASK_DOMAIN}
        >
          Connect Wallet
        </OutlineButton>
      );
    return (
      <OutlineButton
        as="a"
        target="_blank"
        href="https://metamask.io/download.html"
      >
        Install Metamask
      </OutlineButton>
    );
  }

  if (account)
    return (
      <div>
        <StyledAddress onClick={openModalHandler}>
          {account.slice(0, 5)}...{account.slice(-5)}
        </StyledAddress>
        {myRefCode && (
          <div className="d-flex mt-2">
            <GradientText
              className="mt-2 mx-0"
              fontSize="14px"
            >{`Ref: ${myRefCode}`}</GradientText>
            <CopyIcon
              width="24px"
              style={{ cursor: "pointer", marginLeft: 5 }}
              onClick={onCopyRef}
              fill="black"
            />
          </div>
        )}
      </div>
    );
};


const Navbar = ({ account, networkId, openModalHandler, myRefCode,   }) => {
  const { handleConnect, switchNetworkHandler } = useContext(AppContext);
  const [isShowLink, setShowLink] = React.useState(false);

  const navRef = useRef(null);
  useClickOutside(navRef, () => {
    if (isShowLink) setShowLink(false);
  });



  return (
    <NavWrapper>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        className="container h-100 position-relative"
      >
        <a
          href="https://au.milkywaygalaxy.io/"
          style={{ textDecoration: "unset" }}
          className='logo'
        >
          <StyledLogoIcon className='logoImage' src={logo} width="80px" />
        </a>
        <div className="heading">My treasure</div>

        
        <Flex
          alignItems="center"
          style={!isMobile ? { display: "none" } : {}}
        >
          {networkId != process.env.REACT_APP_CHAIN_ID && account ? (
              <OutlineButton
              onClick={() =>
                switchNetworkHandler(process.env.REACT_APP_CHAIN_ID)
              }
            >
              Wrong network
            </OutlineButton>
          ) : (
            RenderConnectButton(
              account,
              handleConnect,
              openModalHandler,
              myRefCode,
              
              
            )
          )}
        </Flex>

        <Flex alignItems="center" style={isMobile ? { display: "none" } : {}}>
          {networkId != process.env.REACT_APP_CHAIN_ID && account ? (
              <OutlineButton
              onClick={() =>
                switchNetworkHandler(process.env.REACT_APP_CHAIN_ID)
              }
            >
              Wrong network
            </OutlineButton>
          ) : (
            RenderConnectButton(
              account,
              handleConnect,
              openModalHandler,
              myRefCode,
              
              
            )
          )}
        </Flex>
      </Flex >
    </NavWrapper >
  );
};

export default Navbar;
