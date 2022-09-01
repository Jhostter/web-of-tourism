let container = document.getElementById("cardContainer");

fetch(
  "https://finalproject-309315.uc.r.appspot.com/search?type=Business&busType=Restaurante"
)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    data.forEach((element) => {
      container.innerHTML += `
                <div class="card">
                <img src="images/evento2.jpg">
                <div class="info">
                    <p class="categoria concierto">${element.TypeOf}</p>
                    <p class="titulo">${element.Name}</p>
                    <p class="precio fas fa-map-marker-alt">  ${element.Province}</p>
                </div>
             </div>  `;
    });
  });

//
