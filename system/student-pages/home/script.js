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
    switch (user.userType) {
        case 'SECRETARY':
            const keysSecretary = ["id", "name", "email", "id_number", "userType", "birthDate"];
            for(let i = 0; i < divs.length; i++) {
                let text = document.createElement("p");
                text.innerText = user[keysSecretary[i]];
                divs[i].appendChild(text);
                divs[i].childNodes[1].className = "elemento";
            }
            break;
        case 'STUDENT':
            let divs = document.querySelectorAll('.conteudo-principal-informacao');
            const keysStudent = ["id", "name", "email", "id_number", "userType", "birthDate", "course", "registration"];
            for(let i = 0; i < divs.length; i++) {
                let text = document.createElement("p");
                text.innerText = user[keysStudent[i]];
                divs[i].appendChild(text);
                divs[i].childNodes[1].className = "elemento";
            }
            break;
        default:
            break;
    }
}

showInformations(getUserInformations());
