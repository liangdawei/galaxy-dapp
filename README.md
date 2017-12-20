# 说明

本项目是收付邦平台的一个区块链应用，实现了供应链金融中发票、放款、还款等业务信息的链上存储与展示。

项目基于**以太坊**区块链平台，采用目前流行的 **Truffle** 框架开发，使用 **Solidity** 实现的智能合约作为数据存储，通过 **Web3.js** 与智能合约交互，还通过 **Express** 开放 RESTful 接口的方式实现了智能合约的外部系统调用。项目使用 Html、Css 和 Javascript 实现链上信息的界面展示。

# 开发运行

1. 安装Node.js。

2. 安装Truffle：`npm install -g truffle` 。详情可查看官方文档：http://truffleframework.com/。

3. 安装EthereumJS TestRPC：`npm install -g ethereumjs-testrpc`。详情请可查看官方仓库：https://github.com/ethereumjs/testrpc。

4. 打开命令行(windows系统推荐gitbash)，运行 **testrpc** 命令 或进入项目根目录运行 **./restart-testrpc-instance.sh**，启动以太坊客户端节点。

5. 命令行进入项目根目录，运行 **npm install 或者 npm i** 命令安装依赖包（推荐淘宝镜像 **cnpm install/i** ）。

6. 运行 **truffle compile** 命令，编译智能合约。

7. 运行 **truffle migrate** 命令，部署智能合约。

8. 运行 **npm run start** 命令，启动服务。
