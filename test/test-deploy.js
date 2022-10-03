const { ethers } = require("hardhat");
//為了用expect與assert關鍵字 所以才import chai
const { expect, assert } = require("chai");
//在外層宣告兩個變數 因為在beforeEach跟it都會用到
let simpleStorageFactory, aContract;

//關鍵字describe讓hardhat mocha認得 傳入字串 跟function
describe("SimpleStorage", function () {
  //在it之前要做什麼事,這裡是部署智能合約
  beforeEach("deploy contract", async function () {
    //使用etherJS抓取智能合約SimpleStorage
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    //部署智能合約 並塞到變數aContract
    aContract = await simpleStorageFactory.deploy();
  });

  it("Should start with a number of 0", async function () {
    const currentValue = await aContract.retrieve();
    //因為我們想要在value值在0的狀況下 才觸發此it 所以先宣告一個變數為0
    const expectedValue = "0";
    //可以透過assert或是expect關鍵字來達成 類似if的判斷
    //為此需要import "chai" 這個package 這個package在安裝時會自動安裝
    //assert關鍵字內建許多功能
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should update Value when we call the store function", async function () {
    //我們預期數字為7
    const expectValue = "7";
    //呼叫合約的store function 存入數字
    const TransactionResponse = await aContract.store(expectValue);
    //等待一個區塊時間
    await TransactionResponse.wait(1);
    //呼叫合約輸出值
    const currentValue = await aContract.retrieve();
    //使用assert檢查輸出是否跟我們預期的一樣 為7
    assert.equal(currentValue.toString(), expectValue);
  });

  it("test add Person function", async function () {
    const expectNumber = "9";
    const expectName = "kira";
    const TransactionResponse = await aContract.addPerson(
      expectName,
      expectNumber
    );
    await TransactionResponse.wait(1);

    //      物件                   陣列中index 0 的物件
    const aContractArrayStruct = await aContract.people(0);
    //物件中的favoriteNumber 與 預期的數字 對比 是否相等
    assert.equal(aContractArrayStruct.favoriteNumber.toString(), expectNumber);
    //物件中的name 與 預期的name 對比 是否相等
    assert.equal(aContractArrayStruct.name, expectName);
    //上述三行也可以這樣寫
    //直接宣告兩個變數 用來接people陣列index 0的struct內的東西
    //上述的寫法則是用struct來接 在抓取struct裡面的值
    //const { favoriteNumber, name } = await aContract.people(0);
    //assert(favoriteNumber, expectNumber);
    //assert(name, expectName);

    //智能合約的name與number的mapping
    const aContractNumberofName = await aContract.nameToFavoriteNumber(
      expectName
    );
    //比對mapping 與預期的數字是否相等
    assert.equal(aContractNumberofName.toString(), expectNumber);
  });
});
