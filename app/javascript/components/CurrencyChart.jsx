import React, { useEffect, useRef } from 'react';

import { Chart } from 'chart.js/auto';




const CurrencyChart = ({ data }) => {

  const chartRef = useRef(null);

  const chartInstanceRef = useRef(null);




  useEffect(() => {

    const ctx = chartRef.current.getContext('2d');




    if (chartInstanceRef.current) {

      // Destroy previous chart instance

      chartInstanceRef.current.destroy();

    }




    const currentDate = new Date().toISOString().split('T')[0];

    const tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);

    const tomorrowDate = tomorrow.toISOString().split('T')[0];




    // Create the chart

    const newChartInstance = new Chart(ctx, {

      type: 'line',

      data: {

        labels: [currentDate, tomorrowDate],

        datasets: [

          {

            label: 'Exchange Rate',

            data: data.map((item) => item.rate),

            backgroundColor: 'rgba(75, 192, 192, 0.2)',

            borderColor: 'rgba(75, 192, 192, 1)',

            borderWidth: 1,

          },

        ],

      },

      options: {

        scales: {

          y: {

            beginAtZero: true,

          },

        },

      },

    });




    // Store the chart instance for future reference

    chartInstanceRef.current = newChartInstance;

  }, [data]);




  return <canvas ref={chartRef} />;

};




export default CurrencyChart;