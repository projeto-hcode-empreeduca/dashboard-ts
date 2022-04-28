import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const formRegister = document.querySelector("form#form-register") as HTMLFormElement;

if (formRegister) {

    const auth = getAuth();

    formRegister.addEventListener("submit", async (event) => {

        event.preventDefault();

        const formData = new FormData(formRegister);

        if (!formData.get("name")) {
            console.error("Preencha o nome.");
            return false;
        }

        if (!formData.get("email")) {
            console.error("Preencha o email.");
            return false;
        }

        if (!formData.get("password")) {
            console.error("Preencha a senha.");
            return false;
        }

        const name = formData.get("name");
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));

        await createUserWithEmailAndPassword(auth, email, password);

        location.href = "./index.html";

        console.log("Usuário criado!!!");

    });

}