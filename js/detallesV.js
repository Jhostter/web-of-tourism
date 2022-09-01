fetch("https://finalproject-309315.uc.r.appspot.com/business/showVerified", {
  method: "GET",
})
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    // const card = document.createElement('div');
    //   for(let i = 0; i < data.length; i++) {
    let categoria = data.TypeOf;

    if ((container = document.getElementById("cardContainer"))) {
      container.innerHTML += `
              <div>
              <img src="images/evento2.jpg">
              <div class="info">
                  <p class="categoria concierto">concierto</p>
                  <p class="titulo">hoteles klk</p>
                  <p class="precio fas fa-map-marker-alt">hola buenos dias</p>
              </div>
           </div>  
           `;
    }
  });
