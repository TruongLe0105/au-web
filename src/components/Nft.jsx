import React from "react";
import styled from "styled-components";

import { IMAGE_BY_LEVEL, levelNameMapping, levelBackgroundMapping } from "../config";

export const formatTotalCoin = (num) => {
  let dollarUSLocale = Intl.NumberFormat("en-US");

  return dollarUSLocale.format(num);
};

const SwapBoard = styled.div`
  background: transparent;
  /* border-radius: 8px; */
  box-shadow: 0px 4px 10px 0px #00000040;
  max-width: 500px;
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
  border-radius: 10px;
  /* padding: 2rem 1rem 1rem; */
  position: relative;
`;

const BoardWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  cursor: pointer;
  transition: 0.2s ease-out;
  position: relative;
  &:hover {
    transform: scale(1.02);
  }
`;

export const Text = styled.p`
  margin-left: 8px;
  color: ${({ color }) => color ?? "#000"};
  font-weight: ${({ fontWeight }) => fontWeight ?? "700"};
  font-size: ${({ fontSize }) => fontSize ?? "34px"};
  ${({ textTransform }) => textTransform && `text-transform:${textTransform};`}
  ${({ fontFamily }) =>
    fontFamily === "Playfair" && "font-family: Playfair Display SC;"}
  line-height: ${({ lineHeight }) => lineHeight ?? 1};
  text-align: ${({ textAlign }) => textAlign ?? "start"};
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
    background: linear-gradient(-90deg, rgb(136, 3, 47), rgb(238, 21, 66));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
    `}
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
  font-size: ${({ fontSize }) => fontSize ?? "16px"};
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
    content: "";
    background: linear-gradient(214.02deg, #d71479 6.04%, #f87421 92.95%);
    top: -2px;
    left: -2px;
    bottom: -2px;
    right: -2px;
    position: absolute;
    z-index: -1;
  }
`;

const InputTokenWrapper = styled.div`
  text-align: left;
  padding: 0.75rem;
  /* border: 1px solid rgba(196, 196, 196, 0.5); */
`;

export const Flex = styled.div`
  display: flex;
  ${({ alignItems }) => alignItems && `align-items:${alignItems};`}
  ${({ justifyContent }) =>
    justifyContent && `justify-content:${justifyContent};`}
  ${({ flexWrap }) => flexWrap && `flex-wrap:${flexWrap};`}
`;

export const GradientText = styled(Text)`
  background: -webkit-linear-gradient(214.02deg, #d71479 6.04%, #f87421 92.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledNFTImg = styled.img`
  width: ${({ width }) => width ?? "100%"};
  /* height: ${({ height }) => height ?? "100%"}; */
  /* min-height: 200px; */
  border-radius: 5px 5px 0 0;
`;

const NFTImage = styled(StyledNFTImg)`
  /* border-radius: 15px 15px 0 0; */
  max-height: 200px;
`;


const NFT = ({
  item,
  tokenContractor,
}) => {

  return (
    <BoardWrapper
    >
      <SwapBoard
        className="pb-4"
      >
        <NFTImage
         src={item.img} 
         />
        <InputTokenWrapper className="z-100 mx-3 mt-2">
          <Flex
            justifyContent="space-between"
            alignItems="end"
            className="mb-3"
          >
            <Text
              fontSize="20px"
              className="ms-0"
              fontWeight="900"
              color="rgb(238,21,66)"
            >
              {item.starName}
            </Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="end"
            className="ms-0 mt-3"
          >
            <div className="d-flex flex-column align-items-start mt-3">
              <Text
                fontSize="14px"
                color="white"
                fontWeight={500}
                style={{ marginLeft: 0, marginBottom: 5 }}
              >
                Fixed price
              </Text>
              <Text
                fontSize="20px"
                className="ms-0"
                fontWeight="900"
                // color="#fff"
                color="black"
              >
                {item.total}
              </Text>
            </div>

            <Text
              color="#000"
              fontSize="14px"
              fontWeight={500}
              className="ms-0"
              style={{
                color: "white",
                padding: "5px 10px",
                background: "gray",
                borderRadius: 5,
              }}
            >
              {tokenContractor[item.token]}
            </Text>
          </Flex>
        </InputTokenWrapper>
      </SwapBoard>
    </BoardWrapper>
  );
};

export default React.memo(NFT);
