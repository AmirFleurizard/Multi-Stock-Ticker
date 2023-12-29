/**
 * Gets symbols from params passed in get request
 */
function getSymbols() {
    const symbols = window.location.search.substring(1).split('&').map(str => str.substring(0, str.length - 3));
    return symbols;
}

/**
 * Gets symbol data using the getPriceData method which queries the third party api
 */
async function getSymbolData(symbols) {
    const data = await getPriceData(symbols);
    return data;
}

function updateGraph(data) {
    console.log(data)
}

async function renderPage() {
    /*** Get data ***/
    const symbols = getSymbols();
    if(symbols.length === 0) return;
    const data = await getSymbolData(symbols);
    updateGraph(data);

    /*** Format data ***/
    const datasets = data.map(d => {
        return {
            label: d.symbol,
            data: d.filtered.close_price,
            fill: false,
            borderColor: getRandomColor(),
            tension: 0
        }
    })

    const labels = data[0].filtered.timestamp.map(timestamp => {
        return timestampToDate(timestamp);
    })

    /*** Create graph ***/
    const ctx = document.getElementById('priceGraph').getContext('2d');
    const priceGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Multi-stock Price Graph'
                }
            }
        },
    });
}

renderPage();
