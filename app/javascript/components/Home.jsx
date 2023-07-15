import React, { useState, useEffect } from 'react';
import CurrencyChart from './CurrencyChart';
import axios from 'axios';
import Download from './Download';




const Home = () => {
    const [currencies, setCurrencies] = useState([]);
    const [baseCurrency, setBaseCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState('');
    const [date, setDate] = useState("");
    const [time, setTime] = useState();

    useEffect(() => {
        axios.get('https://api.exchangerate-api.com/v4/latest/USD')

            .then(response => {
                const data = response.data;
                const currencyCodes = Object.keys(data.rates);
                setCurrencies(currencyCodes);
                setBaseCurrency('USD');
                setTargetCurrency(currencyCodes[0]);
                setDate(data.date);
                const timestamp = data.time_last_updated;
                const updatedTime = new Date(timestamp * 1000).toLocaleTimeString();
                setTime(updatedTime);
            })

            .catch(error => {
                console.log('Error fetching currency data:', error);
            });
    }, []);



    useEffect(() => {
        convertCurrency();
    }, [baseCurrency, targetCurrency, amount]);

    const convertCurrency = () => {
        if (baseCurrency === targetCurrency) {
            setResult(amount);
        } else {
            axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
                .then(response => {
                    const data = response.data;
                    const exchangeRate = data.rates[targetCurrency];
                    setResult(amount * exchangeRate);
                })
                .catch(error => {
                    console.log('Error fetching exchange rate:', error);
                });
        }

    };

    const currencyData = [
        { date: '2023-07-01', rate: 1.2 },
        { date: '2023-07-02', rate: 1.5 },
        { date: '2023-07-03', rate: 1.8 },
    ];
    return (
        <div>
            <div className="primary-color container-fluid" style={{ backgroundColor: "#ccccff" }}>
                <div className='text-center'>
                    <h1 className="display-3">Currency Convertor</h1>
                    <p className="lead">
                        Check your valuable currency conversion
                    </p>
                </div>
                <div class="text-center card w-25 rounded-4 DualSafe-animated-fill" style={{ backgroundColor: "#ccccff" }}>
                    <h5 className='mt-2'> {date} <span>{time}</span></h5>
                </div>

                <div className="jumbotron bg-transparent mt-5">
                    <div className='row'>
                        <div className='col-md-6 mt-3 pt-3 ' >
                            {result && (
                                <div className='card w-75 text-center h-auto shadow-lg p-3 rounded-5 ' style={{ background: "#0dcaf0" }}>
                                    <h2>Result:</h2>
                                    <h4>{amount} {baseCurrency} = {result} {targetCurrency}</h4>
                                </div>
                            )}
                        </div>

                        <div class="col-md-6">
                            <div class="card bg-primary-subtle shadow p-3 rounded-5 " style={{ borderRadius: "20px", marginLeft: "10px", marginTop: "10px" }} >
                                <div >
                                    <div class="form-group mt-5" style={{ marginLeft: "20px", marginRight: "20px" }} >

                                        <label for="amount">Amount:</label>
                                        <input id="amount" type="number" class="form-control" value={amount} onChange={e => setAmount(e.target.value)} />

                                        <label for="base-currency">From :</label>
                                        <select id="base-currency" class="form-control" value={baseCurrency} onChange={e => setBaseCurrency(e.target.value)}>
                                            {currencies.map(currency => (
                                                <option key={currency} value={currency}>{currency}</option>
                                            ))}
                                        </select>
                                        <div class="form-group">
                                            <label for="target-currency">To :</label>
                                            <select id="target-currency" class="form-control" value={targetCurrency} onChange={e => setTargetCurrency(e.target.value)}>
                                                {currencies.map(currency => (
                                                    <option key={currency} value={currency}>{currency}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <button className='btn btn btn mt-4' style={{ marginLeft: "10px" }}><Download /></button>
                                 
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                
                <div className='row mt-5'>
                    <div className='col-md-2 mt-5'></div>
                    <div className='col-md-10 text-center w-75'>
                        <CurrencyChart data={currencyData} />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;