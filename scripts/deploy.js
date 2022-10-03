const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying contract...");
  const aContract = await SimpleStorageFactory.deploy();
  await aContract.deployed();
  console.log(`Contract address is ${aContract.address}`);
  //console.log(network.config);
  //如果網路的chainId等於5 也就是Goerli測試網 且 etherscan的API KEY存在
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    //等待六個區塊
    await aContract.deployTransaction.wait("6");
    //才進行驗證智能合約
    await verfiy(aContract.address, []);
  }

  const ContractValue = await aContract.retrieve();
  console.log(ContractValue.toString());
  const UpdateResponse = await aContract.store(777);
  await UpdateResponse.wait(1);
  const updateValue = await aContract.retrieve();
  console.log(updateValue.toString());
}

//async (contractAddress, args) => {
async function verfiy(contractAddress, args) {
  console.log("verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorAruments: args,
    });
  } catch (e) {
    //e 代表的是error錯誤訊息
    //如果e的訊息全部轉成小寫之後,還包含alreay verified,則輸出訊息,否則輸出e的內容
    //使用try catch來保證整個script不會因為這個function失敗 而跳出  而是會繼續進行下去
    if (e.message.toLowerCase().includes("alreay verified")) {
      console.log("The contract is already verified!");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
