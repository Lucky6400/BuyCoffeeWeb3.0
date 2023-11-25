
import { useEffect, useState } from 'react'
import './App.css'
import { ethers } from 'ethers';
import abi from './contracts/chai.json'
import Buy from './components/Buy';
import Memos from './components/Memos';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState('not connected')

  useEffect(() => {
    const temp = async () => {

      try {

        const contractAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contractAbi = abi.abi;

        // metamask part
        // this will help do transactions
        // metamask contains infura api which actually helps in connecting to blockchain

        const { ethereum } = window; // ethereum key provided by metamask

        const account = await ethereum.request({
          method: "eth_requestAccounts"
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        })
        setAccount(account);

        // this will help us connect to the wallet
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddr, contractAbi, signer
        )
        console.log(contract)
        setState({
          provider, signer, contract
        })

      } catch (error) {
        console.log(error)
      }
    };

    temp();
  }, []);


  return (
    <>
      <div className="accoutCont">
        Connected Account: {account}
      </div>
      <Buy state={state} />
      <Memos />
    </>
  )
}

export default App
