let today = new Date();
let todayDay = today.getDay();

const handleInADay = (day: Date) => {
  day.setDate(day.getDate() - 7);
  const dateDiff = (today.getTime() - day.getTime()) / (1000 * 3600);
  if (dateDiff < 1) return '방금 전';
  else return Math.floor(dateDiff) + '시간 전';
};

export const handleDate = (createdAt: string) => {
  let day = new Date(createdAt);
  day.setDate(day.getDate() + 7);
  if (today.getTime() > day.getTime()) {
    day.setDate(day.getDate() - 7);
    return (
      day.getFullYear() +
      '년 ' +
      (day.getMonth() + 1) +
      '월 ' +
      day.getDate() +
      '일'
    );
  } else {
    return day.getDay() - todayDay === 0
      ? handleInADay(day)
      : Math.abs(day.getDay() - todayDay) + '일전';
  }
};
