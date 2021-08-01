const calculateBmi = (height: number, weight: number): string => {
  if (height / weight < 1.85) {
    return "underweight";
  }
  if (height / weight < 2.49) {
    return "healthy";
  }
  if (height / weight < 2.99) {
    return "overweight";
  }
  if (height / weight < 3.99) {
    return "obese";
  }
  return "undefined range";
};
console.log(calculateBmi(180, 74));
