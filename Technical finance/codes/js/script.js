document.getElementById('financial-form').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateRatios();
});

function calculateRatios() {
    const currentAssets = parseFloat(document.getElementById('currentAssets').value);
    const currentLiabilities = parseFloat(document.getElementById('currentLiabilities').value);
    const totalAssets = parseFloat(document.getElementById('totalAssets').value);
    const totalLiabilities = parseFloat(document.getElementById('totalLiabilities').value);
    const totalEquity = parseFloat(document.getElementById('totalEquity').value);
    const netIncome = parseFloat(document.getElementById('netIncome').value);
    const inventory = parseFloat(document.getElementById('inventory').value);

    const currentRatio = currentAssets / currentLiabilities;
    const quickRatio = (currentAssets - inventory) / currentLiabilities;
    const debtToEquityRatio = totalLiabilities / totalEquity;
    const roeRatio = netIncome / totalEquity;

    displayResults({ currentRatio, quickRatio, debtToEquityRatio, roeRatio });
}

function displayResults(ratios) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p>Current Ratio: ${ratios.currentRatio.toFixed(2)}</p>
        <p>Quick Ratio: ${ratios.quickRatio.toFixed(2)}</p>
        <p>Debt-to-Equity Ratio: ${ratios.debtToEquityRatio.toFixed(2)}</p>
        <p>Return on Equity (ROE): ${ratios.roeRatio.toFixed(2)}</p>
        <canvas id="pieChart" width="400" height="400"></canvas>
        <p>${getVerdict(ratios)}</p>
    `;
    
    // Create a pie chart
    const pieChartCanvas = document.getElementById('pieChart').getContext('2d');
    new Chart(pieChartCanvas, {
        type: 'pie',
        data: {
            labels: ['Current Ratio', 'Quick Ratio', 'Debt-to-Equity Ratio', 'ROE Ratio'],
            datasets: [{
                label: 'Ratio Contribution',
                data: [ratios.currentRatio, ratios.quickRatio, ratios.debtToEquityRatio, ratios.roeRatio],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false
        }
    });
}


function getVerdict(ratios) {
    let verdict = 'Company Health: ';
    if (ratios.currentRatio > 1.5 && ratios.debtToEquityRatio < 0.5) {
        verdict += 'The company shows strong liquidity and low leverage, indicating a healthy financial position.';
    } else if (ratios.currentRatio > 1 && ratios.debtToEquityRatio < 1) {
        verdict += 'The company has moderate liquidity and leverage, suggesting a stable financial condition.';
    } else {
        verdict += 'The company has liquidity or leverage issues, indicating a risky financial position.';
    }
    return verdict;
}


function calculateValues() {
    const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const years = parseFloat(document.getElementById('years').value);
    const cashInflow = parseFloat(document.getElementById('cashInflow').value);

    const futureValue = calculateFutureValue(investmentAmount, interestRate, years);
    const presentValue = calculatePresentValue(investmentAmount, interestRate, years);
    const npv = calculateNPV(investmentAmount, cashInflow, interestRate, years);
    const fpv = calculateFPV(investmentAmount, cashInflow, interestRate, years);

    displayInvestmentResults(futureValue, presentValue, npv, fpv);
}

function calculateFutureValue(principal, interestRate, years) {
    return principal * Math.pow(1 + interestRate, years);
}

function calculatePresentValue(principal, interestRate, years) {
    return principal / Math.pow(1 + interestRate, years);
}

function calculateNPV(investmentAmount, cashInflow, interestRate, years) {
    let npv = -investmentAmount;
    for (let i = 1; i <= years; i++) {
        npv += cashInflow / Math.pow(1 + interestRate, i);
    }
    return npv;
}

function calculateFPV(investmentAmount, cashInflow, interestRate, years) {
    const futureValue = calculateFutureValue(investmentAmount, interestRate, years);
    const futureCashInflow = cashInflow * ((Math.pow(1 + interestRate, years) - 1) / interestRate);
    return futureValue + futureCashInflow;
}

function displayInvestmentResults(futureValue, presentValue, npv, fpv) {
    const resultsDiv = document.getElementById('investment-results');
    resultsDiv.innerHTML = `
        <p>Future Value: ${futureValue.toFixed(2)}</p>
        <p>Net Present Value: ${npv.toFixed(2)}</p>
        <p>Final Payoff Value: ${fpv.toFixed(2)}</p>
        <p>Present Value: ${presentValue.toFixed(2)}</p>
    `;
    
    const pieChartData = {
        labels: ['Future Value', 'Net Present Value', 'Final Payoff Value', 'Present Value'],
        datasets: [{
            label: 'Investment Results',
            data: [futureValue, npv, fpv, presentValue],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', 
                'rgba(54, 162, 235, 0.2)', 
                'rgba(255, 206, 86, 0.2)', 
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    };

    const pieChartCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieChartCtx, {
        type: 'pie',
        data: pieChartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Investment Analysis Results'
                }
            }
        }
    });
}

function analyzeStockData() {
    const dataInput = document.getElementById('dataInput').value;
    const stockPrices = dataInput.split(',').map(Number);

    const mean = calculateMean(stockPrices);
    const median = calculateMedian(stockPrices);
    const mode = calculateMode(stockPrices);
    const standardDeviation = calculateStandardDeviation(stockPrices);
    const variance = calculateVariance(stockPrices);
    const min = Math.min(...stockPrices);
    const max = Math.max(...stockPrices);
    const range = max - min;
    const percentiles = calculatePercentiles(stockPrices);
    const movingAverage = calculateMovingAverage(stockPrices, 5); // Example: 5-day moving average
    const volatility = calculateVolatility(stockPrices);

    displayStatistics(mean, median, mode, standardDeviation, variance, min, max, range, percentiles, movingAverage, volatility);
    visualizeStockData(stockPrices, movingAverage);
}

function calculateMean(data) {
    const sum = data.reduce((a, b) => a + b, 0);
    return sum / data.length;
}

function calculateMedian(data) {
    const sortedData = data.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedData.length / 2);

    if (sortedData.length % 2 === 0) {
        return (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2;
    } else {
        return sortedData[middleIndex];
    }
}

function calculateMode(data) {
    const frequency = {};
    data.forEach(value => {
        if (frequency[value]) {
            frequency[value]++;
        } else {
            frequency[value] = 1;
        }
    });

    let maxFrequency = 0;
    let modes = [];
    for (const key in frequency) {
        if (frequency[key] > maxFrequency) {
            maxFrequency = frequency[key];
            modes = [Number(key)];
        } else if (frequency[key] === maxFrequency) {
            modes.push(Number(key));
        }
    }

    return modes;
}

function calculateStandardDeviation(data) {
    const mean = calculateMean(data);
    const squaredDifferences = data.map(value => Math.pow(value - mean, 2));
    const averageSquareDifference = calculateMean(squaredDifferences);
    return Math.sqrt(averageSquareDifference);
}

function calculateVariance(data) {
    const mean = calculateMean(data);
    const squaredDifferences = data.map(value => Math.pow(value - mean, 2));
    return calculateMean(squaredDifferences);
}

function calculatePercentiles(data) {
    const sortedData = data.slice().sort((a, b) => a - b);
    const q1 = sortedData[Math.floor(sortedData.length * 0.25)];
    const q2 = calculateMedian(data);
    const q3 = sortedData[Math.floor(sortedData.length * 0.75)];
    return { q1, q2, q3 };
}

function calculateMovingAverage(data, period) {
    const movingAverage = [];
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            movingAverage.push(null);
        } else {
            const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
            movingAverage.push(sum / period);
        }
    }
    return movingAverage;
}

function calculateVolatility(data) {
    const logReturns = data.slice(1).map((price, i) => Math.log(price / data[i]));
    const standardDeviation = calculateStandardDeviation(logReturns);
    return standardDeviation * Math.sqrt(252); // Annualize the volatility assuming 252 trading days
}

function displayStatistics(mean, median, mode, standardDeviation, variance, min, max, range, percentiles, movingAverage, volatility) {
    const statisticsDiv = document.getElementById('statistics');
    statisticsDiv.innerHTML = `
        <p>Mean: ${mean.toFixed(2)}</p>
        <p>Median: ${median.toFixed(2)}</p>
        <p>Mode: ${mode.join(', ')}</p>
        <p>Standard Deviation: ${standardDeviation.toFixed(2)}</p>
        <p>Variance: ${variance.toFixed(2)}</p>
        <p>Min: ${min.toFixed(2)}</p>
        <p>Max: ${max.toFixed(2)}</p>
        <p>Range: ${range.toFixed(2)}</p>
        <p>Q1: ${percentiles.q1.toFixed(2)}</p>
        <p>Q2 (Median): ${percentiles.q2.toFixed(2)}</p>
        <p>Q3: ${percentiles.q3.toFixed(2)}</p>
        <p>Volatility: ${volatility.toFixed(2)}</p>
        <p>5-Day Moving Average: ${movingAverage.filter(val => val !== null).map(val => val.toFixed(2)).join(', ')}</p>
    `;
}

function visualizeStockData(dataArray, movingAverage) {
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    const ctxHistogram = document.getElementById('histogramChart').getContext('2d');

    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: dataArray.map((_, i) => i + 1),
            datasets: [
                {
                    label: 'Stock Prices',
                    data: dataArray,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: '5-Day Moving Average',
                    data: movingAverage,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const histogramData = {
        labels: [...new Set(dataArray)],
        datasets: [{
            data: [...new Set(dataArray)].map(val => dataArray.filter(v => v === val).length),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    new Chart(ctxHistogram, {
        type: 'bar',
        data: histogramData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}