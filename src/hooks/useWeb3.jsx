import React from "react";
import { ERC20Abi } from "../contracts";
import { LAUNCHPAD_ADDRESS } from "../config";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export const getTokenContract = (web3, tokenAddress, Abi = ERC20Abi) =>
  new web3.eth.Contract(Abi, tokenAddress);

export const convertToWeii = (web3, amount) =>
  web3.utils.toWei(amount.toString(), "ether");
export const convertToTokens = (web3, amount) =>
  web3.utils.fromWei(amount.toString(), "ether");

const useWeb3 = (account) => {
  const onApproveHandler = async (web3, tokenAddress) => {
    try {
      const tokenContract = getTokenContract(web3, tokenAddress);

      await tokenContract.methods
        .approve(LAUNCHPAD_ADDRESS, web3.utils.toWei("1000000000"))
        .send({ from: account });

      return true;
    } catch (e) {
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

  const getBalanceOf = async (web3, tokenAddress, tokenDecimal) => {
    const tokenContract = getTokenContract(web3, tokenAddress);

    const balance = await tokenContract.methods.balanceOf(account).call();
    return +balance / 10 ** +tokenDecimal;
  };

  const getAllowanceOf = async (web3, tokenAddress, tokenDecimal) => {

    const tokenContract = getTokenContract(web3, tokenAddress);

    const balance = await tokenContract.methods
      .allowance(account, LAUNCHPAD_ADDRESS)
      .call();
    return +balance / 10 ** +tokenDecimal;
  };

  const checkApprove = async (web3, tokenAddress, tokenDecimal) => {
    if (!web3 || !account) {
      return false;
    }
    const balance = await getAllowanceOf(web3, tokenAddress, tokenDecimal);
    return +balance >= 10000000;
  };

  return {
    getBalanceOf,
    onApproveHandler,
    getAllowanceOf,
    checkApprove,
  };
};

export default useWeb3;
