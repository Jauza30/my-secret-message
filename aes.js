function encrypt() {
    var plaintext = document.getElementById("plaintext").value;
    var key = document.getElementById("key").value;
    var algorithm = document.getElementById("algorithm").value;
    var ciphertext;

    // Validasi panjang key
    if (algorithm === "AES") {
        if (key.length < 16) { // Panjang key AES minimal 16 karakter (128 bit)
            alert("Panjang key AES harus minimal 16 karakter");
            return;
        }
    } else if (algorithm === "RC4") {
        if (key.length < 5 || key.length > 32) { // Panjang key RC4 antara 40 hingga 256 bit (5 hingga 32 karakter hex)
            alert("Panjang key RC4 harus antara 5 dan 32 karakter");
            return;
        }
    }
    
    if (algorithm === "AES") {
        ciphertext = CryptoJS.AES.encrypt(plaintext, key).toString();
    } else if (algorithm === "RC4") {
        ciphertext = RC4.encrypt(plaintext, key);
    }

    document.getElementById("ciphertext").value = ciphertext;
}

function decrypt() {
    var ciphertext = document.getElementById("ciphertext").value;
    var key = document.getElementById("key").value;
    var algorithm = document.getElementById("algorithm").value;
    var plaintext;

    if (algorithm === "AES") {
        var bytes = CryptoJS.AES.decrypt(ciphertext, key);
        plaintext = bytes.toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "RC4") {
        plaintext = RC4.decrypt(ciphertext, key);
    }

    document.getElementById("plaintext").value = plaintext;
}

function clearFields() {
    document.getElementById("plaintext").value = "";
    document.getElementById("ciphertext").value = "";
    document.getElementById("key").value = "";
}
