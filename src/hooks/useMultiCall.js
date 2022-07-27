import Web3 from "web3";
import abi from "../contracts/Multicall.json";

const MULTICALL_ADDRESS = {
  56: "0x38ce767d81de3940CFa5020B55af1A400ED4F657",
  97: "0x67ADCB4dF3931b0C5Da724058ADC2174a9844412",
  137: "0x95028E5B8a734bb7E2071F96De89BABe75be9C8E",
};

const useMultiCall = () => {
  const getMultiContract = (web3) => {
    const address = MULTICALL_ADDRESS[process.env.REACT_APP_CHAIN_ID || 97];
    const contract = new web3.eth.Contract(abi, address);

    return contract;
  };
  return {
    getMultiContract,
  };
};

export default useMultiCall;
