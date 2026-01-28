function authenticate(user, pass) {
  if (user == "admin" && pass == "admin123") {
    return true;
  }
  return false;
}
