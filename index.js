const express = require("express");
const server = express();

server.use(express.json());
server.use(logRequests);

projects = [];

server.get("/projects", (req, res) => {
  return res.send(projects);
});

server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { tittle } = req.body;
  projectCreated = { id: id, tittle: tittle, tasks: [] };
  projects.push(projectCreated);
  return res.send(projectCreated);
});

server.put("/projects/:id", checkIfIdExists, (req, res) => {
  const { id } = req.params;
  const { tittle } = req.body;
  projects.map(entry => {
    if (entry["id"] == id) {
      entry["tittle"] = tittle;
    }
  });
  return res.send();
});

server.delete("/projects/:id", checkIfIdExists, (req, res) => {
  newProjectsArray = [];
  const { id } = req.params;
  projects.map(entry => {
    if (entry["id"] != id) {
      newProjectsArray.push(entry);
    }
  });
  projects = newProjectsArray;
  return res.send("");
});

server.post("/projects/:id/tasks", checkIfIdExists, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;
  projects.map(entry => {
    if (entry["id"] == id) {
      entry["tasks"] = tasks.split(", ");
    }
  });
  return res.send();
});

//Middlewares
function checkIfIdExists(req, res, next) {
  const { id } = req.params;
  let flag = false;
  projects.map(entry => {
    if (entry["id"] == id) {
      flag = true;
    }
  });
  if (flag == false) {
    return res.status(400).json({ error: "Project ID does not exist" });
  }
  next();
}

function logRequests(req, res, next) {
  console.log(`HTTP Request Method: ${req.method}, URL: ${req.url}`);
  next();
}

server.listen(3011);
