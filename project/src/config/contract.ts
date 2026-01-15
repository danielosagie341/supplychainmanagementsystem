import { Contract, JsonRpcProvider } from "ethers";
import SupplyChainJSON from "../../artifacts/contracts/SupplyChain.sol/SupplyChain.json";

const contractAddress = "0xYourDeployedAddressHere"; // Replace with actual address

export const getContract = async (): Promise<Contract> => {
  const provider = new JsonRpcProvider("http://127.0.0.1:8545");
  const signer = await provider.getSigner();
  return new Contract(contractAddress, SupplyChainJSON.abi, signer);
};
