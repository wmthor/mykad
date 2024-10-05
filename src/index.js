const birthplace = require('./birthplace');
const random = require('./random');

// Check if date is before disregarding year.
function dateIsBefore(before, max) {
    const bNorm = new Date(0, before.getMonth(), before.getDate());
    const mNorm = new Date(0, max.getMonth(), max.getDate());

    return bNorm < mNorm;
}

function codeToDate(year, month, day) {
    const today = new Date();

    // Prevents the date from being set to 29th February 1900.
    // Special case as 29th February 2000 is a valid date.
    if (year === '00') {
        year = today.getFullYear().toString().slice(0, 2) + '00';
    }

    const birthDate = new Date(year, month - 1, day);

    const age = today.getFullYear() - birthDate.getFullYear();

    // Works for now. Update this in year 2099.
    // For same year, checks if date has passed.
    if (age > 100 || (age == 100 && dateIsBefore(birthDate, today))) {
        birthDate.setFullYear(birthDate.getFullYear() + 100);
    }

    // Check valid date.
    return (birthDate.getDate() == day && birthDate.getMonth() == month - 1)
        ? birthDate
        : NaN;
}

function codeToGender(code) {
    return (code % 2 === 0)
        ? 'female'
        : 'male';
}

function extractParts(icNum) {
    const regex = /^(\d{2})(\d{2})(\d{2})-?(\d{2})-?(\d{3})(\d{1})$/;
    const parts = icNum.match(regex);

    if (!parts) {
        throw new Error('Invalid MyKad number format');
    }

    return parts;
}

function isValid(icNum) {
    let parts;

    try { 
        parts = extractParts(icNum);
    } catch(error) {
        return false;
    }

    const birthDate = codeToDate(parts[1], parts[2], parts[3]);
    return !isNaN(birthDate) && birthplace.isValid(parts[4]);
}

function parse(icNum) {
    const parts = extractParts(icNum);

    const parsedData = {
        birthDate: codeToDate(parts[1], parts[2], parts[3]),
        birthPlace: birthplace.parse(parts[4]),
        gender: codeToGender(parts[6])
    };
    
    return parsedData;
}

function format(icNum) {
    const parts = extractParts(icNum);
    return `${parts[1]}${parts[2]}${parts[3]}-${parts[4]}-${parts[5]}${parts[6]}`;    
}

function unformat(icNum) {
    const formatted = format(icNum);
    return formatted.replace(/-/g, '');
}

module.exports = {
    isValid,
    parse,
    format,
    unformat,
    generateRandom: random.generateRandom,
}