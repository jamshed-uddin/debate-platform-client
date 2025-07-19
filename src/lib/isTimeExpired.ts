export const isTimeExpired = (time: number) => {
  const now = Date.now();
  const timeInMili = new Date(time).getTime();
  return now + timeInMili < now;
};
