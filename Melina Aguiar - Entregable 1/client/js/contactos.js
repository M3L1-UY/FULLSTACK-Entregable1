var apiUrl = "http://localhost:3000/json/mensajes";

function guardarMensaje() {
  nombre = document.getElementById("nombre").value;
  cel = document.getElementById("cel").value;
  email = document.getElementById("email").value;
  mensaje = document.getElementById("mensaje").value;

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      nombre, 
      cel,
      email,
      mensaje,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.exito) {
        alert(data.message)
      } else {
        alert(data.message);
        document.getElementById("formContacto").reset();
      }
  })
  .catch((error) => {
    alert(error);
  });
}


function listarMensajes() {
  fetch(apiUrl, {
    method: "GET",
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.length ===0)
      {
      var tablaMensajes = document.getElementById("tablaMensajes");
        tablaMensajes.innerHTML = "No hay mensajes aún para listar."
      }
      else
      {
        var tablaMensajes = document
        .getElementById("tablaMensajes")
        .getElementsByTagName("tbody")[0];
      tablaMensajes.innerHTML = "";
      data.forEach( (mensaje) => {
        var fila = tablaMensajes.insertRow();
        var celdaId = fila.insertCell(0);
        var celdaNombre = fila.insertCell(1);
        var celdaCel = fila.insertCell(2);
        var celdaMail = fila.insertCell(3);
        var celdaMensaje = fila.insertCell(4);
        var celdaEliminar = fila.insertCell(5);

        celdaId.setAttribute("data-column", "ID");
        celdaNombre.setAttribute("data-column", "NOMBRE");
        celdaCel.setAttribute("data-column", "CEL");
        celdaMail.setAttribute("data-column", "MAIL");
        celdaMensaje.setAttribute("data-column", "MENSAJE");
        celdaEliminar.setAttribute("data-column", "ELIMINAR")
        celdaId.innerHTML = mensaje.id;
        celdaNombre.innerHTML = mensaje.nombre;
        celdaCel.innerHTML = mensaje.cel;
        celdaMail.innerHTML = mensaje.email;
        celdaMensaje.innerHTML = mensaje.mensaje;

        var eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.addEventListener("click", function (){
          eliminarMensaje(mensaje.id)
        })

        eliminarBtn.classList.add("btn");
        celdaEliminar.appendChild(eliminarBtn);
      
      });     }
    }) 
    .catch((error) => {
      console.log(error.message);
    });
}

function eliminarMensaje(id) {
  fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  })
   .then((resp) => {
    if (resp.status === 204) {
      alert("Mensaje eliminado correctamente")
    }
  })
  .catch((error) => {
    alert(error)
  });
}

var mySwiper = new Swiper(".swiper-container", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

function toggleMenu() {
  var menu = document.querySelector("nav ul");
  menu.classList.toggle("active");
}