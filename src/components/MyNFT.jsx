import React, {
  useEffect,
  useReducer,
  useContext,
  useState,
  useCallback,
} from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { isMobile } from "react-device-detect";

import { Link } from "react-router-dom";

import styled from "styled-components";
import { AppContext } from "../AppContext";
import { motion } from "framer-motion";

import ScreenBlocking from "./ScreenBlocking";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

import { OutlineButton, Text, MainButton } from "./commonStyle";

import { Flex } from "./SwapBoard";

import useDAO from "../hooks/useDAO";

import NFTDetail from "./NFTDetail";

import { formatTotalCoin, hiddenAddress, getTime } from "../config";
import Transaction from "./Transaction";

import RefTransaction from "./RefTransaction";

const MainWrapper = styled.div`
  min-height: 400px;
  flex-wrap: wrap;
  column-gap: 5%;
`;

const ChildItem = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 15px;
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

const ResponsiveFlex = styled(Flex)`
  flex: 1;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ResponsiveFlexRight = styled(ResponsiveFlex)`
  padding-left: 20px;
  border-left: 2px solid;

  @media (max-width: 768px) {
    border-left: 0;
    border-top: 2px solid;
    margin-top: 10px;
    padding-left: 0px;
  }
`;

const MyNFT = ({}) => {
  const { web3, account, myRefCode } = useContext(AppContext);

  const [isLoading, setLoading] = useState(false);

  const [listNFT, setNFT] = useState([]);

  const [totalCommission, setTotalCommission] = useState(0);

  const [totalWithdraw, setTotalWithdraw] = useState(0);

  const [historyWithdraw, setHistoryWithdraw] = useState([]);
  const [refTrans, setRefTrans] = useState([]);

  const {
    getListMyNFT,
    getTransactionOfUser,
    getDetailNft,
    getTotalAmount,
    getTransaction,
    getTotalWithdraw,
    withdraw,
    checkPending,
    getTransactionOfRef,
    signMessage,
  } = useDAO();

  const [trans, setTransaction] = useState({});
  const [detailNft, setDetailNft] = useState({});

  const [isPending, setPending] = useState(false);

  const [isNotEnough, setIsNotEnough] = useState(false);

  useEffect(() => {
    if (!web3) {
      return;
    }
    if (myRefCode) {
      loadMyNFT();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, myRefCode]);

  const loadMyNFT = async () => {
    setLoading(true);
    const data = await getListMyNFT(account, web3);

    if (data.length) {
      const imageUrl = await getDetailNft(data[0].tokenId);
      setDetailNft(imageUrl);
    }

    await loadMeta();

    setNFT(data);
    setLoading(false);
  };

  const loadMeta = async () => {
    const [total, detail, tempWithdraw, history, pending, listRef] =
      await Promise.all([
        getTotalAmount(account),
        getTransactionOfUser(account),
        getTotalWithdraw(account),
        getTransaction(account),
        checkPending(account),
        getTransactionOfRef(myRefCode),
      ]);

    setRefTrans(listRef.data);

    setPending(pending);

    setHistoryWithdraw(history.data);

    const { total: dataWithdraw, length } = tempWithdraw;

    const notEnough = total.data - (dataWithdraw + length * 0.5) > 0.5;

    setIsNotEnough(!notEnough);

    setTotalWithdraw(dataWithdraw);
    setTotalCommission(total.data);

    setTransaction(detail);
  };

  const renderNoData = () => (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <Text> {isLoading ? "Loading..." : "You have no NFT"}</Text>
        <OutlineButton as={Link} to="/market" className="mt-3">
          Go to Market now !!!
        </OutlineButton>
      </div>
    </>
  );

  const onWithdraw = async () => {
    setLoading(true);

    const messageHash = await signMessage(account);

    let isSuccess = false;
    if (messageHash) {
      isSuccess = await withdraw(web3, account, messageHash);
      console.log("messageHash:", messageHash);
    }

    // const isSuccess = await withdraw(account);

    if (isSuccess) {
      withReactContent(Swal).fire({
        imageUrl: "/mouse.svg",
        imageWidth: "auto",
        imageHeight: "auto",
        imageAlt: "Custom image",

        title: (
          <span style={{ color: "rgba(30, 147, 255, 1)" }}>
            Congratulations!
          </span>
        ),
        textColor: "green",
        html: (
          <span style={{ color: "rgb(128, 128, 128)", fontWeight: 400 }}>
            You have successfully Withdraw, check your wallet{" "}
          </span>
        ),
        focusConfirm: false,
        confirmButtonText: "Continue",
        backdrop: `#e7edf599`,
      });
      await loadMeta();
    } else {
      withReactContent(Swal).fire({
        imageUrl: "/error-face.png",
        imageWidth: "auto",
        imageHeight: "auto",
        imageAlt: "Custom image",

        title: <span style={{ color: "#ED1C51" }}> Something wrong...</span>,
        textColor: "green",
        html: (
          <span style={{ color: "rgb(128, 128, 128)", fontWeight: 400 }}>
            Something went wrong. Please try again!!!
          </span>
        ),
        focusConfirm: false,
        confirmButtonText: "Continue",

        backdrop: `#e7edf599`,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <motion.main
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="my-3 position-relative"
      >
        <ResponsiveFlex
          className={`${!isMobile ? "container" : ""} mb-1 p-3 `}
          style={{ border: "2px solid red", marginTop: 150, borderRadius: 10 }}
        >
          <ResponsiveFlex style={{ flex: 1 }}>
            <ChildItem className="d-flex flex-column align-items-center">
              <Text fontSize="18px" style={{ margin: 0 }}>
                Total Commission
              </Text>
              <Text
                color="black"
                className="mt-2"
                fontWeight={600}
                fontSize="45px"
                style={{ margin: 0 }}
              >
                {formatTotalCoin(totalCommission)}
              </Text>
            </ChildItem>
            <ChildItem className="d-flex flex-column align-items-center">
              <Text fontSize="18px" style={{ margin: 0 }}>
                Total Withdrawed
              </Text>
              <Text
                color="black"
                className="mt-2"
                fontWeight={600}
                fontSize="45px"
                style={{ margin: 0 }}
              >
                {formatTotalCoin(totalWithdraw)}
              </Text>
            </ChildItem>
            <ChildItem className="d-flex flex-column align-items-center">
              <Text fontSize="18px" style={{ margin: 0 }}>
                Available
              </Text>
              <Text
                color="rgb(238,21,66)"
                className="mt-2"
                fontWeight={600}
                fontSize="45px"
                style={{ margin: 0 }}
              >
                {formatTotalCoin(totalCommission - totalWithdraw)}
              </Text>
            </ChildItem>
          </ResponsiveFlex>
          <ResponsiveFlexRight style={{ flex: 1 }}>
            <ChildItem className="d-flex flex-column align-items-center">
              <Text fontSize="18px" style={{ margin: 0 }}>
                Latest Transaction
              </Text>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={`${process.env.REACT_APP_LINK_BSC}/tx/${historyWithdraw[0]?.txHash}`}
                className="text-address"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  textDecoration: "none",
                }}
              >
                <Text
                  color="rgb(238,21,66)"
                  className="mt-2"
                  fontWeight={600}
                  fontSize="23px"
                  style={{ margin: 0 }}
                >
                  {historyWithdraw.length
                    ? hiddenAddress(historyWithdraw[0]?.txHash)
                    : "--"}
                </Text>
              </a>

              <Text
                color="#aaa"
                className="mt-2"
                fontWeight={600}
                fontSize="23px"
                style={{ margin: 0 }}
              >
                {historyWithdraw.length
                  ? getTime(new Date(historyWithdraw[0]?.updatedAt))
                  : "--"}
              </Text>
            </ChildItem>
            <ChildItem className="d-flex flex-column align-items-center">
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={`${process.env.REACT_APP_LINK_DASHBOARD}`}
                className="text-address"
                style={{ width: "100%", height: "100%", borderRadius: 10, textDecoration: 'none' }}
              >
                <MainButton
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                >
                  Dashboard
                </MainButton>
              </a>
            </ChildItem>
          </ResponsiveFlexRight>
        </ResponsiveFlex>
        <Flex className="flex-column" style={{ marginBottom: 100 }}>
          {!listNFT.length ? (
            renderNoData()
          ) : (
            <MainWrapper className="container d-flex justify-content-center position-relative mt-5 mb-5">
              <NFTDetail
                tokenId={listNFT[0].tokenId}
                level={listNFT[0].level}
                txHash={trans.txHash}
                detailNft={detailNft}
              />
            </MainWrapper>
          )}
        </Flex>
        {/* <Transaction data={historyWithdraw} />
        <RefTransaction data={refTrans} /> */}
      </motion.main>
      <ScreenBlocking isLoading={isLoading} />
    </>
  );
};

export default MyNFT;
