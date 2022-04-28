import { Modal } from "bootstrap";
import { collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "./interfaces/Iuser";

const database = getFirestore();
const storage = getStorage();

let users: IUser[] = [];

const tableUsers = document.querySelector<HTMLTableElement>("table#table-users tbody");

const modalElementCreate = document.querySelector('#modal-users-create') as HTMLElement;
let modalUsersCreate: Modal;
if (modalElementCreate) {
    modalUsersCreate = new Modal(modalElementCreate, {});
}

const formUsersCreate = document.querySelector<HTMLFormElement>("#modal-users-create #form-users-create");
const btnOpenModal = document.querySelector<HTMLButtonElement>("#open-modal-create");

const modalElementUpdate = document.querySelector("#modal-users-update") as HTMLElement;
let modalUsersUpdate: Modal;
if (modalElementUpdate) {
    modalUsersUpdate = new Modal(modalElementUpdate, {});
}
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
                            <img src="${item.photo ? item.photo : "./assets/img/tesla-model-s.png"}" class="avatar avatar-sm me-3 border-radius-lg" alt="${item.name}">
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

                    const imageElement = formUsersUpdate?.querySelector<HTMLImageElement>("#photo-user");

                    if (imageElement) {

                        if (item.photo) {
                            imageElement.src = item.photo;
                            imageElement.alt = item.name;
                        } else {
                            imageElement.src = "./assets/img/tesla-model-s.png";
                            imageElement.alt = "Imagem do usuário";
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
    
                        await deleteDoc(doc(database, "workers", String(item.id)));
    
                        tableRow.remove();
    
                    }
            
                });

            }
        
            tableUsers.appendChild(tableRow);
        
        });

    }

}

if (tableUsers) {

    onSnapshot(collection(database, "workers"), (data) => {

        users = [];
    
        data.forEach(document => {
            
            const documentData = document.data();
    
            const object: IUser = {
                name: documentData.name,
                department: documentData.department,
                email: documentData.email,
                job: documentData.job,
                register: documentData.register,
                status: Boolean(+documentData.status),
                photo: documentData.photo,
                id: document.id,
            };
    
            users.push(object);
            
        });
    
        renderUsers();
    
    });

    if (btnOpenModal) {

        btnOpenModal.addEventListener("click", () => modalUsersCreate.show());

    }
    
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

            const id = uuidv4();

            let photo = "";

            // Foto
            // Selecionar a foto que a pessoa escolheu
            const photoElement = formUsersCreate.querySelector<HTMLInputElement>("#form-create-photo");

            if (photoElement) {

                if (photoElement.files?.length) {

                    const photoFile = photoElement.files[0];

                    const reference = ref(storage, `users/${id}.png`);
                    
                    // Salvar a foto em um servidor (Firebase Storage)
                    const uploadResult = await uploadBytes(reference, photoFile);

                    console.log("Foto enviada com sucesso!");

                    // Selecionar o caminho da foto
                    const url = await getDownloadURL(uploadResult.ref);

                    photo = url;

                }

            }
        
            await setDoc(doc(database, "workers", id), {
                name: formData.get("name"),
                email: formData.get("email"),
                job: formData.get("job"),
                department: formData.get("department"),
                status: formData.get("status"),
                photo,
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

            // O usuário já possui uma foto no Storage?
            // SIM
            let photo = formData.get("photo");
            const photoElement = formUsersUpdate.querySelector<HTMLInputElement>("#form-update-photo");

            if (photoElement) {

                if (photoElement.files?.length) {

                    await deleteObject(ref(storage, String(photo)));

                    const file = photoElement.files[0];

                    const upload = await uploadBytes(ref(storage, `users/${formData.get("id")}`), file);

                    photo = await getDownloadURL(upload.ref);

                }

            }
        
            await updateDoc(doc(database, "workers", String(formData.get("id"))), {
                name: formData.get("name"),
                email: formData.get("email"),
                job: formData.get("job"),
                department: formData.get("department"),
                status: formData.get("status"),
                photo,
            });
        
            modalUsersUpdate.hide();
        
        });

    }

}