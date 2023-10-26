            const MyContract = new web3.eth.Contract(abi);

            let deploy = MyContract.deploy({
               data: bytecode,
               from: send_account}).encodeABI();
            
               const txObject = {
                nonce:    web3.utils.toHex(txCount),
                gasLimit: web3.utils.toHex(1000000), // Raise the gas limit to a much higher amount
                gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                data : '0x' + deploy  // <- Hex 기반으로 해야되는 것 주의!!
                };