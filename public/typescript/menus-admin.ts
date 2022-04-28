import { Modal } from "bootstrap";
import { collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { IMenu } from "./interfaces/Imenu";

const database = getFirestore();

const tableMenus = document.querySelector<HTMLTableElement>("table#table-menus tbody");

const modalCreateElement = document.querySelector('#modal-menus-create') as HTMLElement;
let modalMenusCreate: Modal;
if (modalCreateElement) {
    modalMenusCreate = new Modal(modalCreateElement, {});
}
const formMenusCreate = document.querySelector<HTMLFormElement>("#modal-menus-create #form-menus-create");
const btnOpenModal = document.querySelector<HTMLButtonElement>("#page-menus #open-modal-create");

const modalUpdateElement = document.querySelector("#modal-menus-update") as HTMLElement;
let modalMenusUpdate: Modal;
if (modalUpdateElement) {
    modalMenusUpdate = new Modal(modalUpdateElement, {});
}
const formMenusUpdate = document.querySelector<HTMLFormElement>("#form-menus-update");

let menus: IMenu[] = [];

function renderMenus() {

    if (tableMenus) {

        tableMenus.innerHTML = '';

        menus.forEach(async (item) => {

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

            const btnEdit = tableRow.querySelector(".button-edit");

            if (btnEdit) {

                btnEdit.addEventListener("click", (event) => {

                    event.preventDefault();

                    for (let prop in item) {

                        const input = formMenusUpdate!.querySelector<HTMLInputElement>(`[name=${prop}]`);
    
                        if (input) {
    
                            if (input.type === "radio") {
    
                                const inputRadio = formMenusUpdate!.querySelector<HTMLInputElement>(`[name=${prop}][value="${item[prop as keyof IMenu]}"]`);

                                if (inputRadio) inputRadio.click();
    
                            } else {
                                input.value = String(item[prop as keyof IMenu]);
                            }
    
                        }
    
                    }

                    modalMenusUpdate.show();

                });

            }

            const btnDelete = tableRow.querySelector(".button-delete");

            if (btnDelete) {

                btnDelete.addEventListener("click", async (event) => {

                    event.preventDefault();

                    if (confirm(`Deseja excluir o menu ${item.name}?`)) {

                        if (item.id) {
                            await deleteDoc(doc(database, "menus", item.id));
    
                            tableRow.remove();
                        } else {
                            console.error("Menu não encontrado.");
                        }
    
                    }

                });

            }

            tableMenus.appendChild(tableRow);

        });

    }

}

onSnapshot(collection(database, "menus"), (data) => {

    menus = [];

    data.forEach(doc => {
        menus.push({
            ...doc.data(),
            id: doc.id,
        } as IMenu);
    });

    renderMenus();

});

if (btnOpenModal) {
    btnOpenModal.addEventListener("click", () => modalMenusCreate.show());
}

if (formMenusCreate) {

    formMenusCreate.addEventListener("submit", async (event) => {

        event.preventDefault();

        const formData = new FormData(formMenusCreate);

        if (!formData.get("name")) {
            console.error("O nome é obrigatório");
            return false;
        }

        if (!formData.get("href")) {
            console.error("O link é obrigatório");
            return false;
        }

        if (!formData.get("icon")) {
            console.error("O ícone é obrigatório");
            return false;
        }

        await setDoc(doc(database, "menus", uuidv4()), {
            name: formData.get("name"),
            href: formData.get("href"),
            icon: formData.get("icon"),
        });

        modalMenusCreate.hide();

    });

}

if (formMenusUpdate) {

    formMenusUpdate.addEventListener("submit", async (event) => {

        event.preventDefault();

        const formDataUpdate = new FormData(formMenusUpdate);

        const menuId = formDataUpdate.get("id")

        if (menuId) {
            await updateDoc(doc(database, "menus", String(menuId)), {
                name: formDataUpdate.get("name"),
                href: formDataUpdate.get("href"),
                icon: formDataUpdate.get("icon"),
            });

            modalMenusUpdate.hide();
        }

    });

}