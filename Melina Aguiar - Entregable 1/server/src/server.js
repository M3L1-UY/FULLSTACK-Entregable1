const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();

var corOptions = {
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: false,
  maxAge: 3600,
};

app.use(cors(corOptions));
app.use(express.json())

app.use("/json", require("./routes/routes.js"));

// Middleware para manejar errores
app.use((err, req, res, next) => {
  res.status(500).send("Error interno del servidor");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
