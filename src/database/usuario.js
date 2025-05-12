import fs from "fs";
import path from "path";

const filePath = path.resolve("./src/database/usuarios.json");

const dirname = path.dirname(filePath);
if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname, { recursive: true });
}

function loadUser() {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
    return [];
  }
}

const usuarios = loadUser();

function saveUser(users) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Erro ao salvar usuários:", error);
  }
}

function addUser(newUser) {
  const users = loadUser();
  newUser.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  users.push(newUser);
  saveUser(users);
}

export { usuarios, saveUser, addUser, loadUser };