const footer = document.createElement("footer");

footer.className = "footer py-4";

footer.innerHTML = `
    <div class="container-fluid">
        <div class="row align-items-center justify-content-lg-between">
            <div class="col-lg-6 mb-lg-0 mb-4">
                <div class="copyright text-center text-sm text-muted text-lg-start">
                    © ${new Date().getFullYear()},
                    desenvolvido <i class="fa fa-heart" aria-hidden="true"></i> por
                    <a href="https://hcode.com.br" class="font-weight-bold text-white" target="_blank">Hcode Treinamentos</a>.
                </div>
            </div>
            <div class="col-lg-6">
                <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                <li class="nav-item">
                    <a href="https://hcode.com.br" class="nav-link text-muted" target="_blank">Hcode Treinamentos</a>
                </li>
                <li class="nav-item">
                    <a href="https://hcode.com.br" class="nav-link text-muted" target="_blank">About Us</a>
                </li>
                <li class="nav-item">
                    <a href="https://hcode.com.br/blog" class="nav-link text-muted" target="_blank">Blog</a>
                </li>
                </ul>
            </div>
        </div>
    </div>
`;

const container = document.querySelector("main#main > div.container-fluid");

if (container) {
    container.appendChild(footer);
}