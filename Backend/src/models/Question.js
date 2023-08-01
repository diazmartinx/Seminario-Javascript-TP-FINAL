class Question {
  constructor(id, question, options, answer) {
    this.id = id;
    this.question = question;
    this.options = options;
    this.answer = answer;
  }

  getDetails() {
    return {
      question: this.question,
      options: this.options,
    };
  }
}

export default Question;
