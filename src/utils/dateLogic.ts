let today = new Date();
let todayDay = today.getDay();

export const handleDate = (createdAt: string) => {
  let day = new Date(createdAt);
  day.setDate(day.getDate() + 7);
  if (today.getTime() > day.getTime()) {
    day.setDate(day.getDate() - 7);
    return (
      day.getFullYear() +
      "년 " +
      (day.getMonth() + 1) +
      "월 " +
      day.getDay() +
      1 +
      "일"
    );
  } else {
    return day.getDay() - todayDay === 0
      ? "오늘"
      : Math.abs(day.getDay() - todayDay) + "일전";
  }
};
