const fs = require("fs").promises;
const dataFilePath = "./src/json/data.json";

const getListaMensaje = async (req, res) => {
  try {
    const datos = await fs.readFile(dataFilePath, "utf-8");
    const items = JSON.parse(datos);
    res
      .status(200)
      .json(items) 
    } catch (error) {
      console.log(error);
  }
};


const addMensaje = async (req, res) => {
  try { 
    const newItem = req.body;
    const data = await fs.readFile(dataFilePath, "utf8");
    const items = JSON.parse(data);
    const id = getNextIdMensaje(items);
    console.log(id);
    newItem.id = id;
    items.push(newItem);
    await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2), "utf8");
    res
      .status(201)
      .json( { data: newItem, message: "El mensaje fue registrado", exito: true});
   } catch (error) {
     console.log(error);
  }
};

// Función para obtener el próximo ID
function getNextIdMensaje(mensajes) {
  if (mensajes.length === 0) {
    return 1;
  }
  const maxId = Math.max(...mensajes.map((item) => item.id));
  return maxId + 1;
}

// Eliminar un elemento por ID
const deleteMensaje = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await fs.readFile(dataFilePath, "utf8");
    const items = JSON.parse(data);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      res
      .status(400)
      .json({ message: "Elemento no encontrado", exito: false});
    }
    items.splice(index, 1);
    await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2), "utf8");
    res
      .status(204)
      .json({ message: "El mensaje fue eliminado", exito: true});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getListaMensaje,
  addMensaje,
  deleteMensaje,
};

