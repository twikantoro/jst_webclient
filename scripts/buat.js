//window.location.href = site+'/buat.html?#'

site = 'http://localhost:5500'
api = 'http://localhost:5000'
jumlah_layer = 1
loadingAnimation(250)
function loadingAnimation(delay) {
    $('#loading').text('.')
    setTimeout(function () {
        $('#loading').text('..')
    }, delay)
    setTimeout(function () {
        $('#loading').text('...')
    }, delay * 2)
    setTimeout(function () {
        loadingAnimation(delay)
    }, delay * 3)
}
function tambahLayer() {
    jumlah_layer++;
    evacuateOutputLayer()
    $('#additional_layer_head').append(`<th>L. Hidden ${jumlah_layer}</th>`)
    $('#additional_layer_input').append(`<td><input id="inp_layer_${jumlah_layer}" type="number" placeholder="Jumlah Neuron" class="inp_neurons"></td>`)
    spawnOutputLayer()
}
function kurangiLayer() {
    if (jumlah_layer <= 1) {
        return
    }
    jumlah_layer--;
    evacuateOutputLayer()
    $('#additional_layer_head').children().last().remove()
    $('#additional_layer_input').children().last().remove()
    spawnOutputLayer()
}
function evacuateOutputLayer() {
    $('#additional_layer_head').children().last().remove()
    $('#additional_layer_input').children().last().remove()
}
function spawnOutputLayer() {
    $('#additional_layer_head').append("<th>L. Output</th>")
    $('#additional_layer_input').append('<td><input disabled type="text" value="2"></td>')
}
checked_latih_london = false
function change_latih_london() {
    if (!checked_latih_london) {
        $('#latih_london').val('1')
    } else {
        $('#latih_london').val('0')
    }
    checked_latih_london = !checked_latih_london
}
checked_uji_london = false
function change_uji_london() {
    if (!checked_uji_london) {
        $('#uji_london').val('1')
    } else {
        $('#uji_london').val('0')
    }
    checked_uji_london = !checked_uji_london
}
function submitForm() {
    $('#loading').show()
    $('#buttons').hide()

    neurons = []
    for(let i=1;i<=jumlah_layer;i++){
        neurons.push(parseInt($(`#inp_layer_${i}`).val()))
    }
    //console.log(neurons)

    data = {
        nama: $('#nama_model').val(),
        latih_mulai: $('#latih_mulai').val(),
        latih_akhir: $('#latih_akhir').val(),
        latih_london: $('#latih_london').val(),
        uji_mulai: $('#uji_mulai').val(),
        uji_akhir: $('#uji_akhir').val(),
        uji_london: $('#uji_london').val(),
        neurons: neurons
    }

    console.log(data)

    //API
    axios.post(api+'/create_model',data).then(function(response){
        console.log(response)
        window.location.href = site+'/latih.html?id='+response.data
    })
}