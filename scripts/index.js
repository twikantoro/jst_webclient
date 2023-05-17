api = 'http://localhost:5000'
no_of_rows = 0
request_data()
function append_row(data) {
    no_of_rows++;
    row = '<tr>'
    row += `<td>${no_of_rows}</td>`
    row += `<td><a href="/latih.html?id=${data[0]}">${data[1]}</a></td>`
    row += '<td>' + data[2] + ' s.d. ' + data[3] +
        (data[4] == 1 ? ' London' : '') +
        ` (<b>${month_to_duration(data[2], data[3])} bulan</b>)` + '</td>'
    row += '<td>' + data[5] + ' s.d. ' + data[6] +
        (data[7] == 1 ? ' London' : '') +
        ` (<b>${month_to_duration(data[5], data[6])} bulan</b>)` + '</td>'
    row += `<td>${data[8]}</td>`
    row += `<td>${data[9] ? data[9] : '-'}</td>`
    row += `<td>${data[10] ? data[10] : '-'}</td>`
    row += `<td><a href="/latih.html?id=${data[0]}"><i class="fas fa-wand-magic-sparkles"></i></a>&nbsp;`
    row += `<a onclick="delete_model(${data[0]},'${data[1]}')" href="#"><i class="fas fa-trash-alt"></i></a></td>`
    row += '</tr>'
    $('#tabel_list_jst').append(row)
}
function delete_model(id, nama) {
    if (confirm(`Hapus model "${nama}"?`)) {
        axios.post(api + '/delete_model', { id: id }).then(function (response) {
            location.reload()
        })
    }
}
function request_data() {
    axios.get(api + '/get_models_all').then(function (response) {
        rows = response.data
        for (let row of rows) {
            append_row(row)
        }
    });
}
function month_to_duration(start, end) {
    let y_end = parseInt(end.substr(0, 4))
    let y_start = parseInt(start.substr(0, 4))
    let m_end = parseInt(end.substr(5, 2))
    let m_start = parseInt(start.substr(5, 2))
    years = y_end - y_start
    months = m_end - m_start
    return years * 12 + months + 1
}