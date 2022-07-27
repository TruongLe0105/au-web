import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";

import useQuery from "../../hooks/useQuery";

import useDAO from "../../hooks/useDAO";

import NFTItem from "./Item";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { AppContext } from "../../AppContext";

import useWeb3 from "../../hooks/useWeb3";

import { BUSD_TOKEN_ADDRESS } from "../../config/index";

const variants = {
  show: {
    opacity: 1,
    y: 0,
  },
  hide: {
    opacity: 0,
    y: -100,
  },
};

const Wrapper = styled.div`
  --gap: 1rem;
  padding: 5rem 0;
  display: flex;
  flex-wrap: wrap;
  margin: calc(-1 * var(--gap));
  overflow: hidden;
`;

const Category = () => {
  const query = useQuery();

  const { web3, account } = useContext(AppContext);

  const { onApproveHandler, checkApprove } = useWeb3(account);

  const { getListImage, buyNFT } = useDAO();

  const [fetchArr, setFetchArr] = useState([]);

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const [isApproved, setApproved] = useState(false);

  const fetchMoreData = useCallback(async () => {
    if (page > Math.ceil(total / 25) || isLoading) {
      return;
    }

    setLoading(true);

    const level = query.get("level");
    const data = await getListImage({ level, page: page + 1 });
    console.log("data:", data);

    setTotal(data.total);
    setFetchArr([...fetchArr, ...data.data]);

    setPage(page + 1);

    setLoading(false);
  }, [fetchArr, getListImage, isLoading, page, query, total]);

  useEffect(() => {
    fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onApprove = async () => {
    setLoading(true);

    const isSuccess = await onApproveHandler(web3, BUSD_TOKEN_ADDRESS);
    setApproved(isSuccess);

    setLoading(false);
  };

  const onBuy = async ({ index, refCode, price, level }) => {
    const isSuccess = await buyNFT({
      index,
      account,
      refCode,
      web3,
      price,
      level,
    });

    if (isSuccess) {
      withReactContent(Swal).fire({
        imageUrl: "/success-face.png",
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
            You have successfully Buy NFT{" "}
          </span>
        ),
        focusConfirm: false,
        confirmButtonText: "Continue",

        backdrop: `#e7edf599`,
      });
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
  };

  return (
    <motion.div variants={variants} animate="show" exit="hide" initial="hide">
      <div className="container">
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={total}
          next={fetchMoreData}
          hasMore={page <= Math.ceil(total / 25)}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Wrapper>
            {fetchArr.map((element, index) => (
              <NFTItem
                key={`${element.imageId}`}
                isApproved={isApproved}
                isLoading={isLoading}
                onApprove={onApprove}
                onBuy={onBuy}
                element={element}
                index={index}
              />
            ))}
          </Wrapper>
        </InfiniteScroll>
      </div>
    </motion.div>
  );
};

export default Category;
