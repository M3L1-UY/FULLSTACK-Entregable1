const express = require("express");
const router = express.Router();

const {
    getListaMensaje,
    addMensaje,
    deleteMensaje
} = require("../controller/json");

/* *******************************************************  */
/*             Ruta de acceso a archivos JSON               */
/* *******************************************************  */
router.get("/mensajes", getListaMensaje);
router.post("/mensajes", validarData, addMensaje);
router.delete("/mensajes/:id", deleteMensaje);

function validarData(req, res, next) {
  const { nombre, cel, email, mensaje } = req.body;

  if (!nombre) {
    res
      .status(400)
      .send({ message: "El nombre no puede estar vacío.", exito: false });
  }
  else if (!cel) {
    res
      .status(400)
      .send({ message: "El número de contacto no puede estar vacío.", exito: false });
  }
  else if (!email) {
    res
      .status(400)
      .send({ message: "El correo electrónico no puede estar vacío.", exito: false });
  }
  else if (!mensaje) {
    res
      .status(400)
      .send({ message: "El mensaje no puede estar vacío.", exito: false });
  }
  else 
  {
  next();
  }
}

module.exports = router;
