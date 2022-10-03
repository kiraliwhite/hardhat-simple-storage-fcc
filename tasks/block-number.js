const { task } = require("hardhat/config");

task("block-number", "Prints the current block number").setAction(
  //箭頭函式 加上名稱的寫法
  //const blockTask = async function() => {}
  //一般函式的寫法
  //async function blockTask() {
  //以下為箭頭函式 省略名稱的寫法 變為匿名函式
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);
  }
);

module.exports = {}
