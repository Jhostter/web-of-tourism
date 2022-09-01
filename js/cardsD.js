container = document.getElementById("cardContainer2");

fetch("https://finalproject-309315.uc.r.appspot.com/search?type=Destination")
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);

    data.forEach((element) => {
      container.innerHTML += `
            <div class="card">
              <img src="images/RioDR.jpg">
              <div class="info">
                  <p class="categoria paseo">Destino</p>
                  <p class="titulo">${element.Name}</p>
                  <p class="precio fas fa-map-marker-alt">  ${element.Province}</p>
              </div>
           </div>  `;
    });
  });
