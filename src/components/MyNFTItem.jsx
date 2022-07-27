import React from "react";
import styled from "styled-components";

import { IMAGE_BY_LEVEL, levelBackgroundMapping } from "../config";

import { GradientText } from "./commonStyle";

const SwapBoard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px 0px #00000040;
  max-width: 500px;
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
  /* @media screen and (min-width:768px) {
    max-width:600px;
  } */
  /* margin: 0 auto; */
  padding: 2rem 1rem 1rem;
  position: relative;
`;

const BoardWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  position: relative;
  transition: 0.2s ease-out;;
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
    background: linear-gradient(214.02deg, #D71479 6.04%, #F87421 92.95%);
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
  border: 1px solid rgba(196, 196, 196, 0.5);
  border-radius: 0 0 15px 15px;
`;

export const Flex = styled.div`
  display: flex;
  ${({ alignItems }) => alignItems && `align-items:${alignItems};`}
  ${({ justifyContent }) =>
    justifyContent && `justify-content:${justifyContent};`}
  ${({ flexWrap }) => flexWrap && `flex-wrap:${flexWrap};`}
`;

const StyledNFTImg = styled.img`
  width: ${({ width }) => width ?? "100%"};
  height: auto;
  min-height: 200px;
`;

const NFTImage = styled(StyledNFTImg)`
  border-radius: 15px 15px 0 0;
`;


const NFT = ({ id, level, timestamp }) => {
  return (
    <>
      <BoardWrapper>
        <SwapBoard>
          <NFTImage src={IMAGE_BY_LEVEL[level]} style={{background: levelBackgroundMapping(level)}}/>

          <InputTokenWrapper className="mb-2 z-100">
            <Flex justifyContent="space-between" alignItems="end">
              <GradientText fontSize="14px">{`WINERYDAO #${id}`}</GradientText>
              <Text fontSize="18px">{`Tier ${level}`}</Text>
            </Flex>
          </InputTokenWrapper>
        </SwapBoard>
      </BoardWrapper>
    </>
  );
};

export default React.memo(NFT);
