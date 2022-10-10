// FUNCIONES
/**
 * 
 * @param {'string'} url Dirección de la ruta a la cual se le van a obtener los datos
 * @returns Retorna un resultado asincrono con los datos formato JSON obtenidos del url consultado
 */
function solicitarDatos(url){
  return fetch(url)
  .then(respuesta=>respuesta.json())
  .then(cuerpo=>{
    console.log(cuerpo);
    if(cuerpo && !tcontent.hasChildNodes()){
      const {data} = cuerpo;
      console.log(data);
      if(data){
        construccionTabla(data);
        asignarLocalStorage(data);
      }
    }
  })
  .catch(error => console.log(error))
}

function asignarLocalStorage(data){
  let localData = {
    data,
    fecha: Date.now()+60000
  }
  localStorage.setItem("localData", JSON.stringify(localData));
}

function solicitarLocalStorage(){
  const local = JSON.parse(localStorage.getItem("localData"));
  construccionTabla(local.data);
}

// Funcion que agrega el contenido de la tabla segun el numero de datos recibido
function construccionTabla(arregloDeDatos){
  arregloDeDatos.forEach(persona => {
    console.log(persona);
    // Nuevos elementos
    const nuevaFila = document.createElement("div");
    const idCol = document.createElement("div"); 
    const fotoCol = document.createElement("div"); 
    const nombreCol = document.createElement("div"); 
    const apellidoCol = document.createElement("div"); 
    const correoCol = document.createElement("div");
    const foto = document.createElement("img");
    // Asignacion de atributos
    nuevaFila.setAttribute("class","row text-center align-items-center py-2");
    idCol.setAttribute("class","col-1 d-none d-sm-block");
    fotoCol.setAttribute("class","col-3 d-none d-sm-block");
    nombreCol.setAttribute("class","col-4 col-sm-2 text-truncate");
    apellidoCol.setAttribute("class","col-3 col-sm-2 text-truncate");
    correoCol.setAttribute("class","col-5 col-sm-4 text-truncate");
    foto.setAttribute("class","rounded-circle");
    foto.setAttribute("src",persona.avatar);
    // Asignacion de valores
    idCol.innerText = persona.id;
    nombreCol.innerText = persona.first_name;
    apellidoCol.innerText = persona.last_name;
    correoCol.innerText = persona.email;
    // Union de elementos
    fotoCol.appendChild(foto);
    nuevaFila.appendChild(idCol);
    nuevaFila.appendChild(fotoCol);
    nuevaFila.appendChild(nombreCol);
    nuevaFila.appendChild(apellidoCol);
    nuevaFila.appendChild(correoCol);
    tcontent.appendChild(nuevaFila);
  });
}


// LLAMADO DE LOS ELEMENTOS DEL DOM
const btn = document.getElementById("cargar");
const tcontent = document.getElementById("tcontent");

// EVENT LISTENERS
btn.addEventListener('click', (event)=>{
  const contenidolocal = JSON.parse( localStorage.getItem("localData") );
  if(contenidolocal && contenidolocal.fecha > Date.now()){
    solicitarLocalStorage();
  }else{
    solicitarDatos("https://reqres.in/api/users?delay=3");
  }
})