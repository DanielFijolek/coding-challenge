const numberToPadString = (num: number, padNum = 2, padString = "0") => {
  return num.toString().padStart(padNum, padString);
};

export const prepareDateText = (date: Date) => {
  const day = date.getDate();
  const mounth = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${numberToPadString(day)}.${numberToPadString(mounth)}.${year}`;
};

export const dayDiff = (date: Date) => {
  const denominatorForDays = 24 * 3600 * 1000 * 7;
  return (new Date().getTime() - date.getTime()) / denominatorForDays;
};
