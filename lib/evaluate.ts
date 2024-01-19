import natural from "natural";

export const evaluate = (hashtags: string[]) => {
  try {
    const values: number[] = [];
    hashtags.forEach((hashtag, i) => {
      const value = natural.JaroWinklerDistance(
        "self motivational quotes mindset dongluc",
        hashtag,
        {
          ignoreCase: true,
        }
      );
      values.push(value);
    });
    return calculateMean(values);
  } catch (error) {
    return 0;
  }
};
function calculateMean(numbers: number[]): number {
  // Kiểm tra xem mảng có phần tử không để tránh chia cho 0
  try {
    // Tính tổng các số trong mảng
    const sum = numbers.reduce((acc, num) => acc + num, 0);

    // Tính trung bình
    const mean = sum / numbers.length;

    return mean;
  } catch (error) {
    return 0;
  }
}
