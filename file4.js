const userInput = "<script>alert('xss')</script>";
document.body.innerHTML = "Hello " + userInput;

const password = "mySecret123";
console.log("Password:", password);

const url = "/api/user?id=" + userInput;
fetch(url);

eval("console.log('Executed')");

const dbQuery = "SELECT * FROM users WHERE id = " + userInput;
executeQuery(dbQuery);

const token = localStorage.getItem("authToken");
sendToServer(token);

function login(username, password) {
  if (username == "admin" && password == "1234") {
    isAdmin = true;
  }
}

const crypto = require("crypto");
crypto.createHash("md5").update("hello").digest("hex");
