import { usersTable } from "../database/tables.js";

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