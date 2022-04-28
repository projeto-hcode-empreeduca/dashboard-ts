import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const formLogin = document.querySelector<HTMLFormElement>("#form-login");

if (formLogin) {

    const auth = getAuth();

    formLogin.addEventListener("submit", async (event) => {

        event.preventDefault();

        const formData = new FormData(formLogin);

        if (!formData.get("email")) {
            console.error("Preencha o email.");
            return false;
        }

        if (!formData.get("password")) {
            console.error("Preencha a senha.");
            return false;
        }

        const email = String(formData.get("email"));
        const password = String(formData.get("password"));

        await signInWithEmailAndPassword(auth, email, password);

        console.log("Usuário logado");

        location.href = './index.html';

    });

}