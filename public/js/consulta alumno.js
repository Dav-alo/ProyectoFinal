const HTTTPMethods = {
    "put": "PUT",
    "post": "POST",
    "get": "GET",
    "delete": "DELETE"
}
const APIURL = window.location.protocol + '//' + window.location.host + '/api';
let TOKEN = getTokenValue('token');
let PAGES = {
    current: 1,
    currentIndex: 0,
};
let NAME_FILTER = '';

function getTokenValue(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function sendHTTPRequest(urlAPI, data, method, cbOK, cbError, ) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open(method, urlAPI);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(TOKEN);
    xhr.setRequestHeader('x-auth-user', TOKEN);
    // 4. Enviar solicitud al servidor
    xhr.send(data);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP 
            // Ocurrió un error
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            cbError(xhr.status + ': ' + xhr.statusText);
        } else {
            // console.log(xhr.responseText); // Significa que fue exitoso
            cbOK({
                status: xhr.status,
                data: xhr.responseText
            });
        }
    };
}



const userToHTML = (user) => {
    return `
    <div class="media col-8 mt-2">
        <div class="media-body">
                <h4>${user.nombre} ${user.apellidos}</h4>
                <p >Correo: ${user.email}</p>
            </div>
        <div class="media-right align-self-center">
            <div class="row">
                <div class="btn btn-primary" data-user='${JSON.stringify(user)}' > <a class="text-white" href="detalle.html?email=${user.email}"><i class="fas fa-search"></i></a></div>
            </div>
            <div class="row">
                <div class="btn btn-primary "data-user='${JSON.stringify(user)}' data-toggle="modal" data-target="#updateFormModal"><i class="fas fa-pencil-alt edit"></i></div>
            </div>
            <div class="row">
                <div class="btn btn-primary mt-2" data-toggle="modal" data-target="#deleteFormModal"  data-email="${user.email}"><i class="fas fa-trash-alt remove "></i></div>
            </div>
        </div>
    </div>`
}
const userListToHTML = (list, id) => {
    if (id && list && document.getElementById(id)) {
        document.getElementById(id).innerHTML = list.map(userToHTML).join('');
    }
}


function updateUser(ele) {
    console.log('updateUser');
    //agrega el códgio necesario...
}

function deleteUser(ele) {
    console.log('deleteUser');
    console.log(ele.getAttribute('data-email'));
    //agrega el códgio necesario...

}

function getUsersPage(page, filter) {
    let nfilter = (filter) ? `${filter}` : '';
    let url = APIURL + "/users?page=" + page + "&limit=3" + nfilter;
    //agrega el códgio necesario...
}
document.addEventListener('DOMContentLoaded', () => {
    getUsersPage(1, NAME_FILTER);

    let filterInput = document.getElementById('filterInput');
    filterInput.addEventListener('change', (e) => {
        NAME_FILTER = `&name=${e.target.value}`;
        getUsersPage(PAGES.current, NAME_FILTER);
    })

    $('#deleteFormModal').on('show.bs.modal', function (event) {
        // console.log(event.relatedTarget);
        //agrega el códgio necesario...
    });

    $('#updateFormModal').on('show.bs.modal', function (event) {
        // console.log(event.relatedTarget);
        let user = JSON.parse(event.relatedTarget.getAttribute('data-user'));
        //agrega el códgio necesario...
    });
});