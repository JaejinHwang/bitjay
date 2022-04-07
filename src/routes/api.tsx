export const fetchAllCoins = () => {
    return fetch("https://api.coinpaprika.com/v1/coins").then(response => response.json());
}

export const fetchCoinInfo = (coinId: string) => {
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then(response => response.json());
}

export const fetchCoinTickers = (coinId: string) => {
    return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then(response => response.json());
}

export const fetchCoinHistoricalPrice = (coinId: string) => {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 7 * 2;
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then(response => response.json());
}