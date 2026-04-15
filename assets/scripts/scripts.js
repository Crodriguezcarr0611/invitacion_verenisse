function enviarConfirmacion() {
  Swal.fire({
    title: "¡Gracias por confirmar su asistencia!",
    text: "Estamos emocionados de contar con ustedes en nuestro día especial. ¡Nos vemos pronto!",
    icon: "success",
    // ANIMACIONES AQUÍ:
    showClass: {
      popup: "animate__animated animate__fadeInUp", // Aparece desde abajo
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutDown", // Desaparece hacia abajo
    },
    confirmButtonText: "Cerrar",
    customClass: {
      confirmButton:
        "btn btn-success mr-2 animate__animated animate__pulse animate__infinite",
    },
    allowOutsideClick: false, // Evita que se cierre al hacer clic fuera
    allowEscapeKey: false, // Evita que se cierre con la tecla Esc
    allowEnterKey: true, // Permite que el usuario use 'Enter' para entrar
  }).then((result) => {
    if (result.isConfirmed) {
      emailjs
        .send("service_7z4jaug", "template_vtyjaje", {
          to_name:
            "Nombre de invitados: Angélica y Analy- Confirmado para 02 personas",
          from_name: "Invitado Confirmado",
          message: "Angélica y Analy - Confirmado para 02 personas",
        })
        .then(
          function (response) {
            console.log(
              "Correo enviado exitosamente!",
              response.status,
              response.text,
            );
          },
          function (error) {
            console.error("Error al enviar el correo:", error);
          },
        );
    }
  });
}

// Función para activar la música
function activarMusica() {
  const musica = document.getElementById("musicaBoda");

  if (musica.paused) {
    musica
      .play()
      .then(() => {
        console.log("Reproducción iniciada con éxito");
        // Una vez que suena, quitamos los escuchadores para siempre
        removerEventos();
      })
      .catch((error) => {
        console.log("El navegador aún bloquea el audio: ", error);
      });
  }
}

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  Swal.fire({
    icon: "question",
    title: "¿Están listas?",
    iconColor: "green",
    // ANIMACIONES AQUÍ:
    showClass: {
      popup: "animate__animated animate__fadeInUp", // Aparece desde abajo
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutDown", // Desaparece hacia abajo
    },
    // BOTONES AQUÍ:
    confirmButtonText:
      '<i class="bi bi-heart-fill me-2" style="color: #e0245e"></i>Sí, estamos listas! <i class="bi bi-heart-fill me-2" style="color: #e0245e;"></i>',
    customClass: {
      confirmButton:
        "btn btn-warning mr-2 animate__animated animate__pulse animate__infinite",
    },
    showCancelButton: false,
    // LAS PROPIEDADES CRÍTICAS:
    allowOutsideClick: false, // Evita que se cierre al hacer clic fuera
    allowEscapeKey: false, // Evita que se cierre con la tecla Esc
    allowEnterKey: true, // Permite que el usuario use 'Enter' para entrar
  }).then((result) => {
    if (result.isConfirmed) {
      activarMusica();
    }
  });

  const musica = document.getElementById("musicaBoda");
  // Configurar un temporizador de 5000 milisegundos (5 segundos)
  setTimeout(function () {
    const loader = document.querySelector(".loader-container");
    const contenido = document.querySelector(".contenido-invitacion");

    if (loader) {
      // Añadimos una transición suave en lugar de borrarlo de golpe
      loader.style.transition = "opacity 1s ease";
      loader.style.opacity = "0";

      // Después de que termine la animación de opacidad (1s), lo quitamos del diseño
      setTimeout(() => {
        loader.style.display = "none";

        // Mostramos el contenido de la invitación
        if (contenido) {
          contenido.style.display = "block";
          musica.play().catch((error) => {
            console.log(
              "El navegador bloqueó el autoplay. Se requiere interacción.",
            );
          });
          contenido.style.opacity = "0";
          // Aparece suavemente la invitación
          setTimeout(() => (contenido.style.opacity = "1"), 50);
        }
      }, 1000);
    }
  }, 3000);
});
