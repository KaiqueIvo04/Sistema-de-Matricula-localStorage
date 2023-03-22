`use strict`

const url = "http://localhost:8030";
const buttonEntrar = document.querySelector('#button-entrar');
const inputUser = document.getElementById('usuario').value;
const inputPassword = document.getElementById('senha').value;

async function verifyLogin() {
    const inputUser = document.getElementById('usuario').value;
    const inputPassword = document.getElementById('senha').value;

    const toJson = {};

    toJson["login"] = inputUser;
    toJson["password"] = inputPassword;

    const enviaLogin = await fetch(url + "/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toJson)
    });

    let token = await enviaLogin.text();
    token = "Bearer " + token;

    const responseMe = await fetch(url + "/api/user/me", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    });

    const jsonUser = await responseMe.json();
    return jsonUser;
}


buttonEntrar.addEventListener("click", async () => {
    let user = await verifyLogin();
    if (user.userType === "SECRETARY") {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "../system/admin-pages/home/index.html";
    }
    else if (user.userType === "STUDENT") {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "../system/student-pages/home/index.html";
    }
    else if (user.userType === "TEACHER") {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "../system/teacher-pages/home/index.html";
    }
});





