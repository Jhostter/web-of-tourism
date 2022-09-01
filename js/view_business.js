fetch("https://finalproject-309315.uc.r.appspot.com/search?type=Business")
  .then((response) => response.json())
  .then(function (data) {
    data.forEach((element) => {
      let temp = element.Image.slice(1, element.Image.length);
      console.log(temp);

      let tmp = temp.split(",");
      let images = "";
      console.log(tmp);

      tmp.forEach((ele) => {
        console.log(ele);
        images += `<img src="${ele}" class="businessImage" >`;
      });

      //<p> <b>Afuera, etc: </b> ${element.KindOfEvent} </p>
      if (element.TypeOf == "Hotel") {
        container.innerHTML += `<div class="card_business" id="${element.Rnc}">
          <h5>${element.TypeOf}</h5><hr>
          <p> <b>Nombre: </b> ${element.Name}</p>
          <p> <b>Dueño: </b> ${element.idOwner}</p>
          <p> <b>Rnc: </b> ${element.Rnc} </p>
          <p> <b>Descripcion: </b> ${element.Description} </p>
          <p> <b>Provincia: </b> ${element.Province} </p>
          <p> <b>Telefono: </b> ${element.PhoneNumber} </p>
          <p> <b>Categoria: </b> ${element.Stars} </p>
          
          <p> <b>Cantidad de habitaciones: </b> ${element.NoOfRooms} </p>
          <p> <b>Servicios: </b> ${element.Services} </p>
          <p> <b>Images: </b> <br><br>
          ${images}
          </div>`;
      } else {
        container.innerHTML += `<div class="card_business" id="${element.Rnc}">
          <h5>${element.TypeOf} </h5><hr>
          <p> <b>Nombre: </b> ${element.Name} </p>
          <p> <b>Dueño: </b> ${element.idOwner} </p>
          <p> <b>Rnc:</b> ${element.Rnc}</p>
          <p> <b>Descripcion: </b> ${element.Description} </p>
          <p> <b>Provincia: </b> ${element.Province} </p>
          <p> <b>Telefono: </b> ${element.PhoneNumber} </p>
          <p> <b>Categoria: </b> ${element.Stars} </p>
          
          <p> <b>Images: </b> <br><br>
          ${images}
          </div>`;
      }

      document.getElementById(element.Rnc).style.marginBottom = "50px";
      document.getElementById(element.Rnc).style.width = "30%";
      // document.getElementById(element.Rnc).style.borderStyle = "solid";
      // document.getElementById(element.Rnc).style.borderColor = "red";
    });
  });
