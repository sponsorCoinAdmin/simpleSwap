const { SwapRouter } = require('@uniswap/universal-router-sdk')
require("dotenv").config();
const { TradeType, Ether, Token, CurrencyAmount, Percent } = require('@uniswap/sdk-core')
const { Trade: V2Trade } = require('@uniswap/v2-sdk')
const { Pool, nearestUsableTick, TickMath, TICK_SPACINGS, FeeAmount, Trade: V3Trade, Route: RouteV3  } = require('@uniswap/v3-sdk')
const { MixedRouteTrade, Trade: RouterTrade } = require('@uniswap/router-sdk')
const IUniswapV3Pool = require('@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json')
const JSBI = require('jsbi')
const erc20Abi = require('../abis/erc20.json')

const HARDHAT = require("hardhat");
const PROVIDER = HARDHAT.ethers.provider;

const ETHER = Ether.onChain(1)

const WETH = new Token(1, process.env.MAINNET_WETH, 18, 'WETH', 'Wrapped Ether')
const USDC = new Token(1, process.env.MAINNET_USDC, 6, 'USDC', 'USD Coin')
const SIGNER = process.env.MAINNET_SIGNER_WALLET
const UNIVERSAL_SWAP_ROUTER = process.env.UNIVERSAL_SWAP_ROUTER

const wethContract = new HARDHAT.ethers.Contract(WETH.address, erc20Abi, PROVIDER)
const usdcContract = new HARDHAT.ethers.Contract(USDC.address, erc20Abi, PROVIDER)

async function getPool(tokenA, tokenB, feeAmount) {
    const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

    const poolAddress = Pool.getAddress(token0, token1, feeAmount)

    const contract = new HARDHAT.ethers.Contract(poolAddress, IUniswapV3Pool.abi, PROVIDER)

    let liquidity = await contract.liquidity()

    let { sqrtPriceX96, tick } = await contract.slot0()

    liquidity = JSBI.BigInt(liquidity.toString())
    sqrtPriceX96 = JSBI.BigInt(sqrtPriceX96.toString())

    return new Pool(token0, token1, feeAmount, sqrtPriceX96, liquidity, tick, [
        {
            index: nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[feeAmount]),
            liquidityNet: liquidity,
            liquidityGross: liquidity,
        },
        {
            index: nearestUsableTick(TickMath.MAX_TICK, TICK_SPACINGS[feeAmount]),
            liquidityNet: JSBI.multiply(liquidity, JSBI.BigInt('-1')),
            liquidityGross: liquidity,
        },
    ])
}


function swapOptions(options) {
    return Object.assign(
        {
            slippageTolerance: new Percent(5, 100),
            signer: SIGNER,
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

async function main() {
    const signer = await HARDHAT.ethers.getImpersonatedSigner(SIGNER);

    const WETH_USDC_V3 = await getPool(WETH, USDC, FeeAmount.MEDIUM)

    const inputEther = HARDHAT.ethers.utils.parseEther('1').toString()

    const trade = await V3Trade.fromRoute(
        new RouteV3([WETH_USDC_V3], ETHER, USDC),
        CurrencyAmount.fromRawAmount(ETHER, inputEther),
        TradeType.EXACT_INPUT
    )

    const routerTrade = buildTrade([trade])

    const opts = swapOptions({})

    const params = SwapRouter.swapERC20CallParameters(routerTrade, opts)

    let ethBalance
    let wethBalance
    let usdcBalance
    ethBalance = await PROVIDER.getBalance(SIGNER)
    wethBalance = await wethContract.balanceOf(SIGNER)
    usdcBalance = await usdcContract.balanceOf(SIGNER)
    console.log('---------------------------- BEFORE')
    console.log('ethBalance', HARDHAT.ethers.utils.formatUnits(ethBalance, 18))
    console.log('wethBalance', HARDHAT.ethers.utils.formatUnits(wethBalance, 18))
    console.log('usdcBalance', HARDHAT.ethers.utils.formatUnits(usdcBalance, 6))

    const tx = await signer.sendTransaction({
        data: params.calldata,
        to: UNIVERSAL_SWAP_ROUTER,
        value: params.value,
        from: SIGNER,
    })

    const receipt = await tx.wait()
    console.log('---------------------------- SUCCESS?')
    console.log('status', receipt.status)

    ethBalance = await PROVIDER.getBalance(SIGNER)
    wethBalance = await wethContract.balanceOf(SIGNER)
    usdcBalance = await usdcContract.balanceOf(SIGNER)
    console.log('---------------------------- AFTER')
    console.log('ethBalance', HARDHAT.ethers.utils.formatUnits(ethBalance, 18))
    console.log('wethBalance', HARDHAT.ethers.utils.formatUnits(wethBalance, 18))
    console.log('usdcBalance', HARDHAT.ethers.utils.formatUnits(usdcBalance, 6))
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
