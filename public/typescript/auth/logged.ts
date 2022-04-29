const logged = Boolean(Number(localStorage.getItem("isLogged")));

const allowedFiles = ["login.html", "register.html"];

if (!logged) {
    if (!allowedFiles.includes(location.pathname.split("/").pop()!)) {
        window.location.href = "./login.html";
    }
}