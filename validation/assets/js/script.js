
function validateForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    if (!/^[a-zA-Z ]+$/.test(name)) {
        alert("Enter a valid name.");
        return false;
    }

    for (let ch of name) {
        if (!((ch >= "A" && ch <= "Z") ||
              (ch >= "a" && ch <= "z") || ch === " ")) {
            alert("Name must contain only letters and spaces.");
            return false;
        }
    }

    let at = email.indexOf("@");
    let dot = email.lastIndexOf(".");

    if (at < 1 || dot < at + 2 || dot === email.length - 1) {
        alert("Enter a valid email address.");
        return false;
    }

    if (mobile.length !== 10) {
        alert("Mobile number must contain exactly 10 digits.");
        return false;
    }

    for (let ch of mobile) {
        if (ch < "0" || ch > "9") {
            alert("Mobile number must contain only digits.");
            return false;
        }
    }

    if (username === "") {
        alert("Username cannot be empty.");
        return false;
    }

    let upper = false, lower = false;
    let digit = false, special = false;

    for (let ch of password) {
        if (ch >= "A" && ch <= "Z") upper = true;
        else if (ch >= "a" && ch <= "z") lower = true;
        else if (ch >= "0" && ch <= "9") digit = true;
        else special = true;
    }

    if (password.length < 8 || !upper || !lower ||
        !digit || !special) {
        alert("Password needs 8 characters, uppercase, lowercase, digit and special character.");
        return false;
    }

    alert("Registration successful!");
    return true;
}
