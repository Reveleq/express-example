const express = require("express");
const News = require("../models/news");
const router = express.Router();
/* GET home page. */
router.get("/", (req, res) => {
  console.log(req.query);
  const search = req.query.search || "";
  async function getNews() {
    try {
      const data = News.find({ title: new RegExp(search.trim(), "i") }).sort({
        created: -1,
      });
      const results = await data;
      await res.render("news", { title: "News", results, search });
    } catch (err) {
      console.log(err);
    }
  }
  getNews();
});

module.exports = router;
