import { Modal } from "bootstrap";
import { collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "./interfaces/Iuser";

const database = getFirestore();

let users: IUser[] = [];

const tableUsers = document.querySelector<HTMLTableElement>("table#table-users tbody");

const modalUsersCreate = new Modal(document.getElementById('modal-users-create') as HTMLElement, {});
const formUsersCreate = document.querySelector<HTMLFormElement>("#modal-users-create #form-users-create");

const modalUsersUpdate = new Modal(document.querySelector("#modal-users-update") as HTMLElement, {});
const formUsersUpdate = document.querySelector<HTMLFormElement>("#form-users-update");

// button - HTMLButtonElement
// input - HTMLInputElement
// div - HTMLElement

function renderUsers() {

    if (tableUsers) {

        tableUsers.innerHTML = '';

        users.forEach(async function(item) {

            const tableRow = document.createElement("tr");
        
            tableRow.innerHTML = `
                <td>
                    <div class="d-flex px-2 py-1">
                        <div>
                            <img src="${item.photo ? "./assets/img/" + item.photo : "./assets/img/tesla-model-s.png"}" class="avatar avatar-sm me-3 border-radius-lg" alt="${item.name}">
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
                    <span class="badge badge-sm ${(item.status) ? "bg-gradient-success" : "bg-gradient-secondary"}">${item.status ? "Online" : "Offline"}</span>
                </td>
                <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${await item.register.toDate().toLocaleDateString("pt-BR")}</span>
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

                btnEdit.addEventListener("click", (e) => {

                    e.preventDefault();
    
                    // for in
                    for (let prop in item) {

                        const input = formUsersUpdate!.querySelector<HTMLInputElement>(`[name=${prop}]`);
    
                        if (input) {
    
                            if (input.type === "radio") {
    
                                const inputRadio = formUsersUpdate!.querySelector<HTMLInputElement>(`[name=${prop}][value="${item[prop as keyof IUser]}"]`);

                                if (inputRadio) inputRadio.click();
    
                            } else {
                                input.value = String(item[prop as keyof IUser]);
                            }
    
                        }
    
                    }
    
                    modalUsersUpdate.show();
    
                });

            }

            const buttonDelete = tableRow.querySelector(".button-delete");
        
            if (buttonDelete) {

                buttonDelete.addEventListener("click", async (event) => {
        
                    event.preventDefault();
            
                    if (confirm(`Deseja realmente excluir o usuário ${item.name}?`)) {
    
                        await deleteDoc(doc(database, "users", String(item.id)));
    
                        tableRow.remove();
    
                    }
            
                });

            }
        
            tableUsers.appendChild(tableRow);
        
        });

    }

}

if (tableUsers) {

    onSnapshot(collection(database, "users"), (data) => {

        users = [];
    
        data.forEach(document => {
            
            const documentData = document.data();
    
            const object: IUser = {
                name: documentData.name,
                department: documentData.department,
                email: documentData.email,
                job: documentData.job,
                register: documentData.register,
                status: documentData.status,
                photo: documentData.photo,
                id: document.id,
            };
    
            users.push(object);
            
        });
    
        renderUsers();
    
    });
    
    if (formUsersCreate) {

        formUsersCreate.addEventListener("submit", async (event) => {
    
            event.preventDefault();
        
            const formData = new FormData(formUsersCreate);
        
            if (!formData.get("name")) {
                console.error("O nome é obrigatório.");
                return false;
            }
        
            if (!formData.get("email")) {
                console.error("O email é obrigatório.");
                return false;
            }
        
            if (!formData.get("job")) {
                console.error("O cargo é obrigatório.");
                return false;
            }
        
            if (!formData.get("department")) {
                console.error("O departamento é obrigatório.");
                return false;
            }
        
            if (!formData.get("status")) {
                console.error("O status é obrigatório.");
                return false;
            }
        
            await setDoc(doc(database, "users", uuidv4()), {
                name: formData.get("name"),
                email: formData.get("email"),
                job: formData.get("job"),
                department: formData.get("department"),
                status: formData.get("status"),
                photo: formData.get("photo"),
                register: new Date(),
            });
        
            console.log("Usuário criado!");
            
            modalUsersCreate.hide();
        
        });

    }
    
    if (formUsersUpdate) {

        formUsersUpdate.addEventListener("submit", async (e) => {
    
            e.preventDefault();
        
            const formData = new FormData(formUsersUpdate);
        
            await updateDoc(doc(database, "users", String(formData.get("id"))), {
                name: formData.get("name"),
                email: formData.get("email"),
                job: formData.get("job"),
                department: formData.get("department"),
                status: formData.get("status"),
                photo: formData.get("photo"),
            });
        
            modalUsersUpdate.hide();
        
        });

    }

}