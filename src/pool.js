require("dotenv").config();
const { Pool, nearestUsableTick, TickMath, TICK_SPACINGS } = require('@uniswap/v3-sdk')
const IUniswapV3Pool = require('@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json')
const JSBI = require('jsbi')

const HARDHAT = require("hardhat");
const PROVIDER = HARDHAT.ethers.provider;

async function getPool(tokenA, tokenB, feeAmount) {
    // console.log("Pool.getAddress(",tokenA, tokenB, feeAmount,")")
    const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

    const poolAddress = Pool.getAddress(token0, token1, feeAmount)

    // console.log("****poolAddress = \n", poolAddress)
    // console.log("****IUniswapV3Pool.abi = \n", IUniswapV3Pool.abi)
    // console.log("****PROVIDER = \n", JSON.stringify(PROVIDER, null, 2))

    const contract = new HARDHAT.ethers.Contract(poolAddress, IUniswapV3Pool.abi, PROVIDER)

    // console.log("contract = ", JSON.stringify(contract, null, 2))
    // console.log("contract.liquidity() = \n", await contract.liquidity())
    // console.log("contract.liquidity() = \n", JSON.stringify(await contract.liquidity, null, 2))
    let liquidity = await contract.liquidity()

    let { sqrtPriceX96, tick } = await contract.slot0()

    liquidity = JSBI.BigInt(liquidity.toString())
    sqrtPriceX96 = JSBI.BigInt(sqrtPriceX96.toString())

    // console.log("token0", "token0", token0, "token1", token1, "feeAmount", feeAmount, "sqrtPriceX96", sqrtPriceX96, "liquidity", liquidity, "tick", tick)

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

// modules.exports = {
//     getPool,
// }
