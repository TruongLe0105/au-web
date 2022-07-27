import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { CloseIcon } from "../../Icons";
import { AppContext } from "../../../AppContext";
import { useLocation } from "react-router-dom";

import { isMobile } from "react-device-detect";

import { MainButton, GradientText, OutlineButton } from "../../commonStyle";
import { motion } from "framer-motion";

import {
  levelDescriptionMapping,
  levelBackgroundMapping,
  formatTotalCoin,
} from "../../../config";

import useDAO from "../../../hooks/useDAO";

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.2s ease-in;
  height: 100%;
  ${({ isActive }) =>
    isActive ? "opacity:1;z-index: 10001;" : "opacity:0;z-index:-1;"}
`;

const ModalWrapper = styled.div`
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem 0;
  border-radius: 20px;
  max-width: 468px;
  width: 95%;
  text-align: center;
  overflow: hidden;
`;

const Text = styled.p`
  font-size: ${({ fontSize }) => fontSize ?? "16px"};
  ${({ color }) => color && `color:${color};`}
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight};`}
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: #606060;
  align-items: center;
  padding: 0 2rem;
`;

const Box = styled.div`
  ${({ margin }) => margin && `margin: ${margin};`}
  ${({ padding }) => padding && `padding: ${padding};`}
`;

const ModalInputSearch = styled.input`
  width: 100%;
  // border: 1px solid #e6e6e6;
  border: none;
  padding: 1rem;

  border-bottom: 1px solid #aaa;
  padding-bottom: 2px;
  outline: none;
  margin-left: 20px;
  &::placeholder {
    color: #cacaca;
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledNFTImg = styled.img`
  width: ${({ width }) => width ?? "auto"};
  height: auto;
  max-height: 350px;
`;

const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: ".";
    width: 1.5em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
  }
`;

const NFTImage = styled(StyledNFTImg)`
  @media screen and (max-width: 768px) {
    width: 60%;
  }
`;

const IMAGE_ADDRESS = `https://img1.10bestmedia.com/Images/Photos/380406/Crown-Point-Vineyards_54_990x660.jpg`;

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

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Modal = ({
  isActive,
  handleClose,
  title,
  imageUrl = IMAGE_ADDRESS,
  price = 1000,
  onBuy,
  index,
  level,
  isApproved = false,
  onApprove,
}) => {
  let query = useQuery();

  const {
    myRefCode,
    balance,
    networkId,
    switchNetworkHandler,
    account,
    handleConnect,
  } = useContext(AppContext);

  const [isLoading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const { verifyRefCode } = useDAO();

  const [step, setStep] = useState(0);

  const [err, setErr] = useState(null);

  const [refCode, setRefCode] = useState("");

  React.useEffect(() => {
    const refCode = query.get("ref");
    if (refCode && refCode !== myRefCode) {
      setRefCode(refCode);
    } else {
      setRefCode("");
    }
  }, [query, myRefCode]);

  const onClickBuy = async () => {
    if (price > balance) {
      setErr("You have not enough BUSD");
      return;
    }
    if (refCode) {
      const isRightCode = await verifyRefCode(refCode);
      console.log(isRightCode);
      if (!isRightCode || refCode == myRefCode) {
        setErr("Wrong Referral Code");
        return;
      } else {
        setErr("");
      }
      setLoading(true);
      const isSuccess = await onBuy({ index, level, price, refCode });
      setLoading(false);
      if (isSuccess) {
        handleClose();
      }
    } else {
      setStep(1);
    }
  };

  const handleInput = (e) => {
    if (err) {
      setErr(null);
    }

    const value = e.target.value;

    if (value.includes("ref=")) {
      setRefCode(value.split("ref=")[1]);
    } else {
      setRefCode(value);
    }
  };

  const onContinue = async () => {
    setLoading(true);
    await onBuy({ index, price, refCode, level });

    handleClose();
    setLoading(false);
  };

  const onClose = () => {
    if (!isLoading) {
      handleClose();
    }
  };

  const renderButton = () => {
    if (isMobile && !window.ethereum) {
      return (
        <a
          style={{
            textDecoration: "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          href={process.env.REACT_APP_METAMASK_DOMAIN}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MainButton style={{ width: "80%" }}>Metamask</MainButton>
        </a>
      );
    }

    if (process.env.REACT_APP_CHAIN_ID != networkId) {
      return renderSwitchButton();
    }

    if (!account) {
      return renderConnectButton();
    }

    return isApproved ? (
      <MainButton
        disabled={err || isLoading || balance < price}
        onClick={onClickBuy}
        style={{ width: "80%" }}
      >
        {balance < price ? "Insufficient BUSD" : "Buy"}
        {isLoading && <Dots />}
      </MainButton>
    ) : (
      <OutlineButton
        disabled={err || isLoading}
        onClick={onApprove}
        style={{ width: "80%" }}
      >
        {"Approve for trade"}
        {isLoading && <Dots />}
      </OutlineButton>
    );
  };

  const renderSwitchButton = () => {
    return (
      <MainButton
        style={{ width: "80%" }}
        disabled={isLoading}
        onClick={switchNetworkHandler}
      >
        Switch network
      </MainButton>
    );
  };

  const renderConnectButton = () => {
    return (
      <MainButton
        style={{ width: "80%" }}
        disabled={isLoading}
        onClick={handleConnect}
      >
        Connect Wallet
      </MainButton>
    );
  };

  const renderBottomOne = () => (
    <>
      <motion.main
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="my-2 position-relative"
      >
        {isApproved ? (
          <>
            <Box
              className="d-flex align-items-end justify-content-between mt-2"
              padding="0 2rem"
            >
              <Text fontWeight={700}>Price NFT:</Text>
              <Text
                fontWeight={700}
                fontSize="20px"
                color="#ED1C51"
              >{`${formatTotalCoin(price)} BUSD`}</Text>
            </Box>
            <Box
              className="d-flex align-items-end justify-content-between my-2"
              padding="0 2rem"
            >
              <Text fontWeight={500} fontSize="16px">
                Your Balance:
              </Text>
              <Text fontWeight={700}>{`${formatTotalCoin(balance)} BUSD`}</Text>
            </Box>

            <Box className="d-flex align-items-end" padding="0 2rem">
              <Text className="mr-5" fontWeight={700}>
                RefCode:
              </Text>
              <ModalInputSearch
                placeholder="Eg: 0xac4bMD"
                onChange={handleInput}
                value={refCode}
              />
            </Box>

            <Text
              className="mb-4 mt-2"
              padding="0 2rem"
              fontSize="20px"
              style={{ textAlign: "start", padding: "0 2rem" }}
              color="red"
            >
              {err}
            </Text>
          </>
        ) : (
          <>
            <Text
              className="mb-4 mt-2"
              padding="0 2rem"
              fontSize="24px"
              fontWeight={600}
              style={{
                textAlign: "center",
                padding: "0 2rem",
                lineHeight: 1.2,
              }}
              color="#ED1C51"
            >
              You need to approve before you can buy NFT
            </Text>
          </>
        )}

        <div className="d-flex justify-content-center mt-3 ">
          {renderButton()}
        </div>
      </motion.main>
    </>
  );

  const renderBottomTwo = () => (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="my-3 position-relative"
    >
      <div className="mt-4 px-3">
        <GradientText fontSize="20px" className="text-center">
          You have no referral Code
        </GradientText>
        <Text className="mt-2" fontSize="24px">
          Do you want to continue?
        </Text>
        <div className="d-flex justify-content-center mt-4">
          <OutlineButton
            disabled={isLoading}
            onClick={() => setStep(0)}
            style={{ width: "50%", marginRight: 10 }}
          >
            Back
          </OutlineButton>
          <MainButton
            onClick={onContinue}
            disabled={isLoading}
            style={{ width: "50%" }}
          >
            Continue {isLoading && <Dots />}
          </MainButton>
        </div>
      </div>
    </motion.main>
  );

  return (
    <Overlay isActive={isActive}>
      <ModalWrapper ref={modalRef}>
        <ModalHeader className="mb-3">
          <Text fontSize="16px" fontWeight={500}>
            {title}
          </Text>
          <StyledCloseIcon
            disabled={isLoading}
            width="26px"
            onClick={onClose}
          />
        </ModalHeader>
        <NFTImage
          src={imageUrl}
          style={{
            background: levelBackgroundMapping(level),
            borderRadius: 10,
          }}
        />

        <div
          style={{ display: "flex", marginTop: 10, justifyContent: "center" }}
        >
          <Text
            fontSize="16px"
            style={{
              width: "80%",
              color: "#rgb(72 70 70)",
              lineHeight: 1.4,
              marginBottom: 8,
              fontSize: 14,
            }}
          >
            {levelDescriptionMapping(level)}
          </Text>
        </div>
        <div style={{ minHeight: 150 }}>
          {step === 0 ? renderBottomOne() : renderBottomTwo()}
        </div>
      </ModalWrapper>
    </Overlay>
  );
};

export default React.memo(Modal);
