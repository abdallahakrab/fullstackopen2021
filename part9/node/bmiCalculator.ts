const calculateBmi = (height: number, weight: number): string => {
  const result = (weight / (height * height)) * 1000;
  if (result < 1.85) {
    return "underweight";
  }
  if (result < 2.49) {
    return "healthy";
  }
  if (result < 2.99) {
    return "overweight";
  }
  if (result < 3.99) {
    return "obese";
  }
  return "undefined range";
};
interface InputValues {
  height: number;
  weight: number;
}
const getInput = (): InputValues => {
  if (process.argv.length < 4) {
    throw new Error("few arguments");
  }
  if (process.argv.length > 4) {
    throw new Error("too many arguments");
  }
  const height = parseInt(process.argv[2]);

  const weight = parseInt(process.argv[3]);
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("only numbers are accepeted");
  }
  const inputValues: InputValues = {
    height: parseInt(process.argv[2]),
    weight: parseInt(process.argv[3]),
  };
  return inputValues;
};
try {
  const values = getInput();
  console.log(calculateBmi(values.height, values.weight));
} catch (e) {
  console.error("error", e.message);
}
