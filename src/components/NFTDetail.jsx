import React from "react";

import styled from "styled-components";

import {
  levelBackgroundMapping,
  IMAGE_BY_LEVEL,
  levelNameMapping,
  levelDescriptionMapping,
  formatId,
} from "../config";

export const Flex = styled.div`
  display: flex;
  ${({ alignItems }) => alignItems && `align-items:${alignItems};`}
  ${({ justifyContent }) =>
    justifyContent && `justify-content:${justifyContent};`}
  ${({ flexWrap }) => flexWrap && `flex-wrap:${flexWrap};`}
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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`;

export const ContainerPrincipal = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
`;

export const ContainerInner = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
`;

export const RowResponsive = styled(Row)`
  flex-wrap: wrap;
  justify-content: flex-start;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const RowBetween = styled(Row)`
  justify-content: space-between;
  align-items: center;
`;

const FlexOne = styled.div`
  width: 50%;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FlexTwo = styled.div`
  width: 50%;
  margin-bottom: 15px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Image = styled.img`
  width: 90%;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TextHash = styled(Text)`
  cursor: pointer;
  &:hover {
    color: #ed1c51;
  }
`;

const CONTENT = `You are an official member of the Winery Ecosystem where you can earn a lot of benefits and vote for what happens to DAO. The higher level of NFT you have will increase the number of profits you earn.				`;

const NFTDetail = ({ tokenId, level, txHash, detailNft }) => {
  const suffix = detailNft.image?.split("/") || [];

  const id = suffix[suffix?.length - 1]?.split(".")[0];
  return (
    <ContainerPrincipal>
      <ContainerInner>
        <RowResponsive style={{ alignItems: "start" }}>
          <FlexTwo>
            <Image
              src={detailNft?.image ?? IMAGE_BY_LEVEL[level]}
              style={{ background: levelBackgroundMapping(level) }}
            />
          </FlexTwo>

          {/* Right Content */}
          <FlexOne>
            <div style={{ height: "100%" }}>
              <div style={{ display: "flex" }}>
                <Text fontSize="32px" fontWeight={600} mt={2}>
                  {levelNameMapping(level)}
                </Text>
                <Text
                  className="mb-2"
                  fontSize="32px"
                  fontWeight={600}
                  color="#000"
                  // color="#ED1C51"
                >
                  {`#${id}`}
                </Text>
              </div>

              <Text
                fontSize="24px"
                fontWeight="400"
                color="rgb(238,21,66)"
                className=" mb-4"
              >{`Tier ${level}`}</Text>

              <div
                style={{
                  display: "none",
                  //txHash ? "flex" :
                  alignItems: "end",
                  marginTop: 10,
                }}
              >
                <Text fontSize="18px" fontWeight={600} color="#000">
                  from txHash
                </Text>

                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`${process.env.REACT_APP_LINK_BSC}/tx/${txHash}`}
                  className="text-address"
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textDecoration: "none",
                  }}
                >
                  <TextHash
                    fontSize="20px"
                    fontWeight={600}
                    color="#e05b7d"
                    style={{ cursor: "pointer" }}
                  >
                    {txHash?.slice(0, 6)}...{txHash?.slice(-6)}
                  </TextHash>
                </a>
              </div>
              <Text
                className="mb-2"
                fontSize="18px"
                fontWeight={600}
                color="#000"
                // color="#ED1C51"
              >
                {`Token ID: ${tokenId}`}
              </Text>
              <div
                style={{
                  display: txHash ? "flex" : "none",
                  alignItems: "end",
                  marginTop: 10,
                }}
              >
                <Text fontSize="18px" fontWeight={600} color="#000">
                  Contract
                </Text>

                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`${process.env.REACT_APP_LINK_BSC}/address/${process.env.REACT_APP_NFT_ADDRESS}`}
                  className="text-address"
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textDecoration: "none",
                  }}
                >
                  <TextHash
                    fontSize="20px"
                    fontWeight={600}
                    color="#e05b7d"
                    style={{ cursor: "pointer" }}
                  >
                    {process.env.REACT_APP_NFT_ADDRESS?.slice(0, 10)}...
                    {process.env.REACT_APP_NFT_ADDRESS?.slice(-10)}
                  </TextHash>
                </a>
              </div>
              <Text
                className="mt-2"
                lineHeight="1.3"
                fontSize="24px"
                fontWeight={400}
                color="#686868"
              >
                {levelDescriptionMapping(level)}
              </Text>

              <Text
                className="mt-4"
                lineHeight="1.3"
                fontSize="16px"
                fontWeight={400}
                color="rgb(238,21,66)"
              >
                {`Note: ${CONTENT}`}
              </Text>
            </div>
          </FlexOne>
        </RowResponsive>
      </ContainerInner>
    </ContainerPrincipal>
  );
};

export default NFTDetail;
