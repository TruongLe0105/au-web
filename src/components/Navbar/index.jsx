import React, { useContext, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../AppContext";
import { Flex, OutlineButton, Text } from "../SwapBoard";
import { isMobile } from "react-device-detect";
import { ShowMoreIcon, CopyIcon } from "../Icons";
import useClickOutside from "../../hooks/useClickOutside";
import { GradientText } from "../commonStyle";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import logo from '../../assets/image/logo.png';
import '../../App.css'


export const NAV_HEIGHT = "100px";

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #c4c4c4;
  z-index: 1000;
  background-color:rgb(19, 19, 19);
  height: ${NAV_HEIGHT};
`;

const StyledLogoIcon = styled.img`
  width: ${({ width }) => width ?? "100%"};
  height: auto;
  margin-right: 8px;
`;

// const StyledLink = styled.div`
//   transition: 0.2 ease-out;
//   color: #000;
//   font-weight: 700;
//   ${({ active }) => active && `cursor:default;`}
//   text-decoration: unset;
//   /* position: relative; */
//   text-align: center;
//   :hover {
//     opacity: 0.8;
//     color: #000;
//   }
//   ${({ active }) =>
//     active &&
//     `
//   :after {
//     content: '';
//     position: absolute;
//     height: 2px;
//     width: 100%;
//     left: 0;
//     background:-webkit-linear-gradient(-90deg, rgb(136, 3, 47), rgb(238, 21, 66))
//   }
//   `}
// `;

// const StyledMenuButton = styled(ShowMoreIcon)`
//   cursor: pointer;
// `;

// const NavLinkWrapper = styled.div`
//   top: -10%;
//   opacity: 0;
//   z-index: -1;
//   ${({ isShow }) =>
//     isShow && `top: calc(100% + 12px);opacity:1;z-index:1;padding:1rem;`}
//   position: absolute;
//   background: #fff;
//   box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
//   transition: 0.2s ease-in-out;
//   border: 1px solid rgba(0, 0, 0, 0.1);
//   border-radius: 20px;
//   flex-direction: column;
//   left: -200%;
//   width: 200px;
//   transform: translateX(-50%);
//   & > * + * {
//     margin-top: 1rem;
//   }
//   @media screen and (min-width: 768px) {
//     opacity: 1;
//     flex-direction: row;
//     box-shadow: unset;
//     background: transparent;
//     border: unset;
//     border-radius: 0;
//     z-index: 1;
//     position: unset;
//     justify-content: center;
//     width: auto;
//     transform: unset;
//     * {
//       margin-top: 0;
//     }
//   }
// `;

const StyledAddress = styled(OutlineButton)`
  padding: 8px 1rem;
`;

const RenderConnectButton = (
  account,
  handleConnect,
  openModalHandler,
  myRefCode
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
        <OutlineButton onClick={handleConnect}>
          Connect Wallet
        </OutlineButton>
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

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Navbar = ({ account, networkId, openModalHandler, myRefCode }) => {
  const { handleConnect, switchNetworkHandler } = useContext(AppContext);
  const { pathname } = useLocation();
  const [isShowLink, setShowLink] = React.useState(false);

  const navRef = useRef(null);
  useClickOutside(navRef, () => {
    if (isShowLink) setShowLink(false);
  });

  const query = useQuery();

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
          <div>Another</div>
        </a>

        {/* <div
          className="position-relative mx-md-auto "
          style={{ marginRight: 5 }}
          ref={navRef}
        >
          <StyledMenuButton
            width="25px"
            onClick={() => setShowLink((prev) => !prev)}
            className="d-md-none"
          />

          <NavLinkWrapper
            className="d-flex align-items-center"
            isShow={isShowLink}
          >
            <StyledLink
              as={Link}
              to={
                query.get("ref") ? `/market?ref=${query.get("ref")}` : "/market"
              }
              className="text-center"
              active={pathname.includes("market")}
            >
              <Text
                fontSize="20px"
                fontWeight={500}
                className="ms-0"
                color="inherit"
              >
                Market
              </Text>
            </StyledLink>

            {account && (
              <StyledLink
                className={`ms-1 ms-md-5 text-center`}
                as={Link}
                to={
                  query.get("ref")
                    ? `/my-nft?ref=${query.get("ref")}`
                    : "/my-nft"
                }
                active={pathname.includes("my-nft")}
              >
                <Text
                  fontSize="20px"
                  fontWeight={500}
                  className="ms-0"
                  color="inherit"
                  textAlign="center"
                >
                  My NFT
                </Text>
              </StyledLink>
            )}
            <a
              className={`ms-1 ms-md-5 text-center`}
              style={{ textDecoration: "none", color: "black" }}
              href="https://nftmarket.winerydao.day/upload/market-guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text
                fontSize="20px"
                fontWeight={500}
                className="ms-0"
                color="inherit"
                textAlign="center"
              >
                Guide
              </Text>
            </a>
             */}
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
              myRefCode
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
              myRefCode
            )
          )}
        </Flex>
      </Flex >
    </NavWrapper >
  );
};

export default Navbar;
