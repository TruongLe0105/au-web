import React, { useContext, useCallback, useState, useEffect } from "react";
import "./App.css";
import GlobalStyled from "./GlobalStyled";
import { AppContext } from "./AppContext";
import { CircularProgress } from "@mui/material";
import { isMobile } from "react-device-detect";

import Navbar from "./components/Navbar";

import BgPopup from "./assets/image/background.png";
import BgMedia from "./assets/image/backgroundScreenSmall.png";

import useDAO from "./hooks/useDAO";

import btnExchange from "./assets/image/btnExchange.png";

import Card from "./assets/image/card.png";
import Pilot from "./assets/image/pilot.png";
import PilotEarth from "./assets/image/pilotEarth.png";
import ABI_TOKEN_CONTRACT from "./contracts/ABI.json";

function App() {
  const {
    web3,
    account,
    networkId,
    myRefCode,
    switchNetworkHandler,
    handleConnect,
  } = useContext(AppContext);

  const [list, setList] = useState();
  const [loading, setLoading] = useState(false);
  const [isShowAcc, setShowAcc] = useState(false);

  const closeModalHandler = useCallback(() => setShowAcc(false), []);
  const openModalHandler = useCallback(() => setShowAcc(true), []);

  const tokenContractor = {
    "0xae13d989dac2f0debff460ac112a837c89baa7cd": "Wbnb",
    "0x98649fde88981790b574c9A6066004D5170Bf3EF": "Busd",
    "0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378": "Eth",
  };

  const LAUNCHPAD = "0x7aD6eca814Ad51d2DE862A5ac97E8FAfCEcAEd25";

  const { getListTreasure } = useDAO();

  console.log("Account", account);

  const fetchData = async (web3) => {
    setLoading(true);
    const data = await getListTreasure(account);
    const arrId = data[0].map((item) => item.id);

    let promises = [];
    for (let id of arrId) {
      const result = getTreasueContract(web3, id);
      console.log("ID", id);
      promises.push(result);
    }
    let values = await Promise.all(promises);

    data[0].map((item, index) => {
      item.isExchanged = values[index];
    });

    setList(data[0]);
    list && setLoading(false);
    networkId != process.env.REACT_APP_CHAIN_ID && setLoading(false);
  };

  const getTreasueContract = async (web3, id) => {
    if (!web3) {
      return [];
    }
    try {
      const contract = new web3.eth.Contract(ABI_TOKEN_CONTRACT, LAUNCHPAD);
      const data = await contract.methods.treasureCollect(id).call();
      return data.isExchanged;
    } catch (error) {
      console.log("checkExchanged", error);
      // return {};
    }
  };

  const exchangeNFT = async (uid) => {
    try {
      const contract = new web3.eth.Contract(ABI_TOKEN_CONTRACT, LAUNCHPAD);

      const data = await contract.methods
        .exchangeNFT(uid, account)
        .send({ from: account });
    } catch (error) {
      console.log(error);
    }
  };

  const handleExchangeTreasure = (item) => {
    if (item.isExchanged) {
      return;
    } else {
      exchangeNFT(item.id);
    }
  };

  useEffect(() => {
    fetchData(web3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, web3]);

  const RenderButtonExchange = () => {
    if (window.ethereum) {
      if (!account) {
        return (
          <div onClick={handleConnect} className="switch_network">
            <img src={Card} alt="card" className="image_switch_network" />
            <div
              onClick={() =>
                switchNetworkHandler(process.env.REACT_APP_CHAIN_ID)
              }
              className="button_switch_network"
            >
              <div className="content_switch_network">Connect Wallet</div>
              <img src={btnExchange} alt="Exchange" className="img_switch" />
            </div>
          </div>
        );
      }
    } else {
      if (isMobile)
        return (
          <div className="switch_network">
            <img src={Card} alt="card" className="image_switch_network" />
            <div
              onClick={() =>
                switchNetworkHandler(process.env.REACT_APP_CHAIN_ID)
              }
              className="button_switch_network"
            >
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                href={process.env.REACT_APP_METAMASK_DOMAIN}
                className="content_switch_network"
              >
                Connect Wallet
              </a>
              <img src={btnExchange} alt="Exchange" className="img_switch" />
            </div>
          </div>
        );
      return (
        <div
          target="_blank"
          href="https://metamask.io/download.html"
          className="switch_network"
        >
          <img src={Card} alt="card" className="image_switch_network" />
          <div className="button_switch_network">
            <a
              style={{ textDecoration: "none" }}
              target="_blank"
              href="https://metamask.io/download.html"
              className="content_switch_network"
            >
              Install Metamask
            </a>
            <img src={btnExchange} alt="Exchange" className="img_switch" />
          </div>
        </div>
      );
    }
  };

  const RenderExchangeTreasure = () => {
    const RenderChooseButton = (item) => {
      if (networkId == process.env.REACT_APP_CHAIN_ID) {
        return (
          <div
            onClick={() => handleExchangeTreasure(item)}
            className="wrapperBtnExchange"
          >
            <div>{item.isExchanged ? "Exchanged" : "Exchange"}</div>
            <img src={btnExchange} alt="Exchange" className="exchangeImage" />
          </div>
        );
      } else {
        return (
          <div
            onClick={() => switchNetworkHandler(process.env.REACT_APP_CHAIN_ID)}
            className="wrapper_btn_switch"
          >
            <div style={{ color: "yellow" }}>Switch NetWork</div>
            <img src={btnExchange} alt="Exchange" className="exchangeImage" />
          </div>
        );
      }
    };

    return (
      <div className="wrapperItem">
        {list?.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="itemAll">
              <div className={item.isExchanged ? "disable_item" : "item"}>
                <img
                  src={Card}
                  className={
                    item.isExchanged ? "disable_card_item" : "card_item"
                  }
                  alt="item"
                />
                <div className="elementInItem">
                  <div className="wrapperImage">
                    <img src={item.imgUrl} alt={item.name} className="image" />
                  </div>
                  <div
                    style={{
                      maxWidth: "80%",
                      alignItems: "center",
                    }}
                  >
                    {item?.name?.length > 25
                      ? `${item.name.slice(0, 25)}...`
                      : item.name}
                    <div className="wrapper_content_star">
                      <div style={{ marginRight: "0.5rem" }}>{item.total}</div>
                      <div>{tokenContractor[item.tokenContract]}</div>
                    </div>
                  </div>
                </div>
                {RenderChooseButton(item)}
              </div>
            </div>
          ))
        ) : (
          <div className="new_item_all">
            <img src={Card} className="card_item" alt="item" />
            <div className="empty_content">No Data</div>
          </div>
        )}
      </div>
    );
  };

  const RenderButton = () => {
    return !account ? RenderButtonExchange() : RenderExchangeTreasure();
  };

  return (
    <div>
      <GlobalStyled />
      <Navbar
        account={account}
        networkId={networkId}
        openModalHandler={openModalHandler}
        myRefCode={myRefCode}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <img
          src={BgPopup}
          className="backgroundScreenLarge"
          alt="Item"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <img
          src={BgMedia}
          alt="Item"
          className="backgroundScreenSmall"
          style={{
            width: "100%",
          }}
        />
      </div>
      <div className="wrapperPilotEarthImage">
        <img src={PilotEarth} alt="Pilot" className="pilotImage" />
      </div>
      <div className="wrapperPilotImage">
        <img src={Pilot} alt="Pilot" className="pilotImage" />
      </div>
      <div className="containerTreasure" id="container">
        <div className="myTreasure">My treasure</div>
        {loading && (
          <div className="loading_screen">
            <CircularProgress />
          </div>
        )}
        {!loading && RenderButton()}
      </div>
    </div>
  );
}

export default App;
