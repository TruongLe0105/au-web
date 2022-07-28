import React from 'react';
import styled from 'styled-components';
import LockList from './LockList';
import { ChevronDown, EtherIcon, SwapIcon, BSCIcon, ArrowLeft, RefreshIcon, BurgerIcon } from './Icons';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const errorVariants = {
  show: {
    opacity: 1,
    // y: 0,
    // transition: {
    //   type:'spring',
    //   duration:0.2,
    // }
  },
  hide: {
    opacity: 0,
    // y: 30,
  },
};

const SwapBoard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px 0px #00000040;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  /* @media screen and (min-width:768px) {
    max-width:600px;
  } */
  /* margin: 0 auto; */
  padding: 2rem 1rem 1rem;
`;

const BoardWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  position: relative;
`;

export const Text = styled.p`
  margin-left: 8px;
  color: ${({ color }) => color ?? '#000'};
  font-weight: ${({ fontWeight }) => fontWeight ?? '700'};
  font-size: ${({ fontSize }) => fontSize ?? '34px'};
  ${({ textTransform }) => textTransform && `text-transform:${textTransform};`}
  ${({ fontFamily }) => fontFamily === 'Playfair' && 'font-family: Playfair Display SC;'}
  line-height: ${({ lineHeight }) => lineHeight ?? 1};
  text-align: ${({ textAlign }) => textAlign ?? 'start'};
  ${({ mb }) => mb && `margin-bottom: ${mb};`}
  ${({ truncate }) =>
    truncate &&
    `
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    width:150px;
    `}
    ${({ linear }) =>
    linear &&
    `
    background: linear-gradient(214.02deg, #D71479 6.04%, #F87421 92.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
    `}
`;

const StyledImg = styled.img`
  width: ${({ width }) => width ?? '100%'};
  height: auto;
`;

export const StyledButton = styled.button`
  --main-color: linear-gradient(214.02deg, #d71479 6.04%, #f87421 92.95%);
  text-decoration: none;
  outline: none;
  border: none;

  background: var(--main-color);
  color: #fff;
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
  font-size: ${({ fontSize }) => fontSize ?? '16px'};
  &.success {
    background: var(--main-color);
    border-radius: 10px;
  }
  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:hover {
    filter: brightness(1.1);
  }

  @media (max-width: 768px) {
    padding: 0.5rem
  }
`;

export const OutlineButton = styled(StyledButton)`
  border-radius: 30px;
  background: rgb(247, 248, 250);
  position: relative;
  color: #ed1c51;
  :hover {
    color: #fff;
  }
  :before {
    border-radius: 30px;
    position: absolute;
    content: '';
    background: linear-gradient(-90deg, rgb(136, 3, 47), rgb(238, 21, 66));
    top: -2px;
    left: -2px;
    bottom: -2px;
    right: -2px;
    position: absolute;
    z-index: -1;
  }
  animation: shaking 1s linear;

  @keyframes shaking {
    0% {
        transform: rotate(0deg);
    }

    10% {
        transform: rotate(-5deg);
    }

    20% {
        transform: rotate(5deg);
    }

    30% {
        transform: rotate(-5deg);
    }

    40% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(5deg);
    }

    60% {
        transform: rotate(0deg);
    }

    70% {
        transform: rotate(-5deg);
    }

    80% {
        transform: rotate(5deg);
    }

    90% {
        transform: rotate(-5deg);
    }

    100% {
        transform: rotate(0deg);
    }
  }
`;

const InputTokenWrapper = styled.div`
  text-align: left;
  padding: 0.75rem;
  border: 1px solid rgba(196, 196, 196, 0.5);
`;

export const Flex = styled.div`
  display: flex;
  ${({ alignItems }) => alignItems && `align-items:${alignItems};`}
  ${({ justifyContent }) => justifyContent && `justify-content:${justifyContent};`}
  ${({ flexWrap }) => flexWrap && `flex-wrap:${flexWrap};`}
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  color: #b1b1b1;
  font-size: 18px;
  padding-right: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  :read-only {
    cursor: not-allowed;
  }
  &::placeholder {
    color: #e6e6e6;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const StyledInputLabel = styled.p`
  font-weight: 400;
`;

const SelectTokenBox = styled(StyledButton)`
  padding: 0.5rem;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  color: #000;
  background: transparent;
  border: 1px solid #000;

  ${({ disabled }) =>
    disabled
      ? `opacity:0.4;`
      : `:hover {
    opacity: 0.7;
    color: #000;
  }`}
  ${({ hide }) => hide && `display:none;`}
`;

const SwapLine = styled(Flex)`
  position: relative;
  :before {
    position: absolute;
    content: '';
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background: #1c1924;
  }
`;

const LineWrapper = styled.div`
  padding: 1rem;
`;

const TransactionBoardWrapper = styled.div`
  border-radius: 10px;
  border: 1px solid #e7eaf3;
  width: 100%;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const SpinnerWrapper = styled.div`
  margin: auto;
`;

const SpinnerLoader = styled.div`
  width: 2rem;
  height: 2rem;
`;

const ArrowRight = styled(ArrowLeft)`
  transform: rotate(180deg);
`;

const PaginateButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0 8px;
  :disabled {
    svg {
      stroke: #808080;
    }
  }
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

export const GradientText = styled(Text)`
  background: -webkit-linear-gradient(214.02deg, #d71479 6.04%, #f87421 92.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FloatMenuButton = styled(BurgerIcon)`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const StyledF5Icon = styled(RefreshIcon)`
  cursor: pointer;
  fill: #606060;
  transition: 0.1s ease-in;
  :active {
    transform: rotate(90deg);
  }
`;

const RenderApproveButton = (account, handleApprove, tokenSwap, networkId, modalLoading, balanceSwap) => {
  return (
    <ApproveButton
      disabled={!account || !tokenSwap || networkId !== 1 || modalLoading || balanceSwap <= 0}
      onClick={handleApprove}
    >
      Approve
    </ApproveButton>
  );
};

const RenderSwapButton = (account, isSwapable, handleSwap, amount, tokenAddress, modalLoading, balanceSwap) => {
  return (
    <StyledButton
      disabled={!isSwapable || modalLoading || !account}
      onClick={() => handleSwap(amount, account, tokenAddress)}
      style={{ width: '100%' }}
    >
      Swap & Lock
    </StyledButton>
  );
};

const TokenSwap = ({
  account,
  onAmountChangeHandler,
  networkId,
  tokenSwap,
  handleApprove,
  tokenReceive,
  onSwapModalOpen,
  onReceiveModalOpen,
  handleSwap,
  setMaxAmount,
  state,
  txList,
  getList,
  boardLoading,
  refreshTokenBalanceHandler,
  balance,
}) => {
  const { balanceSwap, amount, isSwapable, isApprove, modalLoading, feeTx, feeSwap } = state;

  const [[page, maxPage, direction], setPage] = React.useState([1, 1, 0]);

  React.useEffect(() => {
    if (txList) {
      const totalPage = Math.ceil(txList.eth.total / 5) || 1;
      setPage([page, totalPage, direction]);
    }
  }, [direction, page, txList]);

  const onPageChangeHandler = (newPage) => {
    getList(newPage);
    setPage([newPage, maxPage, newPage < page ? 1 : -1]);
  };

  return (
    <>
      <BoardWrapper>
        <Text
          color="#000"
          fontFamily="Playfair"
          fontWeight="900"
          fontSize="34px"
          textTransform="uppercase"
          textAlign="center"
          lineHeight="40px"
          mb="12px"
          className="ms-0"
        >
          Token Swap{' '}
        </Text>
        <Text color="#808080" textAlign="center" fontSize="20px" fontWeight="400" mb="34px" className="ms-0">
          The best place to swap old token to new token
        </Text>

        <SwapBoard className="mb-5">
          <Flex>
            <Text color="#000" fontSize="22px" style={{ marginBottom: 16 }} className="ms-0 mb-4">
              Swap
            </Text>
          </Flex>
          <InputTokenWrapper>
            <Flex justifyContent="space-between" className="pb-3 align-items-center">
              <Flex alignItems="center">
                <StyledInputLabel className="d-none d-sm-block me-2">From </StyledInputLabel>
                <EtherIcon width="24px" className="" />
                <StyledInputLabel className="ms-2">Ethereum Network</StyledInputLabel>
              </Flex>

              <StyledInputLabel onClick={tokenSwap ? setMaxAmount : undefined}>
                Balance: {balanceSwap.toString().length > 7 ? balanceSwap.toFixed(6) : balanceSwap}
              </StyledInputLabel>
            </Flex>
            <Flex className="mb-2">
              <StyledInput
                type="number"
                className="col-6"
                placeholder="0.00"
                onChange={onAmountChangeHandler}
                value={amount}
                step="1"
                readOnly={networkId !== 1 || !tokenSwap || !isApprove}
              />
              <StyledButton className="col-2 p-0" disabled={!tokenSwap} onClick={setMaxAmount}>
                Max
              </StyledButton>
              <SelectTokenBox
                className="col-4  "
                onClick={account && networkId === 1 ? onSwapModalOpen : null}
                disabled={!account || networkId !== 1}
              >
                {!tokenSwap ? (
                  <>Token Swap</>
                ) : (
                  <>
                    <StyledImg src={`/tokens/${tokenSwap.name}.svg`} width="24px" className="me-1" />
                    <span className="w-100 text-truncate">{tokenSwap.name}</span>
                  </>
                )}
                <ChevronDown width="12px" className="ms-1" />
              </SelectTokenBox>
            </Flex>
            <AnimatePresence>
              {amount > balanceSwap && (
                <Text
                  as={motion.p}
                  variants={errorVariants}
                  animate="show"
                  initial="hide"
                  exit="hide"
                  color="red"
                  className="ms-0"
                  fontSize="14px"
                  fontWeight={500}
                >
                  Invalid amount
                </Text>
              )}
            </AnimatePresence>
          </InputTokenWrapper>
          <SwapLine justifyContent="center" className="my-2">
            <SwapIcon width="45px" style={{ zIndex: 1 }} />
          </SwapLine>
          <InputTokenWrapper>
            <Flex alignItems="center" className="pb-3">
              <Flex alignItems="center">
                <StyledInputLabel>To</StyledInputLabel>

                <BSCIcon width="24px" className="mx-2" />
                <StyledInputLabel>BSC Network</StyledInputLabel>
              </Flex>
              {tokenReceive && (
                <div className="ms-auto d-flex">
                  <StyledF5Icon width="16px" className="me-2" onClick={refreshTokenBalanceHandler} />

                  <StyledInputLabel>
                    Balance: {balance?.sht?.length > 7 ? (+balance?.sht).toFixed(6) : balance?.sht}
                  </StyledInputLabel>
                </div>
              )}
            </Flex>

            <Flex>
              <StyledInput
                type="text"
                placeholder="0.00"
                className="col-7"
                readOnly
                value={
                  amount && amount * tokenSwap?.ratio
                  // ? amount * tokenSwap?.ratio <= 10 ** -6
                  //   ? amount * tokenSwap?.ratio.toFixed(8)
                  //   : (amount * tokenSwap?.ratio).toFixed(4)
                  // : 0
                }
              />

              <SelectTokenBox className="col-5" onClick={tokenReceive ? onReceiveModalOpen : null} hide={!tokenReceive}>
                <StyledImg src={`/tokens/${tokenReceive?.name}.svg`} width="24px" className="me-1" />
                {tokenReceive?.name} <ChevronDown width="12px" className="ms-2" />
              </SelectTokenBox>
            </Flex>
          </InputTokenWrapper>{' '}
          {tokenSwap && (
            <div>
              <div className="d-flex justify-content-between mt-2">
                <Text fontWeight={500} fontSize="14px" className="ms-0">
                  Price:
                </Text>
                <GradientText fontWeight={600} fontSize="14px" className="ms-0">
                  {1 / tokenSwap.ratio} {tokenSwap.name} per {tokenReceive.name}
                </GradientText>
              </div>
              {isApprove && (
                <div className="d-flex justify-content-between mt-2 align-items-center">
                  <Text fontWeight={500} fontSize="14px" className="ms-0">
                    Total Fee (estimated) :
                    <br /> Swap Fee + Gas Fee
                  </Text>
                  <GradientText fontWeight={700} fontSize="14px" className="ms-0" textTransform="uppercase">
                    ~{(+feeTx + feeSwap).toFixed(6)} Eth
                  </GradientText>
                </div>
              )}
            </div>
          )}
          <div className="my-4 mx-3">
            {!isApprove
              ? RenderApproveButton(account, handleApprove, tokenSwap, networkId, modalLoading, balanceSwap)
              : RenderSwapButton(
                account,
                isSwapable,
                handleSwap,
                amount,
                tokenSwap?.address,
                modalLoading,
                balanceSwap,
              )}
            {!isApprove && balanceSwap === 0 && tokenSwap && (
              <Text fontWeight={500} fontSize="14px" className="ms-0 mt-2 text-center" color="red">
                Your balance must be greater than 0 for approving
              </Text>
            )}
          </div>
        </SwapBoard>

        <Text
          color="#000"
          fontFamily="Playfair"
          fontWeight="700"
          fontSize="34px"
          textTransform="uppercase"
          textAlign="center"
          lineHeight="40px"
          mb="12px"
          className="ms-0"
        >
          Latest Transactions
        </Text>

        <TransactionBoardWrapper className="">
          {boardLoading && (
            <div className="position-absolute translate-middle top-50 start-50" style={{ zIndex: 10000 }}>
              <SpinnerWrapper>
                <SpinnerLoader className="spinner-border text-secondary" />
              </SpinnerWrapper>
            </div>
          )}

          <LineWrapper>
            <div className="d-flex justify-content-center align-items-center">
              <PaginateButton
                disabled={isNaN(page) || page <= 1 || boardLoading}
                onClick={() => onPageChangeHandler(page - 1)}
              >
                <ArrowLeft width="24px" />
              </PaginateButton>
              <Text fontWeight={500} fontSize="14px" className="ms-0">
                Page {page} of {maxPage || 0}
              </Text>

              <PaginateButton
                disabled={isNaN(page) || page === maxPage || boardLoading}
                onClick={() => onPageChangeHandler(page + 1)}
              >
                <ArrowRight width="24px" />
              </PaginateButton>
            </div>
          </LineWrapper>
        </TransactionBoardWrapper>
      </BoardWrapper>
    </>
  );
};

export default React.memo(TokenSwap);
