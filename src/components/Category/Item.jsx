import React, { useContext, useState } from "react";
import styled from "styled-components";
import { MainButton, Text } from "../commonStyle";
import { motion } from "framer-motion";

import BuyModal from "../Modal/BuyModal";
import { isMobile } from "react-device-detect";

import { AppContext } from "../../AppContext";
import { Link } from "react-router-dom";

const Card = styled.div`
  width: calc(100% / 2);
  padding: var(--gap);

  @media screen and (min-width: 768px) {
    width: calc(100% / 3);
  }
  @media screen and (min-width: 1024px) {
    width: calc(100% / 5);
  }
`;

const CardWrapper = styled.div`
  background: #ffffff;
  /* border-radius: 8px; */
  box-shadow: 0 20px 20px -10px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
  position: relative;
  transition: 0.2s ease-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.01) translateY(-5px);
  }
`;

const MainCard = styled.div`
  width: 100%;
  position: relative;
`;

const CardImg = styled.img`
  width: ${({ width }) => width ?? "100%"};
  height: auto;
  object-fit: ${({ objectFit }) => objectFit};
  max-height: 150px;
`;

const CardDesc = styled.div`
  padding: 1rem;
`;

const Flex = styled.div`
  display: flex !important;
  align-items: end;
  justify-content: space-between;
  width: 100%;
`;

const BuyButton = styled(MainButton)`
  :hover {
    color: #fff;
  }
  /* :after {
    content: '';
    position: absolute;
    z-index: 101;
    top: 0;
    left: 0;
    right:0;bottom:0;
    /* width: 100%;
    height: 100%; 
  } */
`;

const ApproveButton = styled.button`
  outline: none;
  border: none;
  text-transform: capitalize;
  font-weight: 600;
  padding: 1rem;
  transition: 0.1s ease-out;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 30px;
  width: 100%;
  z-index: 100;
  color: #ed1c51;
  border: 1px solid #ed1c51;
  :hover {
    opacity: 0.6;
  }
  :disabled {
    color: #000;
    border: 1px solid #000;
    opacity: 0.4;
    :hover {
      opacity: 0.4;
    }
    cursor: not-allowed;
  }
`;

const Category = ({
  element,
  index,
  onBuy,
  isLoading,
  isApproved,
  onApprove,
}) => {
  const { networkId, switchNetworkHandler, handleConnect, account } =
    useContext(AppContext);

  const [isOpenModal, setOpenModal] = useState(false);

  const renderButton = () => {
    if (isMobile) {
      return (
        <a
          style={{ textDecoration: "none" }}
          href={process.env.REACT_APP_METAMASK_DOMAIN}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MainButton
            style={{ width: "100%" }}
            // as={Link}
            // to={process.env.REACT_APP_METAMASK_DOMAIN}
          >
            Metamask
          </MainButton>
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
      <BuyButton onClick={toggleModal} style={{ width: "100%" }}>
        Buy
      </BuyButton>
    ) : (
      <ApproveButton disabled={isLoading} onClick={onApprove}>
        Approve
      </ApproveButton>
    );
  };

  const renderSwitchButton = () => {
    return (
      <MainButton
        style={{ width: "100%" }}
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
        style={{ width: "100%" }}
        disabled={isLoading}
        onClick={handleConnect}
      >
        Switch network
      </MainButton>
    );
  };

  const toggleModal = () => {
    if (!isOpenModal) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setOpenModal(!isOpenModal);
  };

  return (
    <>
      <Card as={motion.div} layout key={index}>
        <CardWrapper>
          <MainCard>
            <CardImg src={element.image} objectFit="contain" />
            <CardDesc>
              <Flex className="mb-3">
                <Text
                  style={{ display: "inline-block" }}
                  fontSize="24px"
                  textTransform="uppercase"
                >
                  {`#${element.imageId + 1}`}
                </Text>
                <Text
                  style={{ display: "inline-block" }}
                  color="rgb(238,21,66)"
                  fontSize="16px"
                  textTransform="uppercase"
                >
                  {`Level ${element.level}`}
                </Text>
              </Flex>
              {renderButton()}
              {/* <MainButton className="w-100 m-auto mt-4">BUY</MainButton> */}
            </CardDesc>
          </MainCard>
        </CardWrapper>
      </Card>
      <BuyModal
        title="Buy NFT"
        isActive={isOpenModal}
        info={element}
        imageUrl={element.image}
        price={+element?.price}
        handleClose={toggleModal}
        index={index}
        level={+element?.level}
        onBuy={onBuy}
      />
    </>
  );
};

export default Category;
