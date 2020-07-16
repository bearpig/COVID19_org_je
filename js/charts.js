(function (){
    main();
    
    window.addEventListener('resize', () => {
        main();
    });

    function main(){
        let {width, height} = getWidthHeight();

        document.querySelectorAll(".covidCharts canvas").forEach(function(canvas) {
            canvas.setAttribute("width", width / 2 - 10);
        });

        axios.get("https://data.openrock.xyz/feeds/covid19full")
            .then((response) => {
                let tests = response.data.data[0].COVID19.reverse();

                drawNegativeResults(tests);
                drawConfirmedCases(tests);
                drawPendingResults(tests);
                drawActiveCases(tests);
                drawRecovered(tests);
                drawDeaths(tests);
            });
    }

    function getDataAndLabels(tests, dataAccessor){
        let data = tests.map(dataAccessor);
        let labels = tests.map((item) => formatDate(item.Date));

        return {data, labels};
    }
    
    function drawConfirmedCases(tests){
        let {data, labels} = getDataAndLabels(tests, (item) => item.Confirmedcases)

        drawChart('confirmedCases', data, labels, "Confirmed Cases", "#da3849");
    }

    function drawNegativeResults(tests){
        let {data, labels} = getDataAndLabels(tests, (item) => item.Negativetests)

        drawChart('negativeTests', data, labels, "Negative Results", "#30a64a");
    }

    function drawPendingResults(tests){
        let {data, labels} = getDataAndLabels(tests, (item) => item.Pendingresults)

        drawChart('pendingResults', data, labels, "Pending Results", "#fec02f");
    }

    function drawActiveCases(tests){
        let {data, labels} = getDataAndLabels(tests, (item) => item.KnownActiveCases)

        drawChart('knownActiveCases', data, labels, "Active Cases", "#585958");
    }

    function drawRecovered(tests){
        let {data, labels} = getDataAndLabels(tests, (item) => item.Recovered)

        drawChart('recovered', data, labels, "Recovered", "#56cdee");
    }

    function drawDeaths(tests){
        let {data, labels} = getDataAndLabels(tests, (item) => item.Deaths)

        drawChart('deaths', data, labels, "Deaths", "#000000");
    }

    function drawChart(canvasId, data, labels, label, color){
        var ctx = document.getElementById(canvasId);
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    fill: false,
                    data: data,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1,
                    pointRadius: 1
                }]
            },
            options: {
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                }
            }
        });
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [day, month].join('/');
    }

    function getWidthHeight(){
        return document.querySelector(".covidCharts").getBoundingClientRect();
    }
})();
