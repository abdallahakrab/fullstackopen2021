interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
type Rating = 1 | 2 | 3;
const calculateExercises = (
  dailyexercise: Array<number>,
  target: Rating
): Result => {
  const periodLength: number = dailyexercise.length;
  const trainingDays: number = dailyexercise.reduce((count: number, number) => {
    if (number !== 0) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);
  const average =
    dailyexercise.reduce((number, count) => {
      return count + number;
    }, 0) / periodLength;
  let rating: Rating = 1;
  if (average < target) {
    rating = 1;
  }
  if (average > target) {
    rating = 2;
  }
  if (average > target * 2) {
    rating = 3;
  }
  const success: boolean = rating === target;
  let ratingDescription = "";
  switch (rating) {
    case 1:
      ratingDescription = "Below average";
      break;
    case 2:
      ratingDescription = "Good, could do better";
      break;
    case 3:
      ratingDescription = "Excellent performance";

    default:
      break;
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
interface inputValues {
  target: Rating;
  arr: Array<number>;
}

const getInputec = (): inputValues => {
  const len = process.argv.length;
  if (len < 4) {
    throw new Error("few arguments");
  }
  const targetInt: number = parseInt(process.argv[2]);
  if (targetInt < 1 || targetInt > 3) {
    throw new Error("target must be in range 1-3");
  }
  if (isNaN(targetInt)) {
    throw new Error("only numbers are accepted");
  }
  const target: any = targetInt;
  let arr: Array<number> = [];
  for (let index = 3; index < len; index++) {
    const element = parseInt(process.argv[index]);
    if (isNaN(element)) {
      throw new Error("only numbers are accepeted");
    }
    arr.push(element);
  }
  return {
    target,
    arr,
  };
};
try {
  const input = getInputec();
  console.log(calculateExercises(input.arr, input.target));
} catch (error) {
  console.log(error.message);
}
