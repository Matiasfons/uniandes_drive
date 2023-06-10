import { Server } from "../../helpers/server.js";

let loginButton = document.getElementById("login-button");
let email = document.getElementById("email");
let password = document.getElementById("password");
var dialog = document.getElementById('dialog');
let buttonModal = document.getElementById("button-modal");
let textModalTitle = document.getElementById("result-modal-title");
let textModalSubTitle = document.getElementById("result-modal-text");
let minValueLength = 3;


email.addEventListener("input", function () {
    if (parseInt(email.value.length) > minValueLength) {
        if (parseInt(password.value.length) > minValueLength) {
            loginButton.style.backgroundColor = "#5de99e";
            loginButton.style.color = "#ffff";
            email.style.border = "1px solid #fff";
    
        } else {
            loginButton.style.backgroundColor = "#000911";
            loginButton.style.color = "#acacac";
        }
        

    } else {
        loginButton.style.backgroundColor = "#000911";
        loginButton.style.color = "#acacac";
    }
});

password.addEventListener("input", function () {
    if (parseInt(password.value.length) > minValueLength) {
        if (parseInt(email.value.length) > minValueLength) {
            loginButton.style.backgroundColor = "#5de99e";
            loginButton.style.color = "#ffff";
            email.style.border = "1px solid #fff";
    
        } else {
            loginButton.style.backgroundColor = "#000911";
            loginButton.style.color = "#acacac";
        }

    } else {
        loginButton.style.backgroundColor = "#000911";
        loginButton.style.color = "#acacac";
    }
});

loginButton.addEventListener("click", async function () {
    if (parseInt(email.value.length) < minValueLength) {
        email.style.border = "1px solid #ec5252";
        email.focus();
    } else {
        email.style.border = "1px solid #fff";
    }
    if (parseInt(password.value.length) < minValueLength) {
        password.style.border = "1px solid #ec5252";
        password.focus();

    } else {
        password.style.border = "1px solid #fff";

    }

    if (parseInt(email.value.length) > minValueLength && parseInt(password.value.length) > minValueLength) {
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
          
            const login = await axios.post(
                server.loginPath,
              {
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
            localStorage.setItem('token',login.data.token);
            window.location.href = "../home/home.html";

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

document.addEventListener("mousemove", function(event) {
    var circle = document.getElementById("circle");
    var xPos = event.clientX;
    var yPos = event.clientY;
    circle.style.left = (xPos - (circle.offsetWidth / 2)) + "px";
    circle.style.top = (yPos - (circle.offsetHeight / 2)) + "px";
  });