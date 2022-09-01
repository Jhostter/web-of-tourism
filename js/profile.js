function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

function checkCookie() {
  let temp = decodeURIComponent(document.cookie);
  if (temp) {
    let temptwo = temp.slice(temp.indexOf("=") + 1, temp.length);
    let cookie = JSON.parse(temptwo);

    return cookie;
  }
}

$("document").ready(function () {
  if (checkCookie().type == "0") {
    document.getElementById("buttons").innerHTML += `
    <a href="business_verification.html" class="btn btn-warning btn-block follow">Verificar negocios</a>
    <a href="view_business.html" class="btn btn-warning btn-block follow">Ver negocios verificados</a>
    <a href="add_destination.html" class="btn btn-warning btn-block follow">Agregar destinos y act.</a>
    `;
  }
  fetch("https://finalproject-309315.uc.r.appspot.com/search/byOwner", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ id: checkCookie().id }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((element) => {
        document.getElementById("businesses").innerHTML += `
          <div>
          <ul>
            <li><b>${element.TypeOf}: </b>${element.Name}</li>
          </ul>
          </div>`;
      });

      document.getElementById("profile-img").src = checkCookie().image;
      document.getElementById("user_title").innerHTML += `
          <div>
          <h5>Bienvenido <i style="color:gray;">${checkCookie().name}</i> !</h5>
          </div>`;
      document.getElementById("name").innerHTML += `
          <div>
          <p>${checkCookie().name}</p>
          </div>`;
      document.getElementById("email").innerHTML += `
          <div>
          <p>${checkCookie().email}</p>
          </div>`;
    });
});
