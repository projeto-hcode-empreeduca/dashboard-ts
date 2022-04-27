import { Modal } from "bootstrap";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { IMenu } from "./interfaces/Imenu";

const database = getFirestore();

const tableMenus = document.querySelector<HTMLTableElement>("table#table-menus tbody");

const modalMenusCreate = new Modal(document.querySelector('#modal-menus-create') as HTMLElement, {});
const formMenusCreate = document.querySelector<HTMLFormElement>("#modal-menus-create #form-menus-create");
const btnOpenModal = document.querySelector<HTMLButtonElement>("#page-menus #open-modal-create");

const modalMenusUpdate = new Modal(document.querySelector("#modal-menus-update") as HTMLElement, {});
const formMenusUpdate = document.querySelector<HTMLFormElement>("#form-menus-update");

let menus: IMenu[] = [];

function renderMenus() {

    if (tableMenus) {

        menus.forEach(item => {

            const tableRow = document.createElement("tr");

            tableRow.innerHTML = `
                <td>
                    <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">${item.name}</h6>                            
                        </div>
                    </div>
                </td>
                <td>
                    <p class="text-xs font-weight-bold mb-0">${item.href}</p>
                </td>
                <td class="align-middle text-center text-sm">
                <p class="text-xs font-weight-bold mb-0">${item.icon}</p>
                </td>                
                <td class="flex-td">
                    <a class="nav-link text-secondary button-edit" href="#" title="Editar">
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

            tableMenus.appendChild(tableRow);

        });

    }

}

onSnapshot(collection(database, "menus"), (data) => {

    menus = [];

    data.forEach(doc => {
        menus.push(doc.data() as IMenu);
    });

    renderMenus();

});