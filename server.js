const express = require("express");
const app = express();

// A Vercel fornece a porta através da variável de ambiente PORT
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public")); // Serve os arquivos da pasta public

// Rota para processar o formulário
app.post("/submit", (req, res) => {
  const { invite, location, date } = req.body;

  if (invite === "Sim") {
    res.json({ message: `Convite aceito! Te vejo no ${location} em ${date}.` });
  } else {
    res.json({ message: "Que pena! Fica para a próxima." });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
