// QuestionManager.js
import fs from "fs";

const QUESTIONS_DB_PATH = "./src/data/questions.json";

class QuestionManager {
  constructor(questions) {
    this.questions = [];
    this.loadQuestions(questions);
  }

  loadQuestions(questions) {
    try {
      if(questions) {
        this.questions = questions.map(
          (question) => new Question(question.id, question.question, question.options, question.answer)
        );
        return;
      } 
      const data = fs.readFileSync(QUESTIONS_DB_PATH, "utf8");
      const questions = JSON.parse(data);
      this.questions = questions.map(
        (question) => new Question(question.id, question.question, question.options, question.answer)
      );
    } catch (error) {
      console.error("Error loading questions:", error);
    }
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