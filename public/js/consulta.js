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
    let eles = document.getElementById('updateFormModal').getElementsByTagName('input');
    let user = {
        email: ele.getAttribute('data-email')
    };
    for (let i = 0; i < eles.length; i++) {
        console.log(eles[i].getAttribute('type'));
        if (eles[i].value === '') continue;
        if (eles[i].getAttribute('type') === 'text') {
            user[eles[i].getAttribute('name')] = eles[i].value;
        }
        if (eles[i].getAttribute('type') === 'password') {
            user[eles[i].getAttribute('name')] = eles[i].value;
        }
        if (eles[i].getAttribute('type') === 'date') {
            user[eles[i].getAttribute('name')] = eles[i].value;
        }
        if (eles[i].getAttribute('type') === 'url') {
            user[eles[i].getAttribute('name')] = eles[i].value;
        }
    }
    let url = APIURL + "/users/" + user.email;
    sendHTTPRequest(url, JSON.stringify(user), HTTTPMethods.put, (data) => {
        getUsersPage(PAGES.current);
    }, (error) => {

    })

}

function deleteUser(ele) {
    console.log('deleteUser');
    console.log(ele.getAttribute('data-email'));
    let email = ele.getAttribute('data-email');
    let url = APIURL + "/users/" + email;
    sendHTTPRequest(url, null, HTTTPMethods.delete, (data) => {
        getUsersPage(PAGES.current);
    }, (error) => {

    })

}

function getUsersPage(page, filter) {
    let nfilter = (filter) ? `${filter}` : '';
    let url = APIURL + "/users?page=" + page + "&limit=3" + nfilter;
    sendHTTPRequest(url, null, HTTTPMethods.get, (data) => {
        let users = JSON.parse(data.data);
        console.log(users);
        // updatePagePointer(users.totalPages,page);
        updatePaginationHTML(users.totalPages, page, nfilter);
        userListToHTML(users.content, 'lista');
    }, (error) => {

    })
}

function updatePaginationHTML(totalPages, currentPage, nameFilter) {
    let content = '';
    let currentPageLbl = currentPage + 1;
    console.log(`CurrentPage: ${currentPage} CurrentLBL: ${currentPageLbl}  Total:${totalPages}`);
    if (totalPages <= 1)
        content = `
            <li class="page-item disabled" ><a class="page-link" href="#">Previous</a></li>
            <li class="page-item  disabled"><a class="page-link  " href="#">1</a></li>
            <li class="page-item disabled"><a class="page-link" href="#">2</a></li>
            <li class="page-item disabled"><a class="page-link" href="#">3</a></li>
            <li class="page-item disabled"><a class="page-link" href="#">Next</a></li>
        `;
    else {
        if (currentPage <= 1) {
            content += ` <li class="page-item disabled" ><a class="page-link" href="#">Previous</a></li>`;
        } else {
            content += ` <li class="page-item" onclick="getUsersPage(${currentPage-1},'${nameFilter}')" ><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item" onclick="getUsersPage(${currentPage-1},'${nameFilter}')"><a class="page-link" href="#">${currentPage-1}</a></li>`;

        }
        content += `<li class="page-item active" onclick="getUsersPage(${currentPage},'${nameFilter}')"><a class="page-link" href="#">${currentPage}</a></li>`;
        if ((totalPages - currentPage) >= 1) {
            content += `
            <li class="page-item" onclick="getUsersPage(${currentPage+1},'${nameFilter}')"><a class="page-link" href="#">${currentPage+1}</a></li>
            <li class="page-item" onclick="getUsersPage(${currentPage+1},'${nameFilter}')"><a class="page-link" href="#">Next</a></li>
            `;
        } else {
            content += `
            <li class="page-item disabled" ><a class="page-link" href="#">Next</a></li>
            `;
        }
    }

    document.getElementById('pagesList').innerHTML = content;
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
        console.log(document.getElementById('deleteFormModal').getElementsByTagName('button')[2]);
        let btn = document.getElementById('deleteFormModal').getElementsByTagName('button')[2];
        btn.setAttribute('data-email', event.relatedTarget.getAttribute('data-email'));
    });

    $('#updateFormModal').on('show.bs.modal', function (event) {
        // console.log(event.relatedTarget);
        let user = JSON.parse(event.relatedTarget.getAttribute('data-user'));
        console.log(user);
        let eles = document.getElementById('updateFormModal').getElementsByTagName('input');
        for (let i = 0; i < eles.length; i++) {
            console.log(eles[i].getAttribute('type'));
            if (eles[i].getAttribute('type') === 'text') {
                eles[i].value = user[eles[i].getAttribute('name')];
            }
            if (eles[i].getAttribute('type') === 'password') {
                eles[i].value = user[eles[i].getAttribute('password')];
            }
        }

        document.getElementById('updateFormModal').getElementsByTagName('button')[2].setAttribute('data-email', user.email)
    });
});