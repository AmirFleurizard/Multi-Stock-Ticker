const secondsInMinute = 60;
const minutesInHour = 60;
const hoursInDay = 24;
const daysInYear = 365;
const secondsInYear = secondsInMinute * minutesInHour * hoursInDay * daysInYear;
const sandboxToken = 'sandbox_c228rpaad3id53vujt6g';
const prodToken = 'c228rpaad3id53vujt60';

/**
 * 
 * @param {Array[String]} symbols : ["gme","tsla"]
 * 
 * @returns {Array[Symbols]} : [{
 *                                  symbol: "gme",
 *                                  filtered: {
 *                                      close_price: [],
 *                                      timestamp: []
 *                                  },
 *                                  raw: { . . . }
 *                              },{
 *                                  symbol: "tsla",
 *                                  filtered: {
 *                                      close_price: [],
 *                                      timestamp: []
 *                                  },
 *                                  raw: { . . . }
 *                              }]
 */

/* usage: 
    var price_data = await getPriceData(['gme','tsla'])
*/

async function getPriceData(symbols){
    const baseURL = 'https://finnhub.io/api/v1/stock/candle?';
    const endTime = Math.round(Date.now()/1000);
    const startTime = endTime - secondsInYear;
    const token = prodToken;
    const resolution = 'D';

    const data = [];
    for( i = 0; i < symbols.length; i++){
        const symbol = symbols[i];
        console.log(symbol);
        console.log(`${baseURL}symbol=${symbol}&resolution=${resolution}&from=${startTime}&to=${endTime}&token=${token}`);
        const fullUrl = `${baseURL}symbol=${symbol}&resolution=${resolution}&from=${startTime}&to=${endTime}&token=${token}`;
        res = await fetch(fullUrl).then(res => res.json())//.then(data => console.log(data))
        data.push({
            'symbol': symbol,
            'filtered' : {
                'close_price' : res.c,
                'timestamp' : res.t
            },
            'raw': res
        });
    }
    return data;
}