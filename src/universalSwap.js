require("dotenv").config();
const { getPool } = require("./pool");
const { SwapRouter } = require('@uniswap/universal-router-sdk')
const { TradeType, Ether, Token, CurrencyAmount, Percent } = require('@uniswap/sdk-core')
const { Trade: V2Trade } = require('@uniswap/v2-sdk')
const { FeeAmount, Trade: V3Trade, Route: RouteV3  } = require('@uniswap/v3-sdk')
const { MixedRouteTrade, Trade: RouterTrade } = require('@uniswap/router-sdk')
const erc20Abi = require('../abis/erc20.json')

const HARDHAT = require("hardhat");
const PROVIDER = HARDHAT.ethers.provider;
const CHAIN_ID = 1

const ETHER = Ether.onChain(CHAIN_ID)

const WETH = new Token(CHAIN_ID, process.env.MAINNET_WETH, 18, 'WETH', 'Wrapped Ether')
const USDC = new Token(CHAIN_ID, process.env.MAINNET_USDC, 6, 'USDC', 'USD Coin')
const SIGNER_ADDRESS = process.env.WALLET_ADDRESS
const UNIVERSAL_SWAP_ROUTER = process.env.UNIVERSAL_SWAP_ROUTER

const wethContract = new HARDHAT.ethers.Contract(WETH.address, erc20Abi, PROVIDER)
const usdcContract = new HARDHAT.ethers.Contract(USDC.address, erc20Abi, PROVIDER)

function swapOptions(options) {
    return Object.assign(
        {
            slippageTolerance: new Percent(5, 100),
            signer: SIGNER_ADDRESS,
        },
        options
    )
}

function buildTrade(trades) {
    return new RouterTrade({
        v2Routes: trades
            .filter((trade) => trade instanceof V2Trade)
            .map((trade) => ({
                routev2: trade.route,
                inputAmount: trade.inputAmount,
                outputAmount: trade.outputAmount,
        })),
        v3Routes: trades
            .filter((trade) => trade instanceof V3Trade)
            .map((trade) => ({
                routev3: trade.route,
                inputAmount: trade.inputAmount,
                outputAmount: trade.outputAmount,
            })),
        mixedRoutes: trades
            .filter((trade) => trade instanceof MixedRouteTrade)
            .map((trade) => ({
                    mixedRoute: trade.route,
                    inputAmount: trade.inputAmount,
                outputAmount: trade.outputAmount,
            })),
    tradeType: trades[0].tradeType,
    })
}

async function universalRouterSwap(_signer, routerTrade) {
    // let quantity = "" + quantity;
    const opts = swapOptions({})
    const params = SwapRouter.swapERC20CallParameters(routerTrade, opts)

    const tx = await _signer.sendTransaction({
        data: params.calldata,
        to: UNIVERSAL_SWAP_ROUTER,
        value: params.value,
        from: SIGNER_ADDRESS,
    })

    const receipt = await tx.wait(_signer, )
    console.log('---------------------------- SUCCESS?')
    console.log('status', receipt.status)
    return receipt;
}

async function simpleEthSwap( _signer,  _tokenA, _tokenB, _quantity ) {
    const pool_V3 = await getPool(_tokenA, _tokenB, FeeAmount.MEDIUM)
    const inputEther = HARDHAT.ethers.utils.parseEther(_quantity).toString()

    const trade = await V3Trade.fromRoute(
        new RouteV3([pool_V3], ETHER, _tokenB),
        CurrencyAmount.fromRawAmount(ETHER, inputEther),
        TradeType.EXACT_INPUT
    )

    const routerTrade = buildTrade([trade])
    await universalRouterSwap(_signer, routerTrade);
}

async function main() {
    const quantity = '1';
    const impSigner = await HARDHAT.ethers.getImpersonatedSigner(SIGNER_ADDRESS);

    let ethBalance
    let wethBalance
    let usdcBalance
    ethBalance = await PROVIDER.getBalance(SIGNER_ADDRESS)
    wethBalance = await wethContract.balanceOf(SIGNER_ADDRESS)
    usdcBalance = await usdcContract.balanceOf(SIGNER_ADDRESS)
    console.log('---------------------------- BEFORE')
    console.log('BEFORE TRANSFER ethBalance', HARDHAT.ethers.utils.formatUnits(ethBalance, 18))
    console.log('BEFORE TRANSFER wethBalance', HARDHAT.ethers.utils.formatUnits(wethBalance, 18))
    console.log('BEFORE TRANSFER usdcBalance', HARDHAT.ethers.utils.formatUnits(usdcBalance, 6))

    await simpleEthSwap(impSigner, WETH, USDC, quantity)

    ethBalance = await PROVIDER.getBalance(SIGNER_ADDRESS)
    wethBalance = await wethContract.balanceOf(SIGNER_ADDRESS)
    usdcBalance = await usdcContract.balanceOf(SIGNER_ADDRESS)
    console.log('---------------------------- AFTER')
    console.log('AFTER  TRANSFER ethBalance', HARDHAT.ethers.utils.formatUnits(ethBalance, 18))
    console.log('AFTER  TRANSFER wethBalance', HARDHAT.ethers.utils.formatUnits(wethBalance, 18))
    console.log('AFTER  TRANSFER usdcBalance', HARDHAT.ethers.utils.formatUnits(usdcBalance, 6))
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
