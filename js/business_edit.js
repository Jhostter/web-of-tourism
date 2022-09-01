// --------------------- MAP -------------------

var marker; //variable del marcador
var coords = {}; //coordenadas obtenidas con la geolocalización

var coordsN = "";
var coordsW = "";

//Funcion principal
initMap = function () {
  //usamos la API para geolocalizar el usuario
  navigator.geolocation.getCurrentPosition(
    function (position) {
      coords = {
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      };
      setMapa(coords); //pasamos las coordenadas al metodo para crear el mapa
    },
    function (error) {
      alert(
        "Se produjo un error. Permita el acceso a su ubicacion en su navegador"
      );
    }
  );
};

function setMapa(coords) {
  //Se crea una nueva instancia del objeto mapa
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: new google.maps.LatLng(coords.lat, coords.lng),
    disableDefaultUI: true,
  });

  //Creamos el marcador en el mapa con sus propiedades
  //para nuestro obetivo tenemos que poner el atributo draggable en true
  //position pondremos las mismas coordenas que obtuvimos en la geolocalización
  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(coords.lat, coords.lng),
  });
  //agregamos un evento al marcador junto con la funcion callback al igual que el evento dragend que indica
  //cuando el usuario a soltado el marcador
  marker.addListener("click", toggleBounce);

  marker.addListener("dragend", function (event) {
    let cN = this.getPosition().lat();
    let cW = this.getPosition().lng();

    coordsN = cN;
    coordsW = cW;

    console.log(coordsN + "," + coordsW);
  });
}

//callback al hacer clic en el marcador lo que hace es quitar y poner la animacion BOUNCE
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}


// --------------------------------- EDIT BUSINESS ---------------------------------------------------

document.getElementById("inputNegocio").addEventListener("change", () => {
  if (document.getElementById("inputNegocio").value == "Restaurante") {
    document.getElementById("insert-into").innerHTML = "";
    document.getElementById("insert-into").innerHTML += `

    
           <div id="form-group-provincia" class="form-group-provincia col-md-4">
        <label for="inputProvincia">Provincia</label>
        <select id="inputProvincia" class="form-control" onchange="select()">
        <option value="" selected disabled></option>
      <option value="18.473191350955155,-69.93383680605942">Santo Domingo</option>
      <option value="18.46149912378292,-69.30558998456056">San Pedro de Macoris</option>
      <option value="19.582593670027762,-70.78183855115118">Santiago</option>
      <option value="18.536998378402565,-70.11920802006134">San Cristóbal</option>
      <option value="19.095373113320335,-70.62253680388179">Jarabacoa</option>
      <option value="19.77939151740059,-70.68938244160448">Puerto Plata</option>
      <option value="19.276954780578436,-69.35361598942558">Samana</option>
      <option value="19.91347934909595,-71.5838404511971">Monte Cristi</option>
      <option value="18.48172323397551,-68.92514922090787">La Romana</option>
      <option value="18.273202849397634,-71.15537368267942">Barahona</option>
      <option value="19.61106456441992,-70.3129789977627">Espaillat</option>
      <option value="18.520813711149216,-70.75460414976827">Azua</option>
      <option value="18.833025643867508,-69.78070945374874">Monte Plata</option>
      <option value="18.27059475208521,-70.31903949097384">Bani</option>
      <option value="18.570267820976966,-68.35248682876451">Punta Cana</option>
      <option value="18.59565081571994,-71.25734060605247">San Juan</option>
      <option value="19.064337848625396,-70.49980796967215">Monseñor Nouel</option>
      <option value="19.18500497174158,-70.69550193599044">La Vega</option>
      <option value="19.292622529286685,-70.2629152749756">San Francisco de Macoris</option>
      <option value="19.28290095176137,-70.02052941139944">Duarte</option>
      <option value="18.922798958358364,-69.40804161779431">Hato Mayor</option>
      <option value="19.379785048981756,-70.3651279092904">Hermanas Mirabal</option>
      <option value="18.773349159916116,-69.03793579532845">El Seibo</option>
      <option value="19.382979624992632,-69.84145424710998">Nagua</option>
      <option value="19.566966949134468,-71.70872924096774">Dajabón</option>
      <option value="18.887061172331578,-71.70531740687105">Elías Piña</option>
      <option value="18.55558325741474,-70.5068850727312">San José de Ocoa</option>
      <option value="19.47994783530399,-71.34193139775272">Santiago Rodríguez</option>
      <option value="18.80679052569381,-71.61643287739788">Independencia</option>
      <option value="18.012199852758595,-71.73215587106861">Pedernales</option>
    </select>
    </div> 
            <div id="form-group-concept-neg" class="form-group-concept-neg col-md-3">
            <label for="">Concepto de Negocio</label>
            <select class="form-control" id="businessConcept" class="form-control" title="concepto">
            <option value="" selected></option>
            <option>Comida rapida</option>
            <option>Chino</option>
            <option>Otro</option>
            </select>
            </div>
            <div id="form-group-telf" class="form-group-telf col-md-3">
            <label for="inputTelefono">Telefono</label>
            <input type="tel" class="form-control" id="inputTelefono" placeholder="(###) ### ####">
            </div>
            <div id="form-group-img" class="form-group-img col-md-6">
            <label for="nombre">Subir Imagenes</label><br>
            <input class="form-control" id="inputImg" type="file" accept="image/*" multiple>
            </div>
            <div id="form-group-desc-adic" class="form-group-desc-adic col-md-8">
            <label for="">Descripcion General</label>
            <textarea cols="47" rows="5" class="form-control" type="text" id="description" placeholder="Descripcion General"></textarea>
            </div>
            </div>

            <div class="col-md-4">
            </div>
          
            </form>
            <br>
            </div>`;
    //habilitar_input();
  } else if (document.getElementById("inputNegocio").value == "Hotel") {
    document.getElementById("insert-into").innerHTML = "";
    document.getElementById("insert-into").innerHTML += `
   
   <div id="form-group-provincia" class="form-group-provincia col-md-4">
        <label for="inputProvincia">Provincia</label>
        <select id="inputProvincia" class="form-control" onchange="select()">
        <option value="" selected disabled></option>
      <option value="18.473191350955155,-69.93383680605942">Santo Domingo</option>
      <option value="18.46149912378292,-69.30558998456056">San Pedro de Macoris</option>
      <option value="19.582593670027762,-70.78183855115118">Santiago</option>
      <option value="18.536998378402565,-70.11920802006134">San Cristóbal</option>
      <option value="19.095373113320335,-70.62253680388179">Jarabacoa</option>
      <option value="19.77939151740059,-70.68938244160448">Puerto Plata</option>
      <option value="19.276954780578436,-69.35361598942558">Samana</option>
      <option value="19.91347934909595,-71.5838404511971">Monte Cristi</option>
      <option value="18.48172323397551,-68.92514922090787">La Romana</option>
      <option value="18.273202849397634,-71.15537368267942">Barahona</option>
      <option value="19.61106456441992,-70.3129789977627">Espaillat</option>
      <option value="18.520813711149216,-70.75460414976827">Azua</option>
      <option value="18.833025643867508,-69.78070945374874">Monte Plata</option>
      <option value="18.27059475208521,-70.31903949097384">Bani</option>
      <option value="18.570267820976966,-68.35248682876451">Punta Cana</option>
      <option value="18.59565081571994,-71.25734060605247">San Juan</option>
      <option value="19.064337848625396,-70.49980796967215">Monseñor Nouel</option>
      <option value="19.18500497174158,-70.69550193599044">La Vega</option>
      <option value="19.292622529286685,-70.2629152749756">San Francisco de Macoris</option>
      <option value="19.28290095176137,-70.02052941139944">Duarte</option>
      <option value="18.922798958358364,-69.40804161779431">Hato Mayor</option>
      <option value="19.379785048981756,-70.3651279092904">Hermanas Mirabal</option>
      <option value="18.773349159916116,-69.03793579532845">El Seibo</option>
      <option value="19.382979624992632,-69.84145424710998">Nagua</option>
      <option value="19.566966949134468,-71.70872924096774">Dajabón</option>
      <option value="18.887061172331578,-71.70531740687105">Elías Piña</option>
      <option value="18.55558325741474,-70.5068850727312">San José de Ocoa</option>
      <option value="19.47994783530399,-71.34193139775272">Santiago Rodríguez</option>
      <option value="18.80679052569381,-71.61643287739788">Independencia</option>
      <option value="18.012199852758595,-71.73215587106861">Pedernales</option>
    </select>
    </div>
    <div id="form-group-categoria" class="form-group-categoria col-md-3">
            <label for="inputCategoria">Categoria</label>
            <select id="inputCategoria" class="form-control">
            <option selected>Eliga</option>
            <option id="option1">1 Estrella (Economico)</option>
            <option id="option2">2 Estrellas (Valor)</option>
            <option id="option3">3 Estrellas (Calidad)</option>
            <option id="option4">4 Estrellas (Superior)</option>
            <option id="option5">5 Estrellas (Excepcional)</option>
            </select>
            </div>
            
            
            <div id="form-group-telf" class="form-group-telf col-md-3">
            <label for="inputTelefono">Telefono</label>
            <input type="tel" class="form-control" id="inputTelefono" placeholder="(###) ### ####">
            </div>
            
            <div id="form-group-img" class="form-group-img col-md-6">
            <label for="nombre">Subir Imagenes</label><br>
            <input class="form-control" id="inputImg" type="file" accept="image/*" multiple>
            </div>
            <div id="form-group_serv-adic" class="form-group_serv-adic col-md-6">
            <label for="servicios_adicionales">Servicios Adicionales</label>
            <div class="servicios_adi">
            <select id="servicios_adicionales" class="form-control" title="Debe ir seleccionado una a la vez">
            <option selected></option>
            <option>Minibar</option>
            <option>Piscinas</option>
            <option>Saunas</option>
            <option>Wi-Fi</option>
            <option>Servicio de TV</option>
            <option>Tiendas</option>
            <option>Peluqueria</option>
            <option>Guias Turisticas</option>
            <option>Gimnasio</option>
            <option>Sala Fitness</option>
            <option>Salas de Eventos</option>
            </select>
            <button type="button" class="btn btn-info" id="btn_add">Agregar</button>
            </div>
            </div>
            <div id="form-group-services_container" class="col-md-4">
            <label for=""></label>
            <div id="servicios_add" class="servicios_add">
            </div>
            </div>
            <div id="form-group-desc-adic" class="form-group-desc-adic col-md-8">
            <label for="">Descripcion General</label>
            <textarea cols="47" rows="5" class="form-control" type="text" id="description" placeholder="Descripcion General"></textarea>
            </div>
            </div>

            <div class="col-md-4">
            </div>
            
            
            `;

        }
if (document.getElementById("hotelRooms")) {
    document.getElementById("hotelRooms").addEventListener("change", () => {
      if (document.getElementById("hotelRooms").value <= 0) {
        document.getElementById("hotelRooms").value = 1;
      }
    });
  }
  if (document.getElementById("saveBtn")) {
    if (document.getElementById("inputNegocio").value == "Hotel") {
      let parent = document.getElementById("servicios_add");

      document.getElementById("btn_add").addEventListener("click", () => {
        //console.log(getSelectedOption("servicios_adicionales"));

        let combo = document.getElementById("servicios_adicionales");
        var selected = combo.options[combo.selectedIndex].text;

        let services = getSelectedOption("servicios_adicionales");
        if (hotelServices.includes(services)) {
          console.log("rep");
        } else {
          if (selected == "") {
            console.log("ola");
          } else {
            parent.innerHTML +=
              `<div id="` +
              selected +
              `" class="hotelService">` +
              selected +
              `<button class="` +
              selected +
              `" type="button" onclick="remove(this);">x</button> </div>`;
          }
          hotelServices.push(services);
        }
      });
    }

    document.getElementById("saveBtn").addEventListener("click", () => {
      if (document.getElementById("inputNegocio").value == "Hotel") {
        let businessName = document.getElementById("businessName").value;
        let businessRnc = document.getElementById("rnc").value;
        let businessDescription = document.getElementById("description").value;

        let businessType = getSelectedOption("inputNegocio");
        let hotelStars = getSelectedOption("inputCategoria");
        let businessProvince = getSelectedOption("inputProvincia");
        let businessPhoneNumber = document.getElementById("inputTelefono")
          .value;
        let hotelRooms = document.getElementById("hotelRooms").value;
        let temp = document.getElementById("inputImg").files;
        let services = getSelectedOption("servicios_adicionales").value;

        for (let i = 0; i < temp.length; i++) {
          imgArr.push(temp[i]);
        }

        if (
          businessName == "" ||
          businessName == " " ||
          businessProvince == "" ||
          businessProvince == " " ||
          businessDescription == "" ||
          businessDescription == " " ||
          businessType == "" ||
          businessType == " " ||
          businessPhoneNumber == "" ||
          businessPhoneNumber == " " ||
          businessRnc == "" ||
          businessRnc == " " ||
          inputImg == null
        ) {
          alert("error. No se permiten campos vacios");
          return false;
        } else {
          var datosForm = new FormData();
          datosForm.append("idOwner", checkCookie().id);
          for (let i = 0; i < temp.length; i++) {
            const element = temp[i];

            datosForm.append("file", element);
          }
          datosForm.append("name", businessName);
          datosForm.append("coordN", coordsN);
          datosForm.append("coordW", coordsW);
          datosForm.append("province", businessProvince);
          datosForm.append("hotelRooms", hotelRooms);
          datosForm.append("description", businessDescription);
          datosForm.append("type", businessType);
          datosForm.append("telefono", businessPhoneNumber);
          datosForm.append("rnc", businessRnc);
          datosForm.append("hotelStars", hotelStars);
          datosForm.append("services", hotelServices);
        }
      } else {
        let businessName = document.getElementById("businessName").value;
        let businessRnc = document.getElementById("rnc").value;
        let businessDescription = document.getElementById("description").value;
        let businessConcept = getSelectedOption("businessConcept");
        let businessType = getSelectedOption("inputNegocio");
        let businessProvince = getSelectedOption("inputProvincia");
        let businessPhoneNumber = document.getElementById("inputTelefono")
          .value;
        let temp = document.getElementById("inputImg").files;

        for (let i = 0; i < temp.length; i++) {
          imgArr.push(temp[i]);
        }

        if (
          businessName == "" ||
          businessName == " " ||
          businessProvince == "" ||
          businessProvince == " " ||
          businessDescription == "" ||
          businessDescription == " " ||
          businessType == "" ||
          businessType == " " ||
          businessPhoneNumber == "" ||
          businessPhoneNumber == " " ||
          businessRnc == "" ||
          businessRnc == " " ||
          businessConcept == "" ||
          businessConcept == " " ||
          inputImg == null
        ) {
          alert("error. No se permiten campos vacios");
          event.preventDefault();
        } else {
          var datosForm = new FormData();
          datosForm.append("idOwner", checkCookie().id);
          for (let i = 0; i < temp.length; i++) {
            const element = temp[i];

            datosForm.append("file", element);
          }
          datosForm.append("name", businessName);
          datosForm.append("coordN", coordsN);
          datosForm.append("coordW", coordsW);
          datosForm.append("province", businessProvince);
          datosForm.append("description", businessDescription);
          datosForm.append("type", businessType);
          datosForm.append("phoneNumber", businessPhoneNumber);
          datosForm.append("rnc", businessRnc);
          datosForm.append("concept", businessConcept);
        }
      }

      for (let pair of datosForm.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      on();

      fetch("https://finalproject-309315.uc.r.appspot.com/business/register", {
        method: "POST",

        mode: "cors",
        body: datosForm,
      })
        .then((resp) => resp.json())
        .then((data) => {
          let a = data;
          window.location.replace(location.origin + "/");
        });
    });
  }
});

function select() {
  let array = document.getElementById("inputProvincia").value.split(",");

  let coords = {
    lng: array[1],
    lat: array[0],
  };

  setMapa(coords);
}

