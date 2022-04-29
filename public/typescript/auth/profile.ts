import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const auth = getAuth();
const storage = getStorage();

const profilePage = document.querySelector<HTMLElement>("#profile-page");

if (profilePage) {

    onAuthStateChanged(auth, () => {

        if (auth.currentUser) {

            const { displayName, photoURL, email } = auth.currentUser;

            profilePage.querySelector("img")!.src = photoURL ?? "./assets/img/user.svg";
            
            profilePage.querySelector<HTMLHeadingElement>("h5.profile-user-name")!.innerText = displayName ?? "Usuário sem nome";
            profilePage.querySelector<HTMLInputElement>("input#form-profile-name")!.value = displayName ?? "Usuário sem nome";

            profilePage.querySelector<HTMLElement>("p.profile-user-email")!.innerText = email ?? "";
            profilePage.querySelector<HTMLInputElement>("input#form-profile-email")!.value = email ?? "";

        }

    });

    const formProfile = document.querySelector<HTMLFormElement>("form#form-profile");

    if (formProfile) {

        formProfile.addEventListener("submit", async (event) => {

            event.preventDefault();

            const formData = new FormData(formProfile);

            // formData.get("email");

            if (auth.currentUser) {

                const photoElement = formProfile.querySelector<HTMLInputElement>("#form-profile-photo");
                let photoURL: string = "";

                if (photoElement) {

                    if (photoElement.files?.length) {

                        const photo = photoElement.files[0];

                        const result = await uploadBytes(ref(storage, `users/${auth.currentUser.uid}`), photo);

                        photoURL = await getDownloadURL(result.ref);

                    }

                }

                await updateProfile(auth.currentUser, {
                    displayName: String(formData.get("name")),
                    photoURL,
                });

            }

        });

    }

}