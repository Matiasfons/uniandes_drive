import { Server } from "../../helpers/server.js";

let registerButton = document.getElementById("login-button");
let buttonModal = document.getElementById("button-modal");

let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
var dialog = document.getElementById('dialog');
let textModalTitle = document.getElementById("result-modal-title");
let textModalSubTitle = document.getElementById("result-modal-text");

let minValueLength = 3;
email.addEventListener("input", function () {
  if (parseInt(email.value.length) > minValueLength) {
    email.style.border = "1px solid #fff";

    if (parseInt(password.value.length) > minValueLength) {
      if (parseInt(name.value.length) > minValueLength) {
        registerButton.style.backgroundColor = "#5de99e";
        registerButton.style.color = "#ffff";

      } else {
        registerButton.style.backgroundColor = "#000911";
        registerButton.style.color = "#acacac";
      }

    } else {
      registerButton.style.backgroundColor = "#000911";
      registerButton.style.color = "#acacac";
    }


  } else {
    registerButton.style.backgroundColor = "#000911";
    registerButton.style.color = "#acacac";
  }
});

password.addEventListener("input", function () {
  if (parseInt(password.value.length) > minValueLength) {
    password.style.border = "1px solid #fff";

    if (parseInt(email.value.length) > minValueLength) {
      if (parseInt(name.value.length) > minValueLength) {
        registerButton.style.backgroundColor = "#5de99e";
        registerButton.style.color = "#ffff";

      } else {
        registerButton.style.backgroundColor = "#000911";
        registerButton.style.color = "#acacac";
      }

    } else {
      registerButton.style.backgroundColor = "#000911";
      registerButton.style.color = "#acacac";
    }

  } else {
    registerButton.style.backgroundColor = "#000911";
    registerButton.style.color = "#acacac";
  }
});

name.addEventListener("input", function () {
  if (parseInt(name.value.length) > minValueLength) {
    name.style.border = "1px solid #fff";

    if (parseInt(email.value.length) > minValueLength) {
      if (parseInt(password.value.length) > minValueLength) {
        registerButton.style.backgroundColor = "#5de99e";
        registerButton.style.color = "#ffff";

      } else {
        registerButton.style.backgroundColor = "#000911";
        registerButton.style.color = "#acacac";
      }

    } else {
      registerButton.style.backgroundColor = "#000911";
      registerButton.style.color = "#acacac";
    }

  } else {
    registerButton.style.backgroundColor = "#000911";
    registerButton.style.color = "#acacac";
  }
});

registerButton.addEventListener("click", async function () {
  if (parseInt(email.value.length) < minValueLength) {
    email.style.border = "1px solid #ec5252";
  } else {
    email.style.border = "1px solid #fff";
  }
  if (parseInt(password.value.length) < minValueLength) {
    password.style.border = "1px solid #ec5252";

  } else {
    password.style.border = "1px solid #fff";

  }

  if (parseInt(name.value.length) < minValueLength) {
    name.style.border = "1px solid #ec5252";

  } else {
    name.style.border = "1px solid #fff";

  }

  if (parseInt(email.value.length) > minValueLength && parseInt(password.value.length) > minValueLength && parseInt(name.value.length) > minValueLength) {
    //TODO LOGIN
    const r = new rive.Rive({
      src: "../../assets/loading.riv",
      canvas: document.getElementById("canvas"),
      autoplay: true,
      stateMachines: "Flame preview",
      onLoad: () => {
        r.startRendering();
      },
    });
    dialog.style.display = 'block';
    try {
      const server = new Server();

      const createUser = await axios.post(
        server.registerPath,
        {
          name: name.value,
          email: email.value,
          password: password.value
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      dialog.style.display = 'none';
      textModalTitle.textContent = "Registrado";
      textModalSubTitle.textContent = "Continuar a la ventana de login";
      buttonModal.style.backgroundColor = "#4CAF50";
      buttonModal.style.color = "white";

      buttonModal.addEventListener("click", function (event) {
        window.location.href = "../login/login.html";
      });

      var modal = document.getElementById("modal-result");
      var bootstrapModal = new bootstrap.Modal(modal, {
        backdrop: 'static',
        keyboard: false
      });
      bootstrapModal.show();

    } catch (error) {
      dialog.style.display = 'none';
      textModalTitle.textContent = "Error";
      textModalSubTitle.textContent = error.response.data.data.toString();
      buttonModal.style.backgroundColor = "#FF4C4C";
      buttonModal.style.color = "white";
      var modal = document.getElementById("modal-result");
      // Muestra el modal
      var bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }


  }
});

document.addEventListener("mousemove", function (event) {
  var circle = document.getElementById("circle");
  var xPos = event.clientX;
  var yPos = event.clientY;
  circle.style.left = (xPos - (circle.offsetWidth / 2)) + "px";
  circle.style.top = (yPos - (circle.offsetHeight / 2)) + "px";
});







