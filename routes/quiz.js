const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");
/* GET home page. */
router.get("/", (req, res) => {
  async function answearQuiz() {
    try {
      const show = !req.session.vote;
      const data = Quiz.find();
      const results = await data;
      let sum = 0;
      results.forEach((item) => {
        sum += item.vote;
      });
      res.render("quiz", { title: "Quiz", results, sum });
    } catch (err) {
      console.log(err);
    }
  }
  answearQuiz();
});
router.post("/", (req, res) => {
  async function answearQuiz() {
    try {
      const id = req.body.quiz;
      console.log(id);
      const data = Quiz.findOne({ _id: id });
      const results = await data;
      results.vote++;
      await results.save();
      // res.render("quiz", { title: "Quiz", results });
    } catch (err) {
      console.log("error z postu", err);
    } finally {
      req.session.vote = 1;
      res.redirect("/quiz");
    }
  }
  answearQuiz();
});

module.exports = router;
