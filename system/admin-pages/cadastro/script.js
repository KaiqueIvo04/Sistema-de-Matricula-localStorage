`use strict`

const url = "http://localhost:8030";

//Pegar todos os cursos cadastrados
async function getAllcourses() {
    const objCourses = await fetch(url + '/api/course', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
        },
    })

    return await objCourses.json();
};

//Pegar todos os estudantes e professores dos cursos
async function getAllSubjectsByCourses() {
    let arrayCourses = await getAllcourses();
    let arrayOfArraysStudents = []; //Array cujos elementos são outros arrays com estudantes de um curso
    let arrayOfArraysTeachers = []; //Array cujos elementos são outros arrays com professores de um curso

    //Traze alunos e professores de um curso e armazena em seus devidos arrays
    for (let i = 0; i < arrayCourses.length; i++) {
        //Pega alunos
        const objStudents = await fetch(url + `/api/user/student?course=${arrayCourses[i].name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        })
        const studentsToJson = await objStudents.json();
        if (!(studentsToJson[i] === undefined)) arrayOfArraysStudents.push(studentsToJson);//Verifica se o objeto do aluno não é vazio

        //Pega professores
        const objTeachers = await fetch(url + `/api/user/teacher?course=${arrayCourses[i].name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        })
        const teachersToJson = await objTeachers.json();
        if (!(teachersToJson[i] === undefined)) arrayOfArraysTeachers.push(teachersToJson); //Verifica se o objeto do professor não é vazio
    }
    const arrayUsers = []; //Array onde ficarão todos os usuários cadastrados (Alunos e Professores)

    //Adiciona todos os estudantes ao array de usuários
    for (let i = 0; i < arrayOfArraysStudents.length; i++) {
        for (let j = 0; j < arrayOfArraysStudents[i].length; j++) {
            arrayUsers.push(arrayOfArraysStudents[i][j]);
        }
    }
    //Adiciona todos os professores ao array de usuários
    for (let i = 0; i < arrayOfArraysTeachers.length; i++) {
        for (let j = 0; j < arrayOfArraysTeachers[i].length; j++) {
            arrayUsers.push(arrayOfArraysTeachers[i][j]);
        }
    }

    return arrayUsers;
}

async function showUsers(users) {
    let listaUsuarios = document.querySelector('.lista-usuarios'); //Pega o elemento da lista de usuários no html
    users = await users;
    
    //Adiciona uma ficha na lista de usuários para cada usuário
    for (let i = 0; i < users.length; i++) {
        //Cria elementos html para inserir uma ficha
        let keys = ['id', 'userType', 'name', 'course', 'id_number'];
        let listItem = document.createElement('li');
        let div = document.createElement('div');
        listItem.appendChild(div);
        for (let j = 0; j < 5; j++) {
            let text = document.createElement('p');
            text.innerText = users[i][keys[j]];
            div.appendChild(text);
        }

        //Verificar se existem usuários, se não criar um div com erro
        if (listaUsuarios.lastElementChild == null) {
            let listItemError = document.createElement('li');
            let divError = document.createElement('div');
            let textError = document.createElement('p');
            divError.className = 'item-lista-erro';
            textError.innerText = "Erro, nenhum usuário existente!";
            divError.appendChild(textError);
            listItemError.appendChild(divError);
            listaUsuarios.appendChild(listItemError);
        }

        const lastItemDiv = listaUsuarios.lastElementChild.firstElementChild; //Pega a div do último elemento da lista
        //Distribuição de cores da lista
        if (lastItemDiv.className == 'item-lista-cor2') {
            div.className = 'item-lista-cor1';
            listaUsuarios.appendChild(listItem);
        } else if (lastItemDiv.className == 'item-lista-cor1') {
            div.className = 'item-lista-cor2';
            listaUsuarios.appendChild(listItem);
        } else {
            div.className = 'item-lista-cor1';
            listaUsuarios.appendChild(listItem);
            document.querySelector('.item-lista-erro').style.display ='none';
        }
    }
}

showUsers(getAllSubjectsByCourses());


