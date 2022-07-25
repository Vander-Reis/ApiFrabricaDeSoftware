const migrationsRun = require('./database/sqlite/migrations');

const express = require("express");

const routes = require("./routes");

migrationsRun();

const app = express();

app.use(express.json());

app.use(routes);

const port = 5000;
    
app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
})