const logged = Boolean(Number(localStorage.getItem("isLogged")));

if (!logged) {
    if (location.pathname.split("/").pop() !== "login.html") {
        window.location.href = "./login.html";
    }
}