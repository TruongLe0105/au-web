import React, {
  useEffect,
  useContext,
  useState,
} from "react";
import NFT from "./Nft";


import styled from "styled-components";
import useWeb3 from "../hooks/useWeb3";
import { AppContext } from "../AppContext";
import BgPopup from '../assets/image/bg-popup-star.png';


import { motion } from "framer-motion";

import { BUSD_TOKEN_ADDRESS } from "../config";

import ScreenBlocking from "./ScreenBlocking";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import axios from "axios";

const MainWrapper = styled.div`
  // min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* div:first-child {
    margin: -1rem; 
    flex-wrap: wrap;
  }
  column-gap: 30px; */
`;

const ChildItem = styled.div`
  width: calc(100% -20);
  padding: 0 0.5rem;
  /* margin: 5px 0; */

  @media (min-width: 768px) {
    width: 100%;
  }
  @media (min-width: 1024px) {
    width: calc(100% / 3.5);
  }
`;

export const BackToHome = styled.div`
  padding: 8px 10px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.02);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: inline-block;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
  transition: 0.15s ease-out;
  svg {
    stroke: #3a3a3a;
    transition: 0.15s ease-out;
  }
  :hover {
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
    svg {
      stroke: #333;
    }
  }
`;

export const IconWrapper = styled.div`
  p {
    transition: 0.15s ease-in-out;
    /* opacity: 0; */
  }
  :hover {
    p {
      /* opacity: 1; */
    }
  }
  max-width: 100px;
`;

const variants = {
  hidden: {
    x: "20%",
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    x: "0",
    opacity: 1,
  },
};

const Market = ({ account }) => {
  const {
    web3,
    isLoading: isMainLoading,
  } = useContext(AppContext);

  const {checkApprove } = useWeb3(account);


  const [isApproved, setApproved] = useState(false);

  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    loadAllowance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);


  const loadAllowance = async () => {
    const isApproved = await checkApprove(web3, BUSD_TOKEN_ADDRESS, 18);

    if (isApproved) {
      setApproved(true);
    } else {
      setApproved(false);
    }
  };



  return (
    // <div style={{
    //   // backgroundImage: `url(${BgPopup})`,
    //   height: '100%'
    // }}>
    //   <motion.main
    //     variants={variants}
    //     initial="hidden"
    //     animate="visible"
    //     exit="hidden"
    //     className="my-3 position-relative"
    //   >

    //     <MainWrapper className="container" style={{ marginBottom: 150 }}>
    //       <div
    //         className=" d-flex mb-4"
    //         style={{ marginTop: 10, columnGap: 50 }}
    //       >
    //         {LIST.map((item, index) => {
    //           return (
    //             <ChildItem key={item?.level + index} onClick={() => {}}>
    //               <NFT
    //               item={item}
    //               tokenContractor={tokenContractor}
    //               />
    //             </ChildItem>
    //           );
    //         })}
    //       </div>
    //     </MainWrapper>
    //   </motion.main>
    //   <ScreenBlocking isLoading={isLoading || isMainLoading} />
    // </div>
    <div style={{
      backgroundImage: `url(${BgPopup})`,
      display:'flex',
      flexDirection:'column',
      alignItems:"center",
      fontSize:'2rem'
    }}>
      {LIST.map((item, index) => (
          <div key={index} style={{
            width:'40%',
              display: 'flex',
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'space-between'
            }}>
            <div style={{
              display: 'flex',
              flexDirection:'row',
            }}>
              <div style={{
                  width: '20px',
                  height: '20px',
                }}>
                  <img src={item.img} alt={item.starName} style={{width:'100%', height:'100%'}} />
                </div>
                <div>{item.starName}</div>
            </div>
            <div style={{
              display:'flex',
              flexDirection:'row',
              color:'yellow'
            }}>
              <div>{item.total}</div>
              <div>{tokenContractor[item.token]}</div>
            </div>
          </div>
      ))}
    </div>
  );
};

export default Market;
