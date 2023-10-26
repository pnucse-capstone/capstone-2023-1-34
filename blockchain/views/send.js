window.addEventListener('load', function () {


  var express = require('express');
  var app = express();
  var Web3 = require('web3');
  var web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));
  var Tx = require('ethereumjs-tx');

  const send_account    = "0x82Ff486364ebDbEe1b34b7538ceD72448d9b38cb";
  const receive_account = "0xf2a58d3F268642f7f5416F4248f4Fb2623a5D929";
  const privateKey = Buffer.from('privateKey', 'hex');

  //메인홈페이지
  app.get('/main', function(req,res){

    web3.eth.getTransactionCount(send_account, (err, txCount) => {

    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(1000000), // Raise the gas limit to a much higher amount
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
      to: receive_account,
      value :  '0x2386f26fc10000' //0.01이더 전송 to_hex
    };

    const tx = new Tx(txObject);
    tx.sign(privateKey);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    web3.eth.sendSignedTransaction(raw)
      .once('transactionHash', (hash) => {
        console.info('transactionHash', 'https://ropsten.etherscan.io/tx/' + hash);
      })
      .once('receipt', (receipt) => {
        console.info('receipt', receipt);
      }).on('error', console.error);
    });

  });
  //app을 listen
  app.listen(4000, function(){
    console.log('Connected memo, 4000 port!');
  });

})