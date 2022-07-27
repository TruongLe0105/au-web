import React, { useContext, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { GradientText, Text } from '../../SwapBoard';
import { CloseIcon, CopyIcon, EtherIcon, OpenLinkIcon } from '../../Icons';
import { AppContext } from '../../../AppContext';
import useClickOutside from '../../../hooks/useClickOutside';

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.1s ease-in;
  ${({ isActive }) =>
    isActive
      ? css`
          opacity: 1;
          z-index: 10001;
          > div {
            opacity: 1;
          }
        `
      : css`
          opacity: 0;
          z-index: -1;
          > div {
            opacity: 0;
          }
        `}
`;

const ModalWrapper = styled.div`
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem 0;
  border-radius: 8px;
  max-width: 468px;
  width: 95%;
  transition: 0.2s ease-in;
  box-shadow: 0px 4px 10px 0px #00000040;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`;

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Line = styled.div`
  background: rgba(122, 110, 170, 0.1);
  height: 1px;
  width: 100%;
  margin: 2rem 0 1rem;
`;

const ModalInner = styled.div`
  padding: 0 1rem;
`;

const AccountBox = styled.div`
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  border-radius: 20px;
`;

const AccountAddress = styled(GradientText)`
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 100;
  mask: linear-gradient(to right, #fff 80%, transparent);
`;

const StyledImg = styled.img`
  width: ${({ width }) => width ?? '100%'};
  height: 'auto';
`;

const CopiedWrapper = styled.div`
  padding: 4px 8px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.05);
  position: absolute;
  right: 0;
  top: -5px;
  opacity: ${({ isShow }) => (isShow ? '1' : '0')};
  transition: 0.2s ease-in-out;
`;

const StyledLink = styled.a`
  text-decoration: none;
  :hover {
    text-decoration: underline;
    text-decoration-color: #000;
  }
`;

const copiedVariants = {
  hide: {
    opacity: 0,
  },
  show: { opacity: 1 },
  exit: {
    opacity: 0,
  },
};

const CautionModal = () => {
  const modalRef = useRef(null);
  //   useClickOutside(modalRef, closeModalHandler);

  //   const onCopyAccount = () => {
  //     navigator.clipboard.writeText(account);
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 2000);
  //   };

  return (
    <Overlay>
      <ModalWrapper ref={modalRef}>
        <ModalHeader>
          <GradientText fontSize="22px" textTransform="capitalize" className="ms-0">
            Your Wallet
          </GradientText>
          <StyledCloseIcon
            width="24px"
            //    onClick={closeModalHandler}
            color="#777777"
          />
        </ModalHeader>
        <Line />
        <ModalInner>
          <div className="mb-2 position-relative">
            <Text fontSize="16px" className="ms-0 ">
              {' '}
              Your address:
            </Text>

            <CopiedWrapper isShow={isCopied}>
              <Text fontSize="14px" className="ms-0">
                Copied!
              </Text>
            </CopiedWrapper>
          </div>

          <AccountBox className="mb-4">
            <AccountAddress fontSize="18px" className="ms-0">
              {account}
            </AccountAddress>
            <CopyIcon
              width="24px"
              style={{ cursor: 'pointer' }}
              //  onClick={onCopyAccount}
              fill="black"
            />
          </AccountBox>

          <div className="mb-3">
            <div className="ms-0 mb-1 d-flex align-items-center justify-content-between ">
              <GradientText fontSize="16px" fontWeight={400} className="ms-0">
                ETH Balance
              </GradientText>
              <div className="d-flex align-items-center">
                <GradientText fontSize="16px" fontWeight={700} className="ms-0">
                  {(+balance.eth).toFixed(4)}
                </GradientText>

                <EtherIcon width="24px" className="ms-1" />
              </div>
            </div>
            <div className="ms-0 d-flex align-items-center justify-content-between">
              <GradientText fontSize="16px" fontWeight={400} className="ms-0">
                SHT Balance
              </GradientText>

              <div className="d-flex align-items-center ">
                <GradientText fontSize="16px" fontWeight={700}>
                  {(+balance.sht).toFixed(6)}
                </GradientText>

                <StyledImg src="/tokens/SHT.svg" width="24px" className="ms-1" />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <StyledLink
              className="d-flex align-items-center "
              href={`https://testnet.bscscan.com/address/${account}`}
              target="_blank"
            >
              <Text fontSize="16px" color="#000" className="ms-0">
                View on BscScan
              </Text>
              <OpenLinkIcon width="18px" fill="" className="ms-1" />
            </StyledLink>
            <StyledLink
              className="d-flex align-items-center "
              href={`https://rinkeby.etherscan.io/address/${account}`}
              target="_blank"
            >
              <Text fontSize="16px" color="#000" className="ms-0">
                View on EthScan
              </Text>
              <OpenLinkIcon width="18px" fill="" className="ms-1" />
            </StyledLink>
          </div>
        </ModalInner>
      </ModalWrapper>
    </Overlay>
  );
};

export default React.memo(CautionModal);
