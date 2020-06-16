const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");
const { json } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.send(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newRepo = {
    'id': uuid(),
    title,
    url,
    techs,
    'likes': 0,
  };

  repositories.push(newRepo);

  return response.json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findRepository = repositories.findIndex(index => index.id == id);

  if (findRepository < 0) {
    return response.status(400).json({ message: 'Repository not found' });
  }
  
  repositories[findRepository].title = title;
  repositories[findRepository].url = url;
  repositories[findRepository].techs = techs;

  return response.json(repositories[findRepository]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepository = repositories.findIndex(index => index.id == id);

  if (findRepository < 0) {
    return response.status(400).json({ message: 'Repository not found' });
  }
  
  repositories.splice(findRepository, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepository = repositories.findIndex(index => index.id == id);

  if (findRepository < 0) {
    return response.status(400).json({ message: 'Repository not found' });
  }

  repositories[findRepository].likes += 1;

  return response.json(repositories[findRepository]);

});

module.exports = app;
