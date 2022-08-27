(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mykad = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var REGION_SOUTHEAST_ASIA = 'SOUTHEAST_ASIA';
var REGION_BRITISH_ISLES = 'BRITISH_ISLES';
var REGION_SOVIET_REPUBLIC = 'SOVIET_REPUBLIC';
var REGION_EAST_ASIA = 'EAST_ASIA';
var REGION_SOUTH_ASIA = 'SOUTH_ASIA';
var REGION_AFRICA = 'AFRICA';
var REGION_SOUTH_AMERICA = 'SOUTH_AMERICA';
var REGION_CENTRAL_AMERICA = 'CENTRAL_AMERICA';
var REGION_NORTH_AMERICA = 'NORTH_AMERICA';
var REGION_OCEANIA = 'OCEANIA';
var REGION_MIDDLE_EAST = 'MIDDLE_EAST';
var REGION_EUROPE = 'EUROPE';
var REGION_MIDDLE_AMERICA = 'MIDDLE_AMERICA';
var REGION_MISCELLANEOUS = 'MISCELLANEOUS';
var stateCodePairs = {
  'JHR': ['01', '21', '22', '24'],
  'KDH': ['02', '25', '26', '27'],
  'KTN': ['03', '28', '29'],
  'MLK': ['04', '30'],
  'NSN': ['05', '31', '59'],
  'PHG': ['06', '32', '33'],
  'PNG': ['07', '34', '35'],
  'PRK': ['08', '36', '37', '38'],
  'PLS': ['09', '40'],
  'SGR': ['10', '41', '42', '43', '44'],
  'TRG': ['11', '45', '46'],
  'SBH': ['12', '47', '48', '49'],
  'SWK': ['13', '50', '51', '52', '53'],
  'KUL': ['14', '54', '55', '56', '57'],
  'LBN': ['15', '58'],
  'PJY': ['16'],
  'UNKNOWN_STATE': ['82']
};
var countryCodePairs = {
  '60': {
    country: 'BN',
    region: REGION_SOUTHEAST_ASIA
  },
  '61': {
    country: 'ID',
    region: REGION_SOUTHEAST_ASIA
  },
  '62': {
    country: 'KH',
    region: REGION_SOUTHEAST_ASIA
  },
  '63': {
    country: 'LA',
    region: REGION_SOUTHEAST_ASIA
  },
  '64': {
    country: 'MM',
    region: REGION_SOUTHEAST_ASIA
  },
  '65': {
    country: 'PH',
    region: REGION_SOUTHEAST_ASIA
  },
  '66': {
    country: 'SG',
    region: REGION_SOUTHEAST_ASIA
  },
  '67': {
    country: 'TH',
    region: REGION_SOUTHEAST_ASIA
  },
  '68': {
    country: 'VN',
    region: REGION_SOUTHEAST_ASIA
  },
  '71': {
    country: 'FOREIGN_UNKNOWN',
    region: null
  },
  '72': {
    country: 'FOREIGN_UNKNOWN',
    region: null
  },
  '74': {
    country: 'CN',
    region: REGION_EAST_ASIA
  },
  '75': {
    country: 'IN',
    region: REGION_SOUTH_ASIA
  },
  '76': {
    country: 'PK',
    region: REGION_SOUTH_ASIA
  },
  '77': {
    country: 'SA',
    region: REGION_MIDDLE_EAST
  },
  '78': {
    country: 'LK',
    region: REGION_SOUTH_ASIA
  },
  '79': {
    country: 'BD',
    region: REGION_SOUTH_ASIA
  },
  '83': {
    country: 'AS|AU|CX|CC|CK|FJ|PF|GU|HM|MH|FM|NC|NZ|NU|NF|PG|TL|TK|UM|WF',
    region: REGION_OCEANIA
  },
  '84': {
    country: 'AI|AR|AW|BO|BR|CL|CO|EC|GF|GP|GY|PY|PE|GS|ST|UY|VE',
    region: REGION_SOUTH_AMERICA
  },
  '85': {
    country: 'DZ|AO|BW|BI|CM|CF|CG|CD|DG|EG|ER|ET|GA|GM|GN|KE|LR|MW|ML|MR|YT|' + 'MA|MZ|NA|NE|NG|RW|RE|SN|SL|SO|SD|SZ|TZ|TG|TO|TN|UG|ME|ZR|ZM|ZW',
    region: REGION_AFRICA
  },
  '86': {
    country: 'AM|AT|BE|CY|DK|FO|FR|FI|DE|DD|GR|VA|IT|LU|' + 'MK|MT|MC|NL|NO|PT|MD|SK|SI|ES|SE|CH|GG|JE|IM',
    region: REGION_EUROPE
  },
  '87': {
    country: 'GB|IE',
    region: REGION_BRITISH_ISLES
  },
  '88': {
    country: 'BH|IR|IQ|PS|JO|KW|OM|QA|YE|SY|TR|YE|YD|',
    region: REGION_MIDDLE_EAST
  },
  '89': {
    country: 'JP|KP|KR|TW',
    region: REGION_EAST_ASIA
  },
  '90': {
    country: 'BS|BB|BZ|CR|CU|DM|DO|SV|GD|GT|HT|HN|' + 'JM|MQ|MX|NI|PA|PR|KN|LC|VC|TT|TC|VI',
    region: REGION_MIDDLE_AMERICA
  },
  '91': {
    country: 'CA|GL|AN|PM|US',
    region: REGION_NORTH_AMERICA
  },
  '92': {
    country: 'AL|BY|BA|BG|HR|CZ|CS|EE|GE|HU|LV|LT|ME|PL|XK|RO|RU|RS|UA',
    region: REGION_SOVIET_REPUBLIC
  },
  '93': {
    country: 'AF|AD|AQ|AG|AZ|BJ|BM|BT|IO|BF|CV|KY|KM|DY|GQ|TF|GI|GW|HK|' + 'IS|CI|KZ|KI|KG|LS|LY|LI|MO|MG|MV|MU|MN|MS|NR|NP|MP|PW|PS|' + 'PN|SH|LC|VC|WS|SM|ST|SC|SB|SJ|TJ|TM|TV|HV|UZ|VU|VA|VG|YU',
    region: REGION_MISCELLANEOUS
  },
  '98': {
    country: 'STATELESS',
    region: null
  },
  '99': {
    country: 'UNSPECIFIED',
    region: null
  }
};

function numisBetween(num, lower, upper) {
  return (num - lower) * (num - upper) <= 0;
}

function codeToState(code) {
  return Object.keys(stateCodePairs).find(function (key) {
    return stateCodePairs[key].includes(code);
  });
}

function isMalaysia(code) {
  return numisBetween(code, 1, 16) || numisBetween(code, 21, 59) || code == 82;
}

function isForeign(code) {
  return countryCodePairs[code] != undefined;
}

function parseMalaysia(code) {
  return {
    region: REGION_SOUTHEAST_ASIA,
    country: 'MY',
    state: codeToState(code)
  };
}

function parseForeign(code) {
  return Object.assign({
    state: null
  }, countryCodePairs[code]);
}

function parse(code) {
  if (isMalaysia(code)) return parseMalaysia(code);
  if (isForeign(code)) return parseForeign(code);
  return null;
}

function isValid(code) {
  return isMalaysia(code) || isForeign(code);
}

module.exports = {
  parse: parse,
  isValid: isValid
};
},{}],2:[function(require,module,exports){
"use strict";

var birthplace = require('./birthplace');

var random = require('./random'); // Check if date is before disregarding year.


function dateIsBefore(before, max) {
  var bNorm = new Date(0, before.getMonth(), before.getDate());
  var mNorm = new Date(0, max.getMonth(), max.getDate());
  return bNorm < mNorm;
}

function codeToDate(year, month, day) {
  var today = new Date();
  var birthDate = new Date(year, month - 1, day);
  var age = today.getYear() - birthDate.getYear(); // Works for now. Update this in year 2099.
  // For same year, checks if date has passed.

  if (age > 100 || age == 100 && dateIsBefore(birthDate, today)) {
    birthDate.setFullYear(birthDate.getFullYear() + 100);
  } // Check valid date.


  return birthDate.getDate() == day && birthDate.getMonth() == month - 1 ? birthDate : NaN;
}

function codeToGender(code) {
  return code % 2 === 0 ? 'female' : 'male';
}

function extractParts(icNum) {
  var regex = /^(\d{2})(\d{2})(\d{2})-?(\d{2})-?(\d{3})(\d{1})$/;
  var parts = icNum.match(regex);

  if (!parts) {
    throw new Error('Invalid MyKad number format');
  }

  return parts;
}

function isValid(icNum) {
  var parts;

  try {
    parts = extractParts(icNum);
  } catch (error) {
    return false;
  }

  var birthDate = codeToDate(parts[1], parts[2], parts[3]);
  return !isNaN(birthDate) && birthplace.isValid(parts[4]);
}

function parse(icNum, cb) {
  var parts;

  try {
    parts = extractParts(icNum);
  } catch (error) {
    if (!cb) throw error;
    return cb(error, null);
  }

  var parsedData = {
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
  var parts;

  try {
    parts = extractParts(icNum);
  } catch (error) {
    if (!cb) throw error;
    return cb(error, null);
  }

  var formatted = "".concat(parts[1]).concat(parts[2]).concat(parts[3], "-").concat(parts[4], "-").concat(parts[5]).concat(parts[6]);

  if (cb) {
    return cb(null, formatted);
  }

  return formatted;
}

function unformat(icNum, cb) {
  if (!cb) {
    try {
      var formatted = format(icNum);
      return formatted.replace(/-/g, '');
    } catch (error) {
      throw error;
    }
  }

  format(icNum, function (err, formatted) {
    if (err) {
      return cb(err, null);
    }

    return cb(null, formatted.replace(/-/g, ''));
  });
}

module.exports = {
  isValid: isValid,
  parse: parse,
  format: format,
  unformat: unformat,
  generateRandom: random.generateRandom
};
},{"./birthplace":1,"./random":3}],3:[function(require,module,exports){
"use strict";

var birthplace = require('./birthplace');

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate() {
  var today = new Date();
  var start = new Date();
  start.setFullYear(start.getFullYear() - 99);
  return new Date(start.getTime() + Math.random() * (today.getTime() - start.getTime()));
}

function twoDigitFormat(num) {
  return ('0' + num).slice(-2);
}

function dateToCode(date) {
  var code = '';
  code += date.getFullYear().toString().substr(2, 2);
  code += twoDigitFormat(date.getMonth() + 1);
  code += twoDigitFormat(date.getDate());
  return code;
}

function randomBirthplace() {
  var randomCode;

  do {
    randomCode = twoDigitFormat(randomNumberBetween(1, 99));
  } while (!birthplace.isValid(randomCode));

  return randomCode;
}

function randomSpecialNumber() {
  var code = '';

  for (var i = 0; i < 4; i += 1) {
    code += randomNumberBetween(0, 9);
  }

  return code;
}

function generateRandom() {
  return dateToCode(randomDate()) + randomBirthplace() + randomSpecialNumber();
}

module.exports = {
  generateRandom: generateRandom
};
},{"./birthplace":1}]},{},[2])(2)
});
