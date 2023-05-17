const ctx = document.getElementById('myChart');

theChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'loss latih',
            data: [],
            borderWidth: 1,
            borderDash: [3, 3],
            //backgroundColor: 'orange',
            borderColor: 'blue',
            pointRadius: 0
        },
        {
            label: 'akurasi latih',
            data: [],
            borderWidth: 1,
            backgroundColor: 'blue',
            borderColor: 'blue',
            pointRadius: 0
        },
        {
            label: 'loss uji',
            data: [],
            borderWidth: 1,
            borderDash: [3, 3],
            //backgroundColor: 'blue',
            borderColor: 'orange',
            pointRadius: 0
        },
        {
            label: 'akurasi uji',
            data: [],
            borderWidth: 1,
            backgroundColor: 'orange',
            borderColor: 'orange',
            pointRadius: 0
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

function update_chart(data) {
    d_label = []
    d_loss_latih = []
    d_akurasi_latih = []
    d_loss_uji = []
    d_akurasi_uji = []
    for (let [i,row] of data.entries()) {
        d_label.push(i+1)
        d_loss_latih.push(row[3])
        d_akurasi_latih.push(row[4])
        d_loss_uji.push(row[5])
        d_akurasi_uji.push(row[6])
    }
    theChart.data.labels = d_label
    theChart.data.datasets[0].data = d_loss_latih
    theChart.data.datasets[1].data = d_akurasi_latih
    theChart.data.datasets[2].data = d_loss_uji
    theChart.data.datasets[3].data = d_akurasi_uji
    console.log('updating chart. data', data)
    theChart.update()
    console.log(theChart)
}