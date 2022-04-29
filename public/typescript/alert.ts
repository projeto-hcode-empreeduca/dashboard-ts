export const showAlert = (alertElement: HTMLElement | null, message: string) => {

    if (alertElement) {
        const buttonClose = alertElement.querySelector("#btn-close");
    
        if (buttonClose) {
            buttonClose.addEventListener("click", () => {
                alertElement.classList.remove("show");
            });
        }

        alertElement.querySelector("span")!.innerText = message;

        alertElement.classList.add("show");
    }

};