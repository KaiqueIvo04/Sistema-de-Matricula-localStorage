`use strict`

const url = "http://localhost:8030";

//Pegar informações do usuário logado e transformar em objeto
function getUserInformations() {
    let userLogged = localStorage.getItem('user');
    const userLoggedObj = JSON.parse(userLogged);
    return userLoggedObj;
}

function showInformations(user) {
    let divs = document.querySelectorAll('.conteudo-principal-informacao');
    const keys = ["id", "name", "email", "id_number", "userType", "birthDate"];
    for (let i = 0; i < divs.length; i++) {
        let text = document.createElement("p");
        text.innerText = user[keys[i]];
        divs[i].appendChild(text);
        divs[i].childNodes[1].className = "elemento";
    }
}

showInformations(getUserInformations());
