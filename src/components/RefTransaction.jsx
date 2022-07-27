import { motion } from "framer-motion";
import React, { useContext } from "react";
import styled from "styled-components";
import { GradientText, Text } from "./commonStyle";

import { formatTotalCoin, hiddenAddress, getTime } from "../config";

const Wrapper = styled.div`
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  min-height: 100px;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Table = styled.table`
//   border: 1px solid #e7eaf3;
  width: 100%;
  height: 100%;
//   box-shadow: 0 5px 8px rgb(0 0 0 / 20%);
  margin-bottom: 0;
  transition: 0.2s ease-in-out;
  max-height: 50px !important;
`;

const THead = styled.thead`
//   border-top: 1px solid #e7eaf3 !important;
  border-radius: 10px;
`;
const TBody = styled.tbody`
  height: 100%;
  overflow: scroll;
  //border-top: 1px solid #e7eaf3 !important;
`;

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const RefTransaction = ({ data }) => {
  return (
    <Wrapper
      as={motion.div}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="container position-relative mb-5"
      style={data.length ? {} : { display: "none" }}
    >
      <div className="w-100 " style={{ marginBottom: 150, marginTop: 10 }}>
        <Text className="mb-3 ms-0 text-uppercase text-start" fontSize="20px">
          History Referral
        </Text>
        <Table className="table table-striped">
          <THead>
            <tr>
              <th scope="col">
                <Text
                  fontSize="16px"
                  color="#606060"
                  fontWeight={500}
                  className="ms-0"
                >
                  #
                </Text>
              </th>
              <th scope="col">
                <Text
                  fontSize="16px"
                  color="#606060"
                  fontWeight={500}
                  className="ms-0"
                >
                  TxHash
                </Text>
              </th>
              <th scope="col">
                <Text
                  fontSize="16px"
                  color="#606060"
                  fontWeight={500}
                  className="ms-0"
                >
                  From
                </Text>
              </th>
              <th scope="col">
                <Text
                  fontSize="16px"
                  color="#606060"
                  fontWeight={500}
                  className="ms-0"
                >
                  Amount
                </Text>
              </th>
              <th scope="col">
                <Text
                  fontSize="16px"
                  color="#606060"
                  fontWeight={500}
                  className="ms-0"
                >
                  Commission
                </Text>
              </th>
              <th scope="col">
                <Text
                  fontSize="16px"
                  color="#606060"
                  fontWeight={500}
                  className="ms-0"
                >
                  At
                </Text>
              </th>
            </tr>
          </THead>

          <TBody className="position-relative">
            {data?.map((token, index) => (
              <tr key={token.createdAt}>
                <th scope="row">
                  <Text fontSize="16px" className="ms-0 d-inline-block">
                    {index + 1}
                  </Text>
                </th>
                <td>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`${process.env.REACT_APP_LINK_BSC}/tx/${token.txHash}`}
                    className="text-address"
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      textDecoration: "none",
                    }}
                  >
                    <Text
                      fontSize="16px"
                      className="ms-0 d-inline-block"
                    >
                      {hiddenAddress(token.txHash)}
                    </Text>
                  </a>
                </td>
                <td>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`${process.env.REACT_APP_LINK_BSC}/address/${token?.address}`}
                    className="text-address"
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      textDecoration: "none",
                    }}
                  >
                    <Text
                      fontSize="16px"
                      className="ms-0 d-inline-block"
                    >
                      {hiddenAddress(token?.address)}
                    </Text>
                  </a>
                </td>
                <td>
                  <div className="d-flex align-items-center py-2">
                    <Text fontSize="16px" className="ms-0">
                      {formatTotalCoin(token.amount)}{" "}
                    </Text>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center py-2">
                    <GradientText fontSize="16px" className="ms-0">
                      {formatTotalCoin(token.amount * 0.05)}{" "}
                    </GradientText>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center py-2">
                    <Text fontSize="16px" className="ms-0">
                      {getTime(new Date(token.createdAt))}{" "}
                    </Text>
                  </div>
                </td>
              </tr>
            ))}
          </TBody>
        </Table>
      </div>
    </Wrapper>
  );
};

export default React.memo(RefTransaction);
