import { usersTable } from "../database/tables.js";

/*
<tr>
    <td>
        <div class="d-flex px-2 py-1">
            <div>
                <img src="../assets/img/team-4.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user2">
            </div>
            <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm">Rafael</h6>
                <p class="text-xs text-secondary mb-0">rafa@hcode.com.br</p>
            </div>
        </div>
    </td>
    <td>
        <p class="text-xs font-weight-bold mb-0">Programador</p>
        <p class="text-xs text-secondary mb-0">Developer</p>
    </td>
    <td class="align-middle text-center text-sm">
        <span class="badge badge-sm bg-gradient-secondary">Online</span>
    </td>
    <td class="align-middle text-center">
        <span class="text-secondary text-xs font-weight-bold">18/06/2021</span>
    </td>
    <td class="align-middle">
        <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
        Edit
        </a>
    </td>
</tr>
*/

const tableUsers = document.querySelector("table#table-users tbody");

usersTable.forEach((item) => {

    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `
        <td>
            <div class="d-flex px-2 py-1">
                <div>
                    <img src="${item.photo}" class="avatar avatar-sm me-3 border-radius-lg" alt="${item.name}">
                </div>
                <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">${item.name}</h6>
                    <p class="text-xs text-secondary mb-0">${item.email}</p>
                </div>
            </div>
        </td>
        <td>
            <p class="text-xs font-weight-bold mb-0">${item.job}</p>
            <p class="text-xs text-secondary mb-0">${item.department}</p>
        </td>
        <td class="align-middle text-center text-sm">
            <span class="badge badge-sm ${(item.status === "Online") ? "bg-gradient-success" : "bg-gradient-secondary"}">${item.status}</span>
        </td>
        <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">${new Date(item.dtregister).toLocaleDateString("pt-BR")}</span>
        </td>
        <td class="flex-td">
            <a class="nav-link text-secondary" href="#" title="Editar">
                <div class="text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">edit</i>
                </div>
            </a>
            <a class="nav-link button-delete" href="#" title="Excluir">
                <div class="text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">delete</i>
                </div>
            </a>
        </td>
    `;

    tableRow.querySelector(".button-delete").addEventListener("click", (event) => {

        event.preventDefault();

        if (confirm("Deseja realmente excluir o usuário?")) {
            tableRow.remove();
        }

    });

    tableUsers.appendChild(tableRow);

});

/*
const buttons = document.querySelectorAll(".button-delete");

buttons.forEach((button) => {

    button.addEventListener("click", (event) => {

        event.preventDefault();

        const target = event.target;

        if (confirm("Deseja realmente excluir o usuário?")) {
            
            // Identificar a tr que vai ser excluída
            const tr = target.closest("tr");

            // Excluir a tr
            tr.remove();

        }

    });

});
*/

/*
const tableData1 = document.createElement("td");

const div1 = document.createElement("div");

// div1.classList.add(["d-flex", "px-2", "py-1"]);
div1.className = "d-flex px-2 py-1";

const p1 = document.createElement("p");

p1.className = "text-xs text-secondary mb-0";

p1.innerText = "djalma@hcode.com.br";

div1.appendChild(p1);

tableData1.appendChild(div1);

tableRow.appendChild(tableData1);

tableUsers.appendChild(tableRow);
*/

{/* <p class="text-xs text-secondary mb-0">djalma@hcode.com.br</p> */}

// -----------------------------------------------------------

// DOM
// Criar elementos HTML usando JS
// createElement
/*
const title = document.createElement("h1");

// title.innerHTML = "Bom dia turma! Segunda-feira começou com tudo!";
title.innerText = "Bom dia turma agora com o innerText";

title.classList.add("page-title");

title.style.color = "#0000FF";

console.log(title);
*/

{/* <tr>
    <td>
    <div class="d-flex px-2 py-1">
        <div>
        <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
        </div>
        <div class="d-flex flex-column justify-content-center">
        <h6 class="mb-0 text-sm">John Michael</h6>
        <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>
        </div>
    </div>
    </td>
    <td>
    <p class="text-xs font-weight-bold mb-0">Manager</p>
    <p class="text-xs text-secondary mb-0">Organization</p>
    </td>
    <td class="align-middle text-center text-sm">
    <span class="badge badge-sm bg-gradient-success">Online</span>
    </td>
    <td class="align-middle text-center">
    <span class="text-secondary text-xs font-weight-bold">23/04/18</span>
    </td>
    <td class="align-middle">
    <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
        Edit
    </a>
    </td>
</tr>
<tr>
    <td>
    <div class="d-flex px-2 py-1">
        <div>
        <img src="../assets/img/team-3.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user2">
        </div>
        <div class="d-flex flex-column justify-content-center">
        <h6 class="mb-0 text-sm">Alexa Liras</h6>
        <p class="text-xs text-secondary mb-0">alexa@creative-tim.com</p>
        </div>
    </div>
    </td>
    <td>
    <p class="text-xs font-weight-bold mb-0">Programator</p>
    <p class="text-xs text-secondary mb-0">Developer</p>
    </td>
    <td class="align-middle text-center text-sm">
    <span class="badge badge-sm bg-gradient-secondary">Offline</span>
    </td>
    <td class="align-middle text-center">
    <span class="text-secondary text-xs font-weight-bold">11/01/19</span>
    </td>
    <td class="align-middle">
    <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
        Edit
    </a>
    </td>
</tr> */}