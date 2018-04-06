icNum = '930213016147';
const regex = /^(\d{2})(\d{2})(\d{2})-?(\d{2})-?(\d{3})(\d{1})$/;

function numisBetween(num, lower, upper) {
  return (num - lower) * (num - upper) <= 0
}

function validBirthplaceCode(code) {
  const ranges = [
    [1, 16],
    [21, 68],
    [71, 72],
    [74, 79],
    [82, 93],
    [98, 99],
  ]

  for (let i = 0; i < ranges.length; i += 1) {
    if (numisBetween(code, ranges[i][0], ranges[i][1])) {
      return true;
    }
  }

  return false;
}

function validate(icNum) {
  const parts = icNum.match(regex);
  
  const dateOfBirth = new Date(parts[1], parts[2], parts[3]);

  if (isNaN(dateOfBirth)) {
    return false;
  }

  const data = {
    dateOfBirth,
  }

  return data;
}

function isValid(icNum) {
  return regex.test(icNum);
}

module.exports = {
  isValid,
}