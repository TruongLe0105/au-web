import React, { useContext, useCallback, useState, useEffect } from "react";
import "./App.css";
import GlobalStyled from "./GlobalStyled";
import { AppContext } from "./AppContext";

import Navbar from "./components/Navbar";

import BgPopup from "./assets/image/bg-popup-star.png";

import useDAO from "./hooks/useDAO";
import { toast } from "react-toastify";

import { isMobile } from "react-device-detect";
import ModalExchange from "./components/Modal/ModalExchange";
import AlertMsg from "./components/AlertMsg";

function App() {
  const { account, networkId, myRefCode } = useContext(AppContext);
  const [list, setList] = useState([]);
  const [isShowAcc, setShowAcc] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const [active, setActive] = useState();
  const [alert, setAlert] = useState(false);

  const closeModalHandler = useCallback(() => setShowAcc(false), []);
  const openModalHandler = useCallback(() => setShowAcc(true), []);

  const tokenContractor = {
    "0xae13d989dac2f0debff460ac112a837c89baa7cd": "Wbnb",
    "0x98649fde88981790b574c9A6066004D5170Bf3EF": "Busd",
    "0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378": "Eth",
  };

  const addressWallet = "0xf8ead57a5a68b490a85e9c8c99728c52c84432d5";
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhvYW5nLmRhaS50aHVjQGdtYWlsLmNvbSIsInN1YiI6IjE0OTljODYwLWUwNzQtNGY1Ny1iYWNlLTllMmYwY2UwMTUxNSIsImlhdCI6MTY1ODIxMTczMSwiZXhwIjoxNjU4Mjk4MTMxfQ.1wxgsm8aNImE-eSIXxf7VlEPxuRvbOyNw7sy6s3eDJI";

  const LIST = [
    {
      starName: "Star1Teststaragainlengthofmystarstarstartstarstar",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: "https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png",
    },
    {
      starName: "Star2",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: "https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png",
    },
    {
      starName: "Star3",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: "https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png",
    },
    {
      starName: "Star4",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: "https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png",
    },
    {
      starName: "Star5",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: "https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png",
    },
    {
      starName: "Star6",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: "https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png",
    },
    {
      starName: "Star7",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: "https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png",
    },
    {
      starName: "Star7",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: "https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png",
    },
    {
      starName: "Star7",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: "https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png",
    },
    {
      starName: "Star7",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: "https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png",
    },
    {
      starName: "Star7",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: "https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png",
    },
    {
      starName: "Star7",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: "https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png",
    },
    {
      starName: "Star7",
      total: 1,
      token: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
      img: "https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png",
    },
  ];

  const { getListTreasure } = useDAO();

  const fetchData = async () => {
    const data = await getListTreasure(addressWallet, accessToken);
    setList(data);
  };

  useEffect(() => {
    fetchData();
    console.log("LISTTreasure", list);
  }, []);

  const item = document.getElementsByClassName("item");
  const btnExchange = document.getElementsByClassName("buttonExchange");

  const handleClick = (index) => {
    if (isMobile) {
      setActive(index);
      const prevIndex = active;
      if (index === prevIndex) {
        item[index].classList.toggle("itemInMobile");
      } else {
        item[index].classList.add("itemInMobile");
        prevIndex >= 0 && item[prevIndex].classList.remove("itemInMobile");
      }
    }
  };

  const handleOnMouseDownLarge = (index) => {
    if (isMobile) {
      item[index].classList.add("newStyle");
    }
  };
  const handleOnMouseUpLarge = (index) => {
    if (isMobile) {
      item[index].classList.remove("newStyle");
    }
  };

  const handleOnMouseDown = (e, index) => {
    e.stopPropagation();
    btnExchange[index].classList.add("newStyle");
  };
  const handleOnMouseUp = (e, index) => {
    e.stopPropagation();
    btnExchange[index].classList.remove("newStyle");
  };

  const handleExchange = (e, index) => {
    e.stopPropagation();
    toast.warning("You don't connect wallet!");

    // setActive(index);

    // const prevIndex = active;
    // if (index === prevIndex) {
    //   item[index].classList.toggle("itemInMobile");
    // } else {
    //   item[index].classList.add("itemInMobile");
    //   prevIndex >= 0 && item[prevIndex].classList.remove("itemInMobile");
    // }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
      }}
    >
      <GlobalStyled />
      <AlertMsg />
      <Navbar
        account={account}
        networkId={networkId}
        openModalHandler={openModalHandler}
        myRefCode={myRefCode}
        alert={alert}
      />
      <img
        src={BgPopup}
        alt="Item"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
        }}
      />
      <div className="containerTreasure" id="container">
        <div className="myTreasure">My treasure</div>
        <div className="wrapperItem">
          {LIST.map((item, index) => (
            <div key={index} className="itemAll">
              <div
                key={index}
                className="item"
                onMouseUp={(e) => handleOnMouseUpLarge(index)}
                onMouseDown={(e) => handleOnMouseDownLarge(index)}
                onClick={() => handleClick(index)}
              >
                <div className="elementInItem">
                  {isConnect ? (
                    <a
                      className="buttonExchange"
                      href="https://au.milkywaygalaxy.io/"
                    >
                      Exchange
                    </a>
                  ) : (
                    <div
                      onMouseUp={(e) => handleOnMouseUp(e, index)}
                      onMouseDown={(e) => handleOnMouseDown(e, index)}
                      onClick={(e) => handleExchange(e, index)}
                      className="buttonExchange"
                    >
                      Exchange
                    </div>
                  )}
                  <div className="wrapperImage">
                    <img src={item.img} alt={item.starName} className="image" />
                  </div>
                  <div style={{ maxWidth: "80%" }}>
                    {item.starName.length > 25
                      ? `${item.starName.slice(0, 25)}...`
                      : item.starName}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    color: "yellow",
                    width: "20%",
                  }}
                >
                  <div style={{ marginRight: "1rem" }}>{item.total}</div>
                  <div>{tokenContractor[item.token]}</div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    bottom: "-5px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
