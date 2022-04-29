import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth();

const nav = document.createElement("nav");

nav.className = "navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl";
nav.id = "navbarBlur";

nav.innerHTML = `
    <div class="container-fluid py-1 px-3">
        <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 justify-content-end" id="navbar">
            <ul class="navbar-nav justify-content-end">
                <li class="nav-item d-flex align-items-center">
                    <a href="./profile.html" id="user-info" class="d-flex align-items-center">
                        <img src="" />
                        <span class="px-3"></span>
                    </a>
                </li>
                <li class="nav-item px-4 d-flex align-items-center">
                    <a href="#" class="nav-link text-body p-0" title="Sair" id="btn-logout">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </a>
                </li>
            </ul>
        </div>
    </div>
`;

const btnLogout = nav.querySelector<HTMLElement>("#btn-logout");

if (btnLogout) {
    btnLogout.addEventListener("click", (event) => {

        event.preventDefault();

        localStorage.setItem("isLogged", "0");

        signOut(auth);

        window.location.href = "./login.html";

    });
}

onAuthStateChanged(auth, () => {

    if (auth.currentUser) {

        const userElement = nav.querySelector<HTMLElement>("#user-info");

        if (userElement) {
            userElement.querySelector("span")!.innerText = auth.currentUser.displayName ?? "Usuário sem nome";
            userElement.querySelector("img")!.src = auth.currentUser.photoURL ?? "./assets/img/user.svg";
        }

    }

});

const containerFluid = document.querySelector("main > div.container-fluid");

if (containerFluid && nav) {
    document.querySelector("main")!.insertBefore(nav, containerFluid);
}