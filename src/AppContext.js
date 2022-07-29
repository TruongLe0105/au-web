import React, { createContext, useState, useEffect } from "react";
import getWeb3, { getWeb3BSC } from "./getWeb3";
import { SHTAbi, SwapContractAbi } from "./contracts";
import { toast } from "react-toastify";
import useWeb3, { getTokenContract } from "./hooks/useWeb3";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import useDAO from "./hooks/useDAO";
import Web3 from "web3";

export const SWAPCONTRACT_ADDRESS =
  "0xB7f251C70057784686e52626330B1a19653297bb";
const SHTAddress = "0x5ce58bC6788b26A9F896caC9BC0C5fF2e33736c7";

const getSwapStakingContract = (web3) =>
  new web3.eth.Contract(SwapContractAbi, SWAPCONTRACT_ADDRESS);

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const { getRefCode, getBalance, getListOptionSell, getListMyNFT } = useDAO();

  const [web3, setWeb3] = useState();
  const [web3Bsc, setWeb3Bsc] = useState();
  const [account, setAccount] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [receiveList, setReceiveList] = useState(null);
  const [tokenSwap, setTokenSwap] = useState(null);
  const [tokenReceive, setTokenReceive] = useState(null);
  const [hasAccountChanged, setHasAccountChanged] = useState(false);
  const [swapContract, setSwapContract] = useState(null);
  const [balance, setBalance] = useState({});
  const [myRefCode, setMyRef] = useState(null);

  const [nftSell, setNftSell] = useState([]);

  const [listMyNft, setListMyNft] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    console.log("here");
    await window.ethereum.enable();
  };

  const handleLogout = () => {
    setAccount(null);
  };

  const switchNetworkHandler = async (chainId) => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${Number(process.env.REACT_APP_CHAIN_ID).toString(16)}`,
            rpcUrls: [process.env.REACT_APP_BSC],
            chainName: process.env.REACT_APP_CHAIN_NAME,
            nativeCurrency: {
              name: "BNB",
              symbol: "BNB", // 2-6 characters long
              decimals: 18,
            },
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDefaultBalance = async (web3bsc, account) => {
    const data = await getBalance(web3bsc, account);
    setBalance(data || 0);
  };

  const loadOptionSell = async () => {
    setIsLoading(true);
    const [dataOptionSell] = await Promise.all([getListOptionSell()]);

    if (dataOptionSell) {
      const parseMyNft = {};

      const newOption = dataOptionSell.map((item) => ({
        ...item,
        myNFT: parseMyNft[item.level] || 0,
      }));

      setNftSell(newOption);
    }
    setIsLoading(false);
  };

  const loadMyNFT = async () => {
    // setIsLoading(true);
    const newWeb3 = new Web3(process.env.REACT_APP_BSC);
    const data = await getListMyNFT(account, newWeb3);

    setListMyNft(data);

    // if (dataOptionSell) {
    //   const parseMyNft = {};
    //   dataMyNFT.forEach((item) => {
    //     parseMyNft[item.level] = (parseMyNft[item?.level] || 0) + 1;
    //   });

    //   const newOption = dataOptionSell.map((item) => ({
    //     ...item,
    //     myNFT: parseMyNft[item.level] || 0,
    //   }));

    //   setNftSell(newOption);
    // }
    // setIsLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const [web3eth, web3bsc] = await Promise.allSettled([
          getWeb3(),
          getWeb3BSC(),
        ]);
        const [networkId, accounts] = await Promise.allSettled([
          web3eth.value.eth.net.getId(),
          web3eth.value.eth.getAccounts(),
        ]);
        console.log('networkId:', networkId)


        setSwapContract(getSwapStakingContract(web3eth.value));
        setWeb3(web3eth.value);
        setWeb3Bsc(web3bsc.value);
        setNetworkId(networkId.value);

        if (accounts.value.length > 0) {
          setAccount(accounts.value[0]);
          await getDefaultBalance(web3bsc.value, accounts.value[0]);

          const refCode = await getRefCode(accounts.value[0]);
          setMyRef(refCode);
        }
        window.ethereum.on("accountsChanged", async (accounts) => {
          setHasAccountChanged(true);
          if (!accounts[0]) {
            setAccount(null);
            setTokenSwap(null);
            setTokenReceive(null);
            setReceiveList(null);
          } else {
            setTokenSwap(null);
            setTokenReceive(null);
            setAccount(web3eth.value.utils.toChecksumAddress(accounts[0]));
            await getDefaultBalance(web3bsc.value, accounts[0]);
            const refCode = await getRefCode(accounts[0]);
            setMyRef(refCode);
          }
        });
        window.ethereum.on("chainChanged", (_chainId) =>
          window.location.reload()
        );
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadOptionSell();
    if (account) {
      loadMyNFT();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <AppContext.Provider
      value={{
        account,
        handleConnect,
        handleLogout,
        switchNetworkHandler,
        networkId,
        receiveList,
        tokenReceive,
        tokenSwap,
        web3,
        web3Bsc,
        hasAccountChanged,
        swapContract,
        balance,
        getDefaultBalance,
        myRefCode,
        nftSell,
        isLoading,
        setNftSell,
        listMyNft,
        loadMyNFT,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
