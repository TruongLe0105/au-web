import React, {
  useContext,
  useCallback,
  useState,
} from "react";
import "./App.css";
import GlobalStyled from "./GlobalStyled";
import { AppContext } from "./AppContext";

import Navbar from "./components/Navbar";

import BgPopup from './assets/image/bg-popup-star.png';

function App() {
  const { account, networkId, myRefCode } = useContext(AppContext);
  const [isShowAcc, setShowAcc] = useState(false);

  const closeModalHandler = useCallback(() => setShowAcc(false), []);
  const openModalHandler = useCallback(() => setShowAcc(true), []);


  const tokenContractor = {
    '0xae13d989dac2f0debff460ac112a837c89baa7cd': 'Wbnb',
    '0x98649fde88981790b574c9A6066004D5170Bf3EF': 'Busd',
    '0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378': 'Eth',
  };

  const LIST = [
    {
      starName: "Star1",
      total: 1,
      token: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      img: 'https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png',
    },
    {
      starName: "Star2",
      total: 1,
      token: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      img: 'https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png',
    },
    {
      starName: "Star3",
      total: 1,
      token: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      img: 'https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png',
    },
    {
      starName: "Star4",
      total: 1,
      token: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      img: 'https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png',
    },
    {
      starName: "Star5",
      total: 1,
      token: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      img: 'https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png',
    },
    {
      starName: "Star6",
      total: 1,
      token: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      img: 'https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png',
    },
    {
      starName: "Star7",
      total: 1,
      token: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      img: 'https:milkywaygalaxy-2.s3.amazonaws.com/milkywaygalaxy-21658742316611-gianghandsome.png',
    },
  ]

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
    }}>
      <GlobalStyled />
      <Navbar
        account={account}
        networkId={networkId}
        openModalHandler={openModalHandler}
        myRefCode={myRefCode}
      />
      <img src={BgPopup} alt='Item' style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
      }} />
      <div className="containerTreasure">
        <div className="heading">My treasure</div>
        <div className="wrapperItem">
          {LIST.map((item, index) => (
            <div key={index}
              className='item'>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '70%',
                maxWidth: '70%'
              }}>
                <div className="buttonExchange">Exchange</div>
                <div
                  className="wrapperImage"
                >
                  <img
                    src={item.img}
                    alt={item.starName}
                    className='image'
                  />
                </div>
                <div style={{ width: '80%' }}>{item.starName}</div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                color: 'yellow',
                width: '20%'
              }}>
                <div style={{ marginRight: '1rem' }}>{item.total}</div>
                <div>{tokenContractor[item.token]}</div>
              </div>
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '2px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                bottom: '-5px'
              }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
