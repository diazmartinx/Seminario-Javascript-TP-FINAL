export function generateRandomId() {
  //generate 6 characters random id based on timestamp
  return Math.random().toString(36).substr(2, 6);
}
