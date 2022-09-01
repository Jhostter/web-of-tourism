function checkCookie() {
  let temp = decodeURIComponent(document.cookie);
  if (temp) {
    let temptwo = temp.slice(temp.indexOf("=") + 1, temp.length);
    let cookie = JSON.parse(temptwo);
    return cookie;
  }
}

//style="display: grid; grid-template-columns: auto auto;
if (document.getElementById("navbar")) {
  if (checkCookie()) {
    document.getElementById(
      "navbar"
    ).innerHTML += `<div class=" transition" style="draggable: false;">
    <div class="container-fluid fixed is-sticky">
        <div class="row">
            <div class="col-md-12">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <a class="navbar-brand" href="index.html">TuDestinoRD</a>

                    <div class="collapse navbar-collapse float-right" id="navbar-list-4" style="justify-content: flex-end;">
                        <ul class="navbar-nav">
                        <li class="nav-item active">
                                <a class="nav-link stl" href="contactoForm.html" >Sobre Nosotros</a>
                            </li>
                            <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src='${
                              checkCookie().image
                            }' width="40" height="40" class="rounded-circle">
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style="left: -70px; background: #252a33; top: 70px;">
                            <a class="dropdown-item" href="user_profile.html">Perfil</a>
                            <a class="dropdown-item" href="#" id="logout">Cerrar sesion</a>
                            </div>
                        </li>   
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</div>`;
  } else if (!checkCookie()) {
    document.getElementById("navbar").innerHTML += `<div class=" transition">
    <div class="container-fluid fixed is-sticky">
        <div class="row">
            <div class="col-md-12">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <a class="navbar-brand" href="index.html">TuDestinoRD</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="icon-menu"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="contactoForm.html" >Sobre Nosotros</a>
                            </li>
                            <li><a href="./login.html" id="toChangeOnLogin" class="btn btn-outline-light top-btn"><span class="ti-user"></span>Iniciar sesión</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</div>`;
  }
}
if (document.getElementById("logout")) {
  document.getElementById("logout").addEventListener("click", () => {
    document.cookie =
      "logged" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.replace(location.origin);
  });
}
