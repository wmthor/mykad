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
    const birthDate = new Date(year, month - 1, day);

    const age = today.getYear() - birthDate.getYear();

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

function parse(icNum, cb) {
    let parts;

    try {
        parts = extractParts(icNum);
    } catch(error) {
        if (!cb) throw error;
        return cb(error, null);
    }

    const parsedData = {
        birthDate: codeToDate(parts[1], parts[2], parts[3]),
        birthPlace: birthplace.parse(parts[4]),
        gender: codeToGender(parts[6])
    };

    if (cb) {
        return cb(null, parsedData);
    }
    
    return parsedData;
}

function format(icNum, cb) {
    let parts;
    
    try {
        parts = extractParts(icNum);
    } catch(error) {
        if (!cb) throw error;
        return cb(error, null);
    }

    const formatted = `${parts[1]}${parts[2]}${parts[3]}-${parts[4]}-${parts[5]}${parts[6]}`;

    if (cb) {
        return cb(null, formatted);
    }
    
    return formatted;
}

function unformat(icNum, cb) {
    if (!cb) {
        try {
            const formatted = format(icNum);
            return formatted.replace(/-/g, '');
        } catch (error) {
            throw error;
        }
    }

    format(icNum, (err, formatted) => {
        if (err) {
            return cb(err, null);
        }

        return cb(null, formatted.replace(/-/g, ''));
    });
}

module.exports = {
    isValid,
    parse,
    format,
    unformat,
    generateRandom: random.generateRandom,
}