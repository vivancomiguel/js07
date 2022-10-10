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
        data.forEach(persona => {
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
    }
  })
  .catch(error => console.log(error))
}
/* Informacion que retorna el usuario
    Nombre
    Apellido
    ID (No mostrar)
    Foto de perfil
    Correo
 */

function asignarLocalStorage(){
  /* let objUser = document.getElementById("user-name");
  let objEmail = document.getElementById("user-email");
  //  localStorge.setItem('clave','valor');
  let user = {
    name: objUser.value,
    email: objEmail.value,
    time: Date.now()+60000 // leer tiempo actual y sumarle 1 minuto tiempo en ms
  }
  localStorage.setItem("name", objUser.value);
  localStorage.setItem("email", objEmail.value);
  // Para convertir un onjeto a JSON: JSON.stringify( objeto )
  localStorage.setItem("user", JSON.stringify(user)); */
}

function solicitarLocalStorage(){
  /* let objUser = document.getElementById("user-name");
  let objEmail = document.getElementById("user-email");
  // Convertir de JSON a objeto es con: JSON.parse( texto );
  const user = JSON.parse(localStorage.getItem("user"));
  objUser.value = user.name;
  objEmail.value= user.email; */
}


// LLAMADO DE LOS ELEMENTOS DEL DOM
const btn = document.getElementById("cargar");
const tcontent = document.getElementById("tcontent");

// EVENT LISTENERS
btn.addEventListener('click', (event)=>{
  // solicitarDatos("https://reqres.in/api/users?delay=3");
  solicitarDatos("https://reqres.in/api/users?delay=3");
})