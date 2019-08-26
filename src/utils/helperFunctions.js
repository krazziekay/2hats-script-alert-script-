import moment from "moment";

export const roundOff = (num) => {
  return Math.round(parseInt(num));
};

export const calculateIntake = (intake) => {
  return 0;
};

export const isDateSame = (date1, date2) => {
  return moment(date1).format('YYYY-MM-DD') === moment(date2).format('YYYY-MM-DD');
};


export const calculateConsumed = (intake) => {
  let sum = 0;
  intake.intake_list.map(i => {
    sum += roundOff(i.nf_calories);
  });
  return sum;
};

export const calculatePercent = (value, total) => {
  return roundOff(value / total * 100);
};