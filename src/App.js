import React, { useContext, useCallback, useState, useEffect } from "react";
import "./App.css";
import GlobalStyled from "./GlobalStyled";
import { AppContext } from "./AppContext";

import Navbar from "./components/Navbar";

import BgPopup from "./assets/image/background.png";
import BgMedia from "./assets/image/backgroundScreenSmall.png";

import useDAO from "./hooks/useDAO";

import Treasure from "./assets/image/treasure.png";
import btnExchange from "./assets/image/btnExchange.png";

import Card from "./assets/image/card.png";
import Pilot from "./assets/image/pilot.png";
import PilotEarth from "./assets/image/pilotEarth.png";
import bgHeader from "./assets/image/bg-button.png";
import useWeb3 from "./hooks/useWeb3";
import { BUSD_TOKEN_ADDRESS } from "./config";
// import { BUSD_TOKEN_ADDRESS } from "../config";

function App() {
  const { web3, account, networkId, myRefCode } = useContext(AppContext);
  const { onApproveHandler, checkApprove } = useWeb3(account);
  const [isApproved, setApproved] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [list, setList] = useState([]);
  const [isShowAcc, setShowAcc] = useState(false);

  const closeModalHandler = useCallback(() => setShowAcc(false), []);
  const openModalHandler = useCallback(() => setShowAcc(true), []);

  const tokenContractor = {
    "0xae13d989dac2f0debff460ac112a837c89baa7cd": "Wbnb",
    "0x98649fde88981790b574c9A6066004D5170Bf3EF": "Busd",
    "0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378": "Eth",
  };

  const addressWallet = "0xf8ead57a5a68b490a85e9c8c99728c52c84432d5";
  // const accessToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhvYW5nLmRhaS50aHVjQGdtYWlsLmNvbSIsInN1YiI6IjE0OTljODYwLWUwNzQtNGY1Ny1iYWNlLTllMmYwY2UwMTUxNSIsImlhdCI6MTY1ODIxMTczMSwiZXhwIjoxNjU4Mjk4MTMxfQ.1wxgsm8aNImE-eSIXxf7VlEPxuRvbOyNw7sy6s3eDJI";

  const LIST = [
    {
      starName: "Star1",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: Treasure,
    },
    {
      starName: "Star2",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: Treasure,
    },
    {
      starName: "Star3",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: Treasure,
    },
    {
      starName: "Star4",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: Treasure,
    },
    {
      starName: "Star5",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: Treasure,
    },
    {
      starName: "Star6",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: Treasure,
    },
    {
      starName: "Star7",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: Treasure,
    },
    {
      starName: "Star7",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: Treasure,
    },
    {
      starName: "Star7",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: Treasure,
    },
    {
      starName: "Star7",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: Treasure,
    },
    {
      starName: "Star7",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: Treasure,
    },
    {
      starName: "Star7",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: Treasure,
    },
    {
      starName: "Star7",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: Treasure,
    },
  ];

  const { getListTreasure } = useDAO();

  const fetchData = async () => {
    const data = await getListTreasure(addressWallet);
    setList(data[0]);
  };

  useEffect(() => {
    fetchData();
    loadAllowance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  console.log("LISTTreasure", list);

  const itemCard = {
    backgroundImage: `url(${Card})`,
  };

  const loadAllowance = async () => {
    const isApproved = await checkApprove(web3, BUSD_TOKEN_ADDRESS, 18);

    if (isApproved) {
      setApproved(true);
    } else {
      setApproved(false);
    }
  };
  const onApprove = async () => {
    setLoading(true);

    const isSuccess = await onApproveHandler(web3, BUSD_TOKEN_ADDRESS);
    setApproved(isSuccess);

    setLoading(false);
  };

  console.log("ACCOUNT", account);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
      }}
    >
      <div className="wrapperHeaderImage">
        <img src={bgHeader} alt="header" className="headerImage" />
      </div>
      <GlobalStyled />
      <Navbar
        account={account}
        networkId={networkId}
        openModalHandler={openModalHandler}
        myRefCode={myRefCode}
      />
      <img
        src={BgPopup}
        className="backgroundScreenLarge"
        alt="Item"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          zIndex: 100,
        }}
      />
      <img
        src={BgMedia}
        alt="Item"
        className="backgroundScreenSmall"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          zIndex: 100,
        }}
      />
      <div className="wrapperPilotEarthImage">
        <img src={PilotEarth} alt="Pilot" className="pilotImage" />
      </div>
      <div className="wrapperPilotImage">
        <img src={Pilot} alt="Pilot" className="pilotImage" />
      </div>
      <div className="containerTreasure" id="container">
        <div className="myTreasure">My treasure</div>
        <div className="wrapperItem">
          {list.map((item, index) => (
            <div key={index} className="itemAll">
              <div style={itemCard} key={index} className="item">
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        color: "yellow",
                        marginTop: "0.7rem",
                      }}
                    >
                      <div style={{ marginRight: "0.5rem" }}>{item.total}</div>
                      <div>{tokenContractor[item.tokenContract]}</div>
                    </div>
                  </div>
                </div>
                <div className="wrapperBtnExchange">
                  <div>Exchange</div>
                  <img
                    src={btnExchange}
                    alt="Exchange"
                    className="exchangeImage"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
