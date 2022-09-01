let temp = [];
let imgArr = [];

function on() {
  document.getElementById("overlay").style.display = "block";
}
/* function habilitar_input(elemento) {
  v = elemento.value;
  var descripcion = document.getElementById("form-group-descripcion");
  var provincia = document.getElementById("form-group-provincia");
  var precio = document.getElementById("form-group-precio");
  var cupos = document.getElementById("form-group-cupo");
  var file_img = document.getElementById("form-group-img");
  var btn_send = document.getElementById("send");
  let limpiar = document.getElementById("limpiar");
  let inputHoraAm = document.getElementById("form-group-horaAM");
  let inputHoraPm = document.getElementById("form-group-horaPM");
  let reset = document.getElementById("reset");
  let horario = document.getElementById("form-group_horario");
  let btn_add = document.getElementById("btn_add");
  let services_container = document.getElementById(
    "form-group-services_container"
  );

  if (v == "Sitio Turistico") {
    provincia.style.display = "block";
    descripcion.style.display = "block";
    file_img.style.display = "block";
    btn_send.style.display = "block";
    limpiar.style.display = "block";
    reset.style.display = "block";
  } else if (v == "Actividad Turistica") {
    provincia.style.display = "block";
    precio.style.display = "block";
    // fecha.style.display = "block";
    inputHoraAm.style.display = "block";
    inputHoraPm.style.display = "block";
    cupos.style.display = "block";
    descripcion.style.display = "block";
    file_img.style.display = "block";
    btn_send.style.display = "block";
    btn_add.style.display = "block";
    services_container.style.display = "block";
    horario.style.display = "block";
    limpiar.style.display = "block";
    reset.style.display = "block";
  } else {
    provincia.style.display = "none";
    precio.style.display = "none";
    // fecha.style.display = "none";
    hora.style.display = "none";
    cupos.style.display = "none";
    descripcion.style.display = "none";
    file_img.style.display = "none";
    btn_send.style.display = "none";
    limpiar.style.display = "none";
    services_container.style.display = "none";
    horario.style.display = "none";
    btn_add.style.display = "none";
    reset.style.display = "none";
  }
} */

var marker; //variable del marcador
var coords = {}; //coordenadas obtenidas con la geolocalización

var coordsN = "";
var coordsW = "";

var AcoordsN = "";
var AcoordsW = "";

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
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: new google.maps.LatLng(coords.lat, coords.lng),
    disableDefaultUI: true,
  });

  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(coords.lat, coords.lng),
  });
  marker.addListener("click", toggleBounce);
  marker.addListener("dragend", function (event) {
    let cN = this.getPosition().lat();
    let cW = this.getPosition().lng();

    coordsN = cN;
    coordsW = cW;
  });
}
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function remove(toRemove) {
  let elem = document.getElementById(toRemove.className);
  elem.parentNode.removeChild(elem);
}

function getSelectedOption(elementId) {
  let x = document.getElementById(elementId);
  let y = x.options[x.selectedIndex].text;
  return y;
}
/*
 











*/

document.getElementById("inputSitio").addEventListener("change", () => {
  if (document.getElementById("inputSitio").value == "Sitio turistico") {
    document.getElementById("insert-into").innerHTML = "";
    document.getElementById(
      "insert-into"
    ).innerHTML += `<div id="form-group-provincia" class="form-group-provincia col-md-4">
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

    <div id="form-group-img" class="form-group-img col-md-6">
    <label for="nombre">Subir Imagenes</label><br>
    <input class="form-control" id="inputImg" type="file" accept="image/*" multiple>
    </div>

    <div id="form-group-descripcion" class="form-group-descripcion col-md-8">
    <label for="nombre">Descripcion General</label>
    <textarea class="form-control" id="destdescripcion" cols="47" rows="5" placeholder="Descripcion de Sitio Turistico" required></textarea>
    </div>
    </div>
    <div class="col-md-4">
            </div>
            
            <div class="button">
            <button id="send" class="btn btn-success" type="button">Guardar</button>
            </div>
    </form> <br>`;
  } else {
    document.getElementById("insert-into").innerHTML = "";
    document.getElementById(
      "insert-into"
    ).innerHTML += `<div id="form-group-provincia" class="form-group-provincia col-md-4">
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

    <div class="form-group-precio col-md-2" id="form-group-precio">
        <label for="">Precio</label>
        <input type="number" class="form-control" id="inputPrecio" placeholder="Precio por persona" onkeypress="return event.charCode >= 48" min="1">
    </div>

    <div class="form-group-cupo col-md-2" id="form-group-cupo">
        <label for="">Cupos</label>
        <input type="number" class="form-control" id="inputCupos" onkeypress="return event.charCode >= 48" min="1">
    </div>

    <div class="form-group-horaAM col-md-2" id="form-group-horaAM">
        <label for="">AM</label>
        <input type="time" class="form-control" id="inputHoraAm">
    </div>

    <div class="form-group-horaPM col-md-2" id="form-group-horaPM">
        <label for="inputName_Group4">PM</label>
        <input type="time" class="form-control" id="inputHoraPm">
    </div><br>  
    <div id="form-group_horario" class="form-group_horario col-md-6">
        <label for="servicios_adicionales">Horario</label>
        <div class="servicios_adi">
            <select id="horario" class="form-control" title="Debe ir seleccionado una a la vez">
                
                <option>Lunes</option>
                <option>Martes</option>
                <option>Miercoles</option>
                <option>Jueves</option>
                <option>Viernes</option>
                <option>Sabado</option>
                <option>Domingo</option>
                
            </select> 
            <button type="button" class="btn btn-info" id="btn_add">Agregar
            </button>
    </div>
    </div>
    <div id="form-group-services_container" class="col-md-6">
    <label for=""></label>
    <div id="servicios_add" class="servicios_add"></div>
    </div>
    <div id="form-group-img" class="form-group-img col-md-6">
    <label for="nombre">Subir Imagenes</label><br>
    <input class="form-control" id="inputImg" type="file" accept="image/*" multiple>
    </div>

    <div id="form-group-descripcion" class="form-group-descripcion col-md-8">
    <label for="nombre">Descripcion General</label>
    <textarea class="form-control" id="destdescripcion" cols="47" rows="5" placeholder="Descripcion de Sitio Turistico" required></textarea>
    </div>
    </div>
    
    <div class="col-md-4">
            </div>
            
            <div class="button">
            <button id="send" class="btn btn-success" type="button">Guardar</button>
            </div>
    </form> <br>`;
  }

  let days = [];
  if (document.getElementById("btn_add")) {
    let parent = document.getElementById("servicios_add");
    document.getElementById("btn_add").addEventListener("click", () => {
      //console.log(getSelectedOption("servicios_adicionales"));

      let combo = document.getElementById("horario");
      var selected = combo.options[combo.selectedIndex].text;

      let services = getSelectedOption("horario");
      if (days.includes(services)) {
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
        days.push(services);
      }
    });
  }

  document.getElementById("send").addEventListener("click", () => {
    let datosForm = new FormData();

    let destname = document.getElementById("destName").value;
    let destdescripcion = document.getElementById("destdescripcion").value;
    let inputType = getSelectedOption("inputSitio");
    let inputProvincia = getSelectedOption("inputProvincia");
    let temp = document.getElementById("inputImg").files;
    for (let i = 0; i < temp.length; i++) {
      imgArr.push(temp[i]);
    }
    console.log(imgArr);
    if (inputType == "Actividad turistica") {
      let precio = document.getElementById("inputPrecio").value;
      let cupo = document.getElementById("inputCupos").value;
      let inputHoraAm = document.getElementById("inputHoraAm").value;
      let inputHoraPm = document.getElementById("inputHoraPm").value;
      let hora = inputHoraAm + "AM - " + inputHoraPm + "PM";
      let horario = getSelectedOption("horario");

      for (let i = 0; i < temp.length; i++) {
        const element = temp[i];

        datosForm.append("file", element);
      }

      if (
        destname == "" ||
        destname == " " ||
        inputProvincia == "" ||
        inputProvincia == " " ||
        precio == "" ||
        precio == " " ||
        cupo == "" ||
        cupo == " " ||
        inputType == "" ||
        inputType == " " ||
        hora == "" ||
        hora == " " ||
        destdescripcion == "" ||
        destdescripcion == " " ||
        inputImg == null
      ) {
        alert("error. no se permiten campos vacios.");
      } else {
        datosForm.append("name", destname);
        datosForm.append("coordN", coordsN);
        datosForm.append("coordW", coordsW);
        datosForm.append("province", inputProvincia);
        datosForm.append("price", precio);
        datosForm.append("cupo", cupo);
        datosForm.append("description", destdescripcion);
        datosForm.append("idOwner", 0);
        datosForm.append("hours", hora);
        datosForm.append("date", days);

        on();

        fetch(
          "https://finalproject-309315.uc.r.appspot.com/activities/register",
          {
            method: "POST",

            mode: "cors",
            body: datosForm,
          }
        )
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            location.reload();
          });
      }
    }

    if (inputType == "Sitio turistico") {
      if (
        destname == "" ||
        destname == " " ||
        inputProvincia == "" ||
        inputProvincia == " " ||
        destdescripcion == "" ||
        destdescripcion == " " ||
        inputType == "" ||
        inputType == " " ||
        inputImg == null
      ) {
        alert("error. no se permiten campos vacios.");
      } else {
        for (let i = 0; i < imgArr.length; i++) {
          const element = imgArr[i];

          datosForm.append("file", element);
        }

        datosForm.append("idOwner", 0);
        datosForm.append("name", destname);
        datosForm.append("province", inputProvincia);
        datosForm.append("type", inputType);
        datosForm.append("description", destdescripcion);
        datosForm.append("coordN", coordsN);
        datosForm.append("coordW", coordsW);

        on();

        fetch("http://1c97533161db.ngrok.io/destination/register", {
          method: "POST",

          mode: "cors",
          body: datosForm,
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            location.reload();
          });
      }
    }
  });
});

/* let miformulario = document.getElementById("miformulario");
let btnLimpiar = document.getElementById("btnLimpiar");
let btnReset = document.getElementById("btnReset");

miformulario.btnLimpiar.addEventListener("click", function() {
    if (!confirm("¿Desea Limpiar el Formulario?"))
    event.preventDefault();
});
miformulario.btnReset.addEventListener("click", function() {
    if (confirm("Desea Restablecer el Formulario?")){
    var descripcion = document.getElementById("form-group-descripcion");
    var provincia = document.getElementById("form-group-provincia");
    var precio = document.getElementById("form-group-precio");
    var cupos = document.getElementById("form-group-cupo");
    var file_img = document.getElementById("form-group-img");
    var btn_send = document.getElementById("send");
    let limpiar = document.getElementById("limpiar");
    let inputHoraAm = document.getElementById("form-group-horaAM");
    let inputHoraPm = document.getElementById("form-group-horaPM");
    let reset = document.getElementById("reset");
    let horario = document.getElementById("form-group_horario");
    let btn_add = document.getElementById("btn_add");
    let services_container = document.getElementById("form-group-services_container");
    document.getElementById("destName").value="";
    document.getElementById("inputSitio").value="";

        provincia.style.display = "none";
        precio.style.display = "none";
        inputHoraAm.style.display = "none";
        inputHoraPm.style.display = "none";
        cupos.style.display = "none";
        descripcion.style.display = "none";
        file_img.style.display = "none";
        btn_send.style.display = "none";
        limpiar.style.display = "none";
        services_container.style.display = "none";
        horario.style.display = "none";
        btn_add.style.display = "none";
        reset.style.display = "none";
    }

}); */

function select() {
  let array = document.getElementById("inputProvincia").value.split(",");

  let coords = {
    lng: array[1],
    lat: array[0],
  };

  setMapa(coords);
}
