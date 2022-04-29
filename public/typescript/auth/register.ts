import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";

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

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential;

                updateProfile(user, {
                    displayName: String(name),
                }).then(() => {
                    console.log("Usuário criado!!!");
                
                    location.href = "./index.html";
                }).catch((error) => {
                    console.error(error);
                });
                
            })
            .catch((error) => {
                console.error(error);
            });

    });

}