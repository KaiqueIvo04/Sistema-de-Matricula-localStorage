`use strict`

const url = "http://localhost:8030";  //URL
const buttonRegister = document.querySelector('#button-registrar'); //Pega botão registrar
const selectType = document.getElementById('user-type'); //Pega o input-select
let selectedValue = selectType.value; //Atribui a primeira opção do select

//Detecta se o select mudou
selectType.addEventListener('change', function(){
    selectedValue = selectType.value;
})



//Função para criar json do usuário
function criaUserObj() {
    //Pega todos os inputs
    const inputName = document.getElementById('name').value;
    const inputEmail = document.getElementById('email').value;
    const inputCpf = document.getElementById('id-number').value;
    const inputUser = document.getElementById('usuario').value;
    const inputPassword = document.getElementById('password').value;
    const inputBirthdate = document.getElementById('birth-date').value;
    const inputCourse = document.getElementById('course').value;

    let userObj = {}

    if (selectedValue === "SECRETARY") {
        userObj["name"] = inputName;
        userObj["email"] = inputEmail;
        userObj["id_number"] = inputCpf;
        userObj["login"] = inputUser;
        userObj["password"] =  inputPassword;
        userObj["birthDate"] = inputBirthdate;
    } else if (selectedValue === "STUDENT" || selectedValue === "TEACHER") {
        userObj["name"] = inputName;
        userObj["email"] = inputEmail;
        userObj["id_number"] = inputCpf;
        userObj["login"] = inputUser;
        userObj["password"] =  inputPassword;
        userObj["birthDate"] = inputBirthdate;
        userObj["course"] = inputCourse;
    }

    return userObj;
}

//Função para registrar o usuário
async function regUsuario(userObj) {
    if (selectedValue === "SECRETARY") {
        const enviaReg = await fetch(url + "/api/user/secretary", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
                'Connection': 'keep-alive'
            },
            body: JSON.stringify(userObj)
        })
        return enviaReg;
    } else if (selectedValue === "STUDENT") {
        const enviaReg = await fetch(url + "/api/user/student", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
                'Connection': 'keep-alive'
            },
            body: JSON.stringify(userObj)
        })
        return enviaReg;
    } else if (selectedValue === "TEACHER") {
        const enviaReg = await fetch(url + "/api/user/teacher", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
                'Connection': 'keep-alive'
            },
            body: JSON.stringify(userObj)
        })
        return enviaReg;
    }
}

buttonRegister.addEventListener("click", async () => {
    const teste = await regUsuario(criaUserObj());
    //Falta explicar ao usuário se deu certo ou não
})



