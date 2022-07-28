import React from "react";

import Web3 from "web3";
import nftABI from "../contracts/NFT.json";
import launchPadABI from "../contracts/LaunchPad.json";
import IERC20ABI from "../contracts/IERC20.json";
import BRIDGEABI from "../contracts/Bridge.json";

import axios from "axios";

import useMultiCall from "./useMultiCall";

import { Interface } from "@ethersproject/abi";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const HISTORY_TYPE = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
};

const multicall = async (multi, abi, calls) => {
  const itf = new Interface(abi);

  const calldata = calls.map((call) => [
    call.address.toLowerCase(),
    itf.encodeFunctionData(call.name, call.params),
  ]);
  const { returnData } = await multi.methods.aggregate(calldata).call();
  const res = returnData.map((call, i) =>
    itf.decodeFunctionResult(calls[i].name, call)
  );

  return res;
};

const NFT_ADDRESS = process.env.REACT_APP_NFT_ADDRESS;
const LAUNCHPAD_ADDRESS = process.env.REACT_APP_LAUNCHPAD_ADDRESS;
const BUSD_TOKEN_ADDRESS = process.env.REACT_APP_BUSD_TOKEN_ADDRESS;
const BRIDGE_ADDRESS = process.env.REACT_APP_BRIDGE_ADDRESS;

const COUNT_OPTION_SELL = process.env.REACT_APP_COUNT_OPTION_SELL || 5;

const useMarketHook = () => {
  const { getMultiContract } = useMultiCall();

  const getBalance = async (web3, account) => {
    if (!web3) {
      return [];
    }

    try {
      const contract = new web3.eth.Contract(IERC20ABI, BUSD_TOKEN_ADDRESS);

      const balance = await contract.methods.balanceOf(account).call();

      return balance / 1e18;
    } catch (e) {
      console.error("getBalance: ", e);
    }
  };

  const getListOptionSell = async () => {
    const web3A = new Web3(process.env.REACT_APP_BSC);

    try {
      const multicallContract = getMultiContract(web3A);

      let promise = [];

      for (let i = 0; i < COUNT_OPTION_SELL; i++) {
        promise.push({
          address: LAUNCHPAD_ADDRESS,
          name: "launches",
          params: [i],
        });
      }

      const data = await multicall(multicallContract, launchPadABI, promise);
      const newData = data.map((item) => ({
        ...item,
        price: +Web3.utils.fromWei(item.priceInUSD.toString()),
      }));

      return newData;
      //   return [];
    } catch (e) {
      console.error("getListOptionSell: ", e);
    }
  };

  const getListMyNFT = async (account, web3) => {
    const ADDRESS = NFT_ADDRESS;

    if (!account || !web3) {
      return [];
    }
    try {
      const multicallContract = getMultiContract(web3);

      const contract = new web3.eth.Contract(nftABI, ADDRESS);

      // const balances = Number(await contract.methods.balanceOf(account).call());

      let tokenIds = [];
      let tokenInfos = [];

      // if (balances == "0") {
      //   return [];
      // }

      // if (balances) {
      const calls = [];

      for (let index = 0; index < 1; index++) {
        calls.push({
          address: ADDRESS,
          name: "tokenOfOwnerByIndex",
          params: [account, index],
        });
      }
      tokenIds = await multicall(multicallContract, nftABI, calls);
      tokenIds = tokenIds.map((id, index) => id.toString());
      // }

      if (tokenIds.length) {
        const calls = [];
        tokenIds.forEach((id) => {
          calls.push({
            address: ADDRESS,
            name: "getToken",
            params: [+id],
          });
        });
        tokenInfos = await multicall(multicallContract, nftABI, calls);

        tokenInfos = tokenInfos.map((item) => ({
          createTimestamp: item.createTimestamp.toNumber(),
          level: item.level.toNumber(),
          rb: +item.rb.toString(),
          remainToNextLevel: +item.remainToNextLevel.toString(),
          stakeFreeze: item.stakeFreeze,
          tokenId: item.tokenId.toNumber(),
          tokenOwner: item.tokenOwner,
          uri: item.uri,
        }));
        tokenInfos.sort((a, b) => a.level - b.level);

        return tokenInfos;
      }
    } catch (e) {
      console.log("getListMyNFT: ", e);
      return [];
    }
  };

  const buyNFT = async ({ index, price, refCode, account, level, web3 }) => {
    try {
      const contract = new web3.eth.Contract(launchPadABI, LAUNCHPAD_ADDRESS);
      const data = await contract.methods
        .buyNFT(index, refCode || "")
        .send({ from: account });

      await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/transactions`,
        {
          address: account,
          type: "market",
          amount: +price,
          refCode: refCode,
          isMarket: true,
          level,
          launchpadId: index,
          txHash: data.transactionHash,
          tokenId: +data.events.Buy.returnValues.nftId,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": true,
          },
        }
      );

      return true;
    } catch (e) {
      console.log("getListMyNFT: ", e);
      const error = e.message;

      if (error.includes("insufficient funds")) {
        withReactContent(Swal).fire({
          imageUrl: "/error-face.png",
          imageWidth: "auto",
          imageHeight: "auto",
          imageAlt: "Custom image",

          title: <span style={{ color: "#ED1C51" }}> Failed...</span>,
          textColor: "red",
          html: (
            <span style={{ color: "rgb(128, 128, 128)", fontWeight: 400 }}>
              Insufficient BNB
            </span>
          ),
          focusConfirm: false,
          confirmButtonText: "Continue",

          backdrop: `#e7edf599`,
        });
      }
      return false;
    }
  };

  const verifyRefCode = async (refCode) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/users/ref/${refCode}`,
        {
          headers: {
            "Access-Control-Allow-Origin": true,
          },
        }
      );

      return data?.data?.data || false;
    } catch (e) {}
    return false;
  };

  const getRefCode = async (account) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/users?address=${account}`,
        {
          headers: {
            "Access-Control-Allow-Origin": true,
          },
        }
      );

      return response.data.data;
    } catch (e) {
      console.log("getRefCode: ", e);
    }
  };

  const getListImage = async ({ level = 1, page = 1, limit = 25 }) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/nft/images?page=${page}&limit=${limit}&level=${level}`,
        {
          headers: {
            "Access-Control-Allow-Origin": true,
          },
        }
      );

      return { ...data.data.data };
    } catch (e) {
      console.log("getListImage", e);
      return null;
    }
  };

  const getTransactionOfUser = async (account, refCode) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/transactions/market`,
        {
          headers: {
            "Access-Control-Allow-Origin": true,
          },
          params: {
            address: account,
            refCode: refCode,
          },
        }
      );

      console.log("data: ", data);

      return { ...data.data };
    } catch (e) {
      console.log("getListImage", e);
      return null;
    }
  };

  const getTransactionOfRef = async (refCode) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/transactions`,
        {
          headers: {
            "Access-Control-Allow-Origin": true,
          },
          params: {
            refCode: refCode,
          },
        }
      );

      return { ...data.data };
    } catch (e) {
      console.log("getListImage", e);
      return null;
    }
  };

  const getDetailNft = async (tokenId) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/nft/metadata/${tokenId}`,
        {
          headers: {
            "Access-Control-Allow-Origin": true,
          },
        }
      );

      return { ...data.data };
    } catch (e) {
      console.log("getDetailNft", e);
    }
  };

  const getTotalAmount = async (account) => {
    if (!account) {
      return 0;
    }
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/users/amount?address=${account}`,
        {
          headers: {
            "Access-Control-Allow-Origin": true,
          },
        }
      );

      return data.data;
    } catch (e) {
      console.error("getTotalAmount: ", e);
    }
  };

  const getTotalWithdraw = async (account) => {
    if (!account) {
      return 0;
    }
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/history/total-withdraw?address=${account}`,
        {
          headers: {
            "Access-Control-Allow-Origin": true,
          },
        }
      );

      return data.data;
    } catch (e) {
      console.error("getTotalWithdraw: ", e);
    }
  };

  const checkPending = async (account) => {
    if (!account) {
      return 0;
    }
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/history/is-Pending?address=${account}`,
        {
          headers: {
            "Access-Control-Allow-Origin": true,
          },
        }
      );

      return data.data;
    } catch (e) {
      console.error("getTotalWithdraw: ", e);
    }
  };

  const getTransaction = async (account, page = 1, limit = 1000000) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/history?address=${account}&page=${page}&limit=${limit}&status=${HISTORY_TYPE.SUCCESS}`,
        {
          headers: {
            "Access-Control-Allow-Origin": true,
          },
        }
      );
      return data.data;
    } catch (e) {
      console.log("get Transaction: ", e);
    }
  };

  const withdraw = async (web3, account, message) => {
    var txHash = "";
    try {
      const { r, s, v } = message.message;
      const amount = message.amount;

      const contract = new web3.eth.Contract(BRIDGEABI, BRIDGE_ADDRESS);

      const data = await contract.methods
        .transferPermit(Web3.utils.toWei(`${amount}`), account.toLowerCase(), v, r, s)
        .send({ from: account })
        .on("transactionHash", (payload) => {
          console.log("payload: ", payload);
          txHash = payload;
        });

      await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/history`,
        {
          account,
          txHash: data.transactionHash,
          amount,
          type: "withdraw",
          status: HISTORY_TYPE.SUCCESS,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": true,
          },
        }
      );
      return true;
    } catch (e) {
      await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/history`,
        {
          account,
          txHash: txHash || "Metamask" + new Date().getTime().toString(),
          amount: 0,
          type: "withdraw",
          status: HISTORY_TYPE.FAILED,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": true,
          },
        }
      );
      console.log("withdraw Transaction: ", e);
    }

    return false;
  };

  const signMessage = async (account) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/history/sign`,

        {
          headers: {
            "Access-Control-Allow-Origin": true,
          },
          params: {
            address: account,
          },
        }
      );
      return data.data;
    } catch (e) {
      console.log("withdraw Transaction: ", e);
    }
  };

  const getListTreasure = async (address, accessToken) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_LIST_TREASURE}/getByWallet?address=${address}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return data.data.data;
    } catch (e) {
      console.log("Get list treasure:", e)
    }
  }

  return {
    getListOptionSell,
    verifyRefCode,
    getRefCode,
    buyNFT,
    getListMyNFT,
    getBalance,
    getListImage,
    getTransactionOfUser,
    getDetailNft,
    getTotalAmount,
    getTransaction,
    withdraw,
    getTotalWithdraw,
    checkPending,
    getTransactionOfRef,
    getListTreasure,
    signMessage,
  };
};

export default useMarketHook;
