import { TTweet } from "@/type";
import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x4EA746c6f213697f8D59c4eA4189A1c7C676Bca9" as const;

export async function doLogin(): Promise<string> {
  if (!window.ethereum) throw new Error("No Metamask found");

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if (!accounts || !accounts.length)
    throw new Error("Wallet not found or allowed");

  localStorage.setItem("wallet", accounts[0]);

  return accounts[0];
}

function getContract() {
  if (!window.ethereum) throw new Error("No Metamask found");
  const web3 = new Web3(window.ethereum);
  const from: string = localStorage.getItem("wallet")!;

  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function addTweet(text: string) {
  const contract = getContract();
  return (contract.methods.addTweet as any)(text).send();
}

export async function changeUsername(username: string) {
  const contract = getContract();
  return (contract.methods.changeUsername as any)(username).send();
}

export async function getLastTweets(page: number) {
  const contract = getContract();
  const tweets: TTweet[] = await (contract.methods.getLastTweets as any)(
    page
  ).call();
  return tweets.map((t) => ({ ...t })).filter((t) => t.text !== "");
}
