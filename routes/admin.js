const express = require("express");
const News = require("../models/news");
const router = express.Router();
router.all("*", (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("login");

    return;
  }

  next();

  // wszysyko co jest w tej ściece jeset chronione ściezką//
});
router.get("/", (req, res) => {
  async function findData() {
    try {
      const data = News.find();
      const results = await data;
      console.log(results);
      res.render("admin/index", { title: "Admin", results });
    } catch (err) {
      console.log(err);
    }
  }
  findData();
});
router.get("/news/add", (req, res) => {
  res.render("admin/news-form", { title: "Dodaj news", errors: {}, body: {} });
});
router.get("/news/delete/:id", (req, res) => {
  async function deleteNews() {
    try {
      await News.findByIdAndDelete(req.params.id);
    } catch (err) {
      console.log(err);
    } finally {
      res.redirect("/admin");
    }
  }
  deleteNews();
});
router.post("/news/add", (req, res) => {
  const body = req.body;
  const newsData = new News(body);
  const errors = newsData.validateSync();
  console.log(body);
  async function saveData() {
    try {
      await newsData.save();
    } catch (err) {
      console.log("error z formulaza", err);
      res.render("admin/news-form", { title: "Dodaj news", errors, body });
    } finally {
      res.redirect("/admin");
    }
  }
  saveData();
});

module.exports = router;
