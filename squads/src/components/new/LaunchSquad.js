import React, { useState } from "react";
import Fortmatic from "fortmatic";
import { useWallet, UseWalletProvider } from "use-wallet";
import { Button, Alert } from "antd";
import { Row, Col, Typography, Spin } from "antd";

import help from "../../assets/help.svg";

const { Title } = Typography;

const LaunchSquad = ({ parentCallback }) => {
  const wallet = useWallet();
  const fortmatic = new Fortmatic('pk_live_C11CB41780801641');
  // For testing purposes only, you can replace wallet.balance
  // for balance and then use setBalance to simulate an ETH deposit
  // const [balance, setBalance] = useState(0);
  // window.setBalance = setBalance;

  return (
    <>
      <Col xs={24} sm={12}>
        <Title level={3}>Launch</Title>
        <p>
          To launch a help squad, a $20 deposit is needed.<br/>
          This is because of our payment providers.<br/>
          It will cost around $5 in network fees to launch the help squad.<br/>
          <b>The rest will be deposited directly on your own help squad, so you will be its first donor!</b>
        </p>
        {wallet.balance < 0.05 ? (
          <Button
            type="primary"
            onClick={() => fortmatic.user.deposit()}
          >
            Deposit $20
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => wallet.activate("fortmatic")}
          >
            Launch help squad
          </Button>
        )}
      </Col>
      <Col xs={0} sm={12}>
        <img src={help} style={{ width: '100%' }} />
      </Col>
    </>
  );
};

export default (props) => {
  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        fortmatic: { apiKey: "pk_live_C11CB41780801641" },
      }}
    >
      <LaunchSquad parentCallback={() => props.onCompletedRegister()}/>
    </UseWalletProvider>
  );
};
