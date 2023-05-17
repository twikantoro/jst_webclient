const api = 'http://localhost:5000'
const urlParams = new URLSearchParams(window.location.search)
const model_id = urlParams.get('id')

var detail_model = {
    id: model_id,
    nama: '',
    susunan: [],
    latih_mulai: '',
    latih_akhir: '',
    latih_london: 0,
    uji_mulai: '',
    uji_akhir: '',
    uji_london: 0,
}

epochs = 0

function month_to_duration(start, end) {
    let y_end = parseInt(end.substr(0, 4))
    let y_start = parseInt(start.substr(0, 4))
    let m_end = parseInt(end.substr(5, 2))
    let m_start = parseInt(start.substr(5, 2))
    years = y_end - y_start
    months = m_end - m_start
    return years * 12 + months + 1
}
function request_model_data() {
    axios.post(api + '/get_model', { id: model_id }).then(function (response) {
        data = response.data[0]
        detail_model = {
            id: data[0],
            nama: data[1],
            susunan: data[8],
            latih_mulai: data[2],
            latih_akhir: data[3],
            latih_london: data[4],
            uji_mulai: data[5],
            uji_akhir: data[6],
            uji_london: data[7],
        }
        $('#nama').text(data[1])
        $('#data_latih').text(data[2] + ' s.d. ' + data[3] +
            (data[4] == 1 ? ' London' : '') +
            ` (${month_to_duration(data[2], data[3])} bulan)`)
        $('#data_uji').text(data[5] + ' s.d. ' + data[6] +
            (data[7] == 1 ? ' London' : '') +
            ` (${month_to_duration(data[5], data[6])} bulan)`)
        $('#susunan_neuron').text(data[8])
        load_model()
    })
}

const socket = io('ws://localhost:5000')
status = 'memuat JST...'

socket.on('connect', (...args) => {
    console.log('connected to socket server')
    setStatus('Terkoneksi')
    if(detail_model.susunan.length>0){
        load_model()
    }
})

socket.on('disconnect', (...args) => {
    console.log('connection to socket server lost')
    setTimeout(() => {
        setStatus('koneksi ke server terputus...')
        set_button_status(false)
    }, 3000)

})

request_model_data()
request_iterations()

socket.on('jst_readyness', (data) => {
    set_button_status(data)
})

socket.on('status', (data) => {
    console.log('status update:', data)
    setStatus(data)
})

socket.on('iterations', (data) => {
    let jml = data.length
    epochs = jml
    $('#jml_iterasi').text(jml)
    console.log('update iterasi', data)
    update_chart(data)

    $('#loss').text(data[jml-1][5])
    $('#akurasi').text(data[jml-1][6])
})

function load_model() {
    setStatus('Loading model...')
    console.log("minta loading model")
    socket.emit('load_model', detail_model)
}

function request_iterations() {
    $('iterasi').text('loading...')
    socket.emit('request_iterations', detail_model)
}

function setStatus(status) {
    $('#status').text(status)
}

// button handlers
function train() {
    set_button_status(false)
    setStatus('Melatih 1 epoch...')
    socket.emit('train_model', { id: detail_model.id, epoch: epochs, nama: detail_model.nama })
}

//others
function set_button_status(inp){
    if (inp) {
        $('#btn_train').removeAttr('disabled')
        $('#btn_revert').removeAttr('disabled')
    } else {
        console.log('disabling it')
        document.getElementById("btn_train").setAttribute("disabled", ""); 
        document.getElementById("btn_revert").setAttribute("disabled", ""); 
    }
}