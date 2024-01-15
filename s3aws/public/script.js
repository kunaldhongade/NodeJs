$(document).ready(() => {
    fetchFiles()
})

function fetchFiles() {

    $.ajax({
        url: '/files',
        method: 'GET',
        success: (data) => {
            $('#fileTableBody').empty()
            data.forEach((file) => {
                var row = '<tr>'+'<td>'+file.name+'</td>'+''
            })
        },
    })
}