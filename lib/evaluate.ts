import natural from "natural";
const MAX_VIEW = 10000000;
const MAX_LIKE = 10000000;
export const evaluate = (hashtags: string[], view: number, like: number) => {
  try {
    const values: number[] = [];
    hashtags.forEach((hashtag, i) => {
      const value = natural.JaroWinklerDistance(
        "#self #motivational #quotes #mindset #dongluc",
        hashtag,
        {
          ignoreCase: true,
        }
      );
      values.push(value);
    });
    const viewPoint = Math.min(1, view / MAX_VIEW);
    const likePoint = Math.min(1, like / MAX_LIKE);
    let point: number = 0;
    const lowercaseHashtags: string[] = hashtags.map((tag) =>
      tag.toLowerCase()
    );

    if (lowercaseHashtags.filter((f) => f === "motivationquotes").length > 0) {
      point += 1.9;
    }
    if (
      lowercaseHashtags.filter((f) => f === "#motivationalquotes").length > 0
    ) {
      point += 1.9;
    }
    if (lowercaseHashtags.filter((f) => f === "#motivation").length > 0) {
      point += 1.8;
    }
    if (lowercaseHashtags.filter((f) => f === "#mindset").length > 0) {
      point += 1.6;
    }
    if (lowercaseHashtags.filter((f) => f === "#dongluc").length > 0) {
      point += 1.5;
    }
    if (lowercaseHashtags.filter((f) => f === "#selfmotivation").length > 0) {
      point += 1.7;
    }
    if (lowercaseHashtags.filter((f) => f === "#motivational").length > 0) {
      point += 1.4;
    }
    const countPoint =
      hashtags.length < 10 && hashtags.length > 3
        ? hashtags.length * 0.2
        : hashtags.length > 10
        ? hashtags.length * -0.2
        : -1;
    const hasPoint = point / hashtags.length + countPoint;
    const value = calculateMean([...values, hasPoint, viewPoint, likePoint]);
    return value;
  } catch (error) {
    return 0;
  }
};

/*
Trong hàm Sigmoid, giá trị của biến độc lập x có thể là bất kỳ giá trị nào trong khoảng từ −∞ đến +∞. 
Hàm Sigmoid biến đổi giá trị x thành một giá trị nằm trong khoảng từ 0 đến 1

*/

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}
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
function convertToScale(value: number): number {
  // Đảm bảo giá trị không là số âm
  const nonNegativeValue = Math.max(value, 0);

  // Áp dụng hàm logarit để chuyển đổi giá trị
  const convertedValue =
    Math.log(nonNegativeValue + 1) / Math.log(Number.MAX_VALUE + 1);

  // Chuyển đổi giá trị sang khoảng 0-5
  const scaledValue = convertedValue * 5;

  // Trả về giá trị đã được chuyển đổi
  return scaledValue;
}
