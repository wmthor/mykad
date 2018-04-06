const birthplace = require('./birthplace');

icNum = '180501-03-6147';

function numisBetween(num, lower, upper) {
  return (num - lower) * (num - upper) <= 0
}

// Check if date is before for same years.
function dateIsBefore(before, max) {
  if (before.getMonth() == max.getMonth()) {
    return before.getDate() <= max.getDate()
  }

  return before.getMonth() < max.getMonth();
}

function codeToDate(year, month, day) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day)

  const currentYearCode = today.getFullYear().toString().substr(-2);

  // Works for now. Update this in year 2099.
  // Add 100 years if the 2 digit year code is smaller than this years code.
  // For same year, checks if date has passed.
  if (year < currentYearCode ||
    (year == currentYearCode && dateIsBefore(birthDate, today))) {
      birthDate.setFullYear(birthDate.getFullYear() + 100);
  }
  
  return birthDate;
}

function codeToGender(code) {
  return (code % 2 == 0)
    ? 'female'
    : 'male';
}

function extractParts(icNum) {
  const regex = /^(\d{2})(\d{2})(\d{2})-?(\d{2})-?(\d{3})(\d{1})$/;
  const parts = icNum.match(regex);

  if (!parts) {
    throw new Error('Parsing error: Invalid IC number');
  }

  return parts;
}

function isValid(icNum) {
  const parts = extractParts(icNum);
  const birthDate = codeToDate(parts[1], parts[2], parts[3]);
  return !isNaN(birthDate) && birthplace.isValid(parts[4]);
}

function parse(icNum) {
  const parts = extractParts(icNum);

  const data = {
    birthDate: codeToDate(parts[1], parts[2], parts[3]),
    birthPlace: birthplace.parse(parts[4]),
    gender: codeToGender(parts[6])
  }

  return data;
}

function format(icNum) {
  const parts = extractParts(icNum);
  return `${parts[1]}${parts[2]}${parts[3]}-${parts[4]}-${parts[5]}${parts[6]}`;
}

function unformat(icNum) {
  const check = format(icNum);
  return check.replace(/-/g, '');
}

console.log(parse(icNum))

module.exports = {
  isValid,
  parse,
  format,
  unformat,
}