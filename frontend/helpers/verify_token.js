var token = localStorage.getItem('token');

if (token) {
    console.log('El token existe:', token);
} else {
    window.location.href = "../login/login.html";
}