import fs from "fs";
import Question from "../models/Question.js";

const QUESTIONS_DB_PATH = "./src/data/questions.json";

class QuestionManager {
  constructor(_questions) {
    if (!_questions) {
      this.questions = null;
      return;
    }
    this.questions = _questions.map(
      (q) => new Question(q.id, q.question, q.options, q.answer)
    );
  }

  loadQuestions() {
    try {
      const data = fs.readFileSync(QUESTIONS_DB_PATH, "utf8");
      const questions = JSON.parse(data);
      console.log("questions", questions);
      this.questions = questions.map(
        (q) => new Question(q.id, q.question, q.options, q.answer)
      );
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  }

  getQuestions() {
    return this.questions;
  }

  getRandomQuestion() {
    if (this.questions.length === 0) {
      throw new Error("No questions available.");
    }

    const randomIndex = Math.floor(Math.random() * this.questions.length);
    const question = this.questions[randomIndex];
    this.questions.splice(randomIndex, 1);
    return question;
  }
}

export default QuestionManager;
