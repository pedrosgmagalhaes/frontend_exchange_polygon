import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the Uniswap API URL (modify this to the correct URL)
const UNISWAP_API_URL = 'https://api.uniswap.org/v2/swap';

async function makeUniswapSwapRequest(tokenIn, tokenOut, amountIn) {
  try {
    const response = await axios.post(
      UNISWAP_API_URL,
      {
        tokenIn,
        tokenOut,
        amountIn,
      },
      {
        headers: {
          'X-API-KEY': 'YOUR_API_KEY', // replace with your actual API key
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error making Uniswap Swap Request', error);
    throw error;
  }
}

function App() {
  // State to hold the response from the Uniswap API
  const [swapResponse, setSwapResponse] = useState(null);

  useEffect(() => {
    // Define the tokens and amount for the swap
    const tokenIn = 'WMATIC';
    const tokenOut = 'USDC';
    const amountIn = 100;

    // Make the Uniswap API request and update the state with the response
    makeUniswapSwapRequest(tokenIn, tokenOut, amountIn)
      .then(response => {
        console.log(response);
        setSwapResponse(response);
      })
      .catch(error => {
        console.error('Error making swap request', error);
      });
  }, []);

  return (
    <div>
      {swapResponse ? (
        <>
          <div>Transaction Hash: {swapResponse.txHash}</div>
          <div>Amount Out: {swapResponse.amountOut}</div>
          <div>Slippage: {swapResponse.slippage}</div>
        </>
      ) : (
        <div>Loading swap data...</div>
      )}
    </div>
  );
}

export default App;
