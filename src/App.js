import React, { useContext, useCallback, useState, useEffect } from "react";
import "./App.css";
import GlobalStyled from "./GlobalStyled";
import { AppContext } from "./AppContext";
import { CircularProgress } from "@mui/material";

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
  const { web3, account, networkId, myRefCode } = useContext(AppContext);

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

  const LAUNCHPAD = "0x58724350F51ede1fc7D7878bB91a38E4d52711fB";

  const { getListTreasure } = useDAO();

  const fetchData = async (web3) => {
    setLoading(true);
    const data = await getListTreasure(account);
    const arrId = data[0].map((item) => item.id);

    console.log(data[0]);

    let promises = [];
    for (let id of arrId) {
      promises.push(getTreasueContract(web3, id));
    }
    let values = await Promise.all(promises);
    console.log("values", values);

    data[0].map((item, index) => {
      item.isExchanged = values[index];
    });

    setList(data[0]);
    list && setLoading(false);
  };

  const getTreasueContract = async (web3, id) => {
    if (!web3) {
      return [];
    }
    try {
      const contract = new web3.eth.Contract(ABI_TOKEN_CONTRACT, LAUNCHPAD);
      const data = await contract.methods.treasureCollect(id).call();
      return data.isCollected;
      // return data.isExchanged;
    } catch (error) {
      console.log("checkExchanged", error);
      return {};
    }
  };

  useEffect(() => {
    fetchData(web3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, web3]);

  const itemCard = {
    backgroundImage: `url(${Card})`,
  };

  const disableCard = {
    backgroundImage: `url(${Card})`,
    opacity: 0.5,
    cursor: "auto",
    hover: "none",
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
        {!loading && (
          <div className="wrapperItem">
            {account ? (
              list?.length > 0 ? (
                list.map((item, index) => (
                  <div key={index} className="itemAll">
                    <div
                      style={item.isExchanged ? disableCard : itemCard}
                      className={item.isExchanged ? "disable_item" : "item"}
                    >
                      <div className="elementInItem">
                        <div className="wrapperImage">
                          <img
                            src={item.imgUrl}
                            alt={item.name}
                            className="image"
                          />
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
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              color: "yellow",
                              marginTop: "0.7rem",
                            }}
                          >
                            <div style={{ marginRight: "0.5rem" }}>
                              {item.total}
                            </div>
                            <div>{tokenContractor[item.tokenContract]}</div>
                          </div>
                        </div>
                      </div>
                      <div className="wrapperBtnExchange">
                        <div>{item.isExchanged ? "Exchanged" : "Exchange"}</div>
                        <img
                          src={btnExchange}
                          alt="Exchange"
                          className="exchangeImage"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="new_item_all">
                  <div style={itemCard} className="wrapper_list_empty">
                    Empty
                  </div>
                </div>
              )
            ) : (
              <div className="item_disconnect">
                <div>No data, connect wallet to see and exchange treasure</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
