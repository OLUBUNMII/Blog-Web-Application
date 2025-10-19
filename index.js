import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

const articles = [];
let index = 1;

app.get("/", (req, res) => {
    const deleted = req.query.deleted === "true";
    res.render("index.ejs", { articles, deleted });
});

app.post("/submit", (req, res) => {
    const id = index++;
    const title = req.body["title"];
    const description = req.body["description"];
    const date = new Date();
    articles.push({id, title, description, date});
    res.redirect("/")
});

app.post("/update", (req, res) => {
  const { id, title, description } = req.body;
  const article = articles.find(a => a.id == id);
  if (article) {
    article.title = title;
    article.description = description;
    article.editedAt = new Date();
  }
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  const index = articles.findIndex(article => article.id === idToDelete);
  if (index !== -1) {
    articles.splice(index, 1);
  }
  res.redirect("/?deleted=true");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

   
