import express from "express";
import cookieSession from "cookie-session";
import { engine } from "express-handlebars";

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["my-secret-key"],
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })
);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  const views = req.session.views || 1;

  res.render("home", {
    title: "My App",
    message: "Welcome back to my app!",
    views,
  });
  
  req.session.views = views + 1;
});

app.listen(3000, () => {
  console.log("Server listening on port 3000...");
});
