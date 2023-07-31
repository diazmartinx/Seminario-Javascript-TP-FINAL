class Player {
  constructor(id, name, color, position=0) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.position = position
  }

  move(number) {
    this.position += number;
  }

  getDetails() {
    return {
      name: this.name,
      color: this.color,
      position: this.position,
    };
  }
}

export default Player;
