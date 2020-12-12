export const parseOnlyLetterAndSpace = (expression) => expression.replace(/[^A-Za-zА-Яа-я ]/g, '');

export const parseLength = (expression, length) => expression.substring(0, length);

export const checkAtLeastLength = (expression, length) => (
  expression && expression.trim().length >= length
);

export const checkIsfilled = (expression) => expression && expression.length > 0;

export const checkIsTrue = (expression) => expression;

export const checkEmailPattern = (mail) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(mail);
};
