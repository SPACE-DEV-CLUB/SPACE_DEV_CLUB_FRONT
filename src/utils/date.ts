let today = new Date();

const handleTime = (day: Date) => {
  const timeDiff = today.getMinutes() - day.getMinutes();
  const result = timeDiff < 0 ? 60 + timeDiff : timeDiff;
  return result < 1 ? "방금전" : Math.floor(result) + "분 전";
};

const handleInADay = (day: Date) => {
  const dateDiff = (today.getTime() - day.getTime()) / (1000 * 3600);
  return dateDiff < 1 ? handleTime(day) : Math.floor(dateDiff) + "시간 전";
};

export const handleDate = (createdAt: string) => {
  let day = new Date(createdAt);

  day.setDate(day.getDate() + 7);
  const diff = today.getTime() - day.getTime();
  if (diff > 0) {
    day.setDate(day.getDate() - 7);
    return (
      day.getFullYear() +
      "년 " +
      (day.getMonth() + 1) +
      "월 " +
      day.getDate() +
      "일"
    );
  } else {
    day.setDate(day.getDate() - 7);
    return today.getTime() - day.getTime() <= 1000 * 3600
      ? handleInADay(day)
      : Math.ceil((today.getTime() - day.getTime()) / (1000 * 3600 * 24)) +
          "일전";
  }
};
