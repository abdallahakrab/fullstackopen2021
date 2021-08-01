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

console.log(calculateExercises([3, 5, 2, 4.5, 5, 3, 1], 2));
