import React, {useState, useEffect} from "react";
import { useWallet, UseWalletProvider } from "use-wallet";
import { Button, Alert, Space } from "antd";
import { Row, Col, Typography, Spin } from "antd";
import Fortmatic from 'fortmatic'
import Web3 from 'web3'
import help from "../../assets/help.svg";

const { Title } = Typography;
const minBalance = 6326972459390600
export default  function LaunchSquad(props){
  const [balance, setBalance] = useState(0);
  const fm = new Fortmatic('pk_test_16B0A0195986AA12');
  window.web3 = new Web3(fm.getProvider());
  window.web3.currentProvider.enable();
  const showWidget = () => {
    fm.user.deposit();
  };

  useEffect(() => {
    window.web3.eth.getAccounts()
    .then((accounts) => {
      return window.web3.eth.getBalance(accounts[0])
    }).then((data) => {
      setBalance(data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  const sendBalance = () => {
    console.log(balance)
    props.parentCallback(balance)
  }
  return (
    <>
      <Col xs={24} sm={12}>
        <Title level={3}>Launch</Title>
        <p>
          In order to launch a help squad, you will need to sign up.
          You can use your email or phone number.
          <br/>
          Your current Balance is {balance} Weis
        </p>
        <Space direction="vertical" size="small">
        <div>
          <Button onClick={() => showWidget()}>Deposit some balance</Button>
        </div>
        <div>
          <Button type="primary" onClick={() => {sendBalance()}}>Launch {props.name} Squad!</Button>
        </div>  
        </Space>

      </Col>
      <Col xs={0} sm={12}>
        <img src={help} style={{ width: '100%' }} />
      </Col>
    </>
  );
};

//  (props) => {
//   return (
//     <UseWalletProvider
//       chainId={1}
//       connectors={{
//         fortmatic: { apiKey: "pk_live_C11CB41780801641" },
//       }}
//     >
//       <LaunchSquad parentCallback={() => props.onCompletedRegister()}/>
//     </UseWalletProvider>
//   );
// };
