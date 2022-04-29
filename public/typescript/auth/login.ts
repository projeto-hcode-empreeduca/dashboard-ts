import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { showAlert } from "../alert";

const formLogin = document.querySelector<HTMLFormElement>("#form-login");

if (formLogin) {

    const alertElement = document.querySelector<HTMLElement>("#alert-login");

    const auth = getAuth();

    formLogin.addEventListener("submit", async (event) => {

        event.preventDefault();

        const formData = new FormData(formLogin);

        if (!formData.get("email")) {
            showAlert(alertElement, "Preencha o email.");
            return false;
        }

        if (!formData.get("password")) {
            showAlert(alertElement, "Preencha a senha.");
            return false;
        }

        const email = String(formData.get("email"));
        const password = String(formData.get("password"));

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Deu tudo certo. Login OK
                console.log("Usuário logado");

                localStorage.setItem("isLogged", "1");

                location.href = './index.html';
            })
            .catch((error) => {
                // Deu problema
                let message: string;

                switch (error.code) {
                    case "auth/wrong-password":
                    case "auth/user-not-found":
                        message = "Usuário inexistente ou senha inválida.";
                        break;

                    default:
                        message = "Ocorreu um problema.";
                        break;
                }

                showAlert(alertElement, message);
            });

    });

}