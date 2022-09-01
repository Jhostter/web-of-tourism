fetch("https://finalproject-309315.uc.r.appspot.com", {
  method: "GET",
})
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      // let categoria = data[i].TypeOf;

      if ((container = document.getElementById("cardContainer2"))) {
        //   if(categoria == "Restaurante"){
        container.innerHTML += `
              <div class="card">
              <img src="images/RioDR.jpg">
              <div class="info">
                  <p class="categoria paseo">Destino</p>
                  <p class="titulo">${data[i].Name}</p>
                  <p class="precio fas fa-map-marker-alt">  ${data[i].Province}</p>
              </div>
           </div>  `;
        //   }
      }
      // else if(container = document.getElementById("cardContainer2")) {

      //   if (categoria == "Hotel"){
      //         container.innerHTML += `
      //         <div class="card">
      //         <img src="images/evento2.jpg">
      //         <div class="info">
      //             <p class="categoria clase">${categoria}</p>
      //             <p class="titulo">${data[i].Name}</p>
      //             <p class="precio fas fa-map-marker-alt">  ${data[i].Province}</p>
      //         </div>
      //     </div> `;
      //   }

      // }
    }
  });
