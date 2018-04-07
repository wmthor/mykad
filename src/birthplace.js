const REGION_SOUTHEAST_ASIA = 'SOUTHEAST_ASIA';
const REGION_BRITISH_ISLES = 'BRITISH_ISLES';
const REGION_SOVIET_REPUBLIC = 'SOVIET_REPUBLIC';
const REGION_EAST_ASIA = 'EAST_ASIA';
const REGION_SOUTH_ASIA = 'SOUTH_ASIA';
const REGION_AFRICA = 'AFRICA';
const REGION_SOUTH_AMERICA = 'SOUTH_AMERICA';
const REGION_CENTRAL_AMERICA = 'CENTRAL_AMERICA';
const REGION_NORTH_AMERICA = 'NORTH_AMERICA';
const REGION_OCEANIA = 'OCEANIA';
const REGION_MIDDLE_EAST = 'MIDDLE_EAST';
const REGION_EUROPE = 'EUROPE';
const REGION_MIDDLE_AMERICA = 'MIDDLE_AMERICA';
const REGION_MISCELLANEOUS = 'MISCELLANEOUS';

const stateCodePairs = {
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
  'UNKNOWN_STATE': ['82'],
}

const countryCodePairs = {
  '60': { code: 'BN', region: REGION_SOUTHEAST_ASIA },
  '61': { code: 'ID', region: REGION_SOUTHEAST_ASIA },
  '62': { code: 'KH', region: REGION_SOUTHEAST_ASIA },
  '63': { code: 'LA', region: REGION_SOUTHEAST_ASIA },
  '64': { code: 'MM', region: REGION_SOUTHEAST_ASIA },
  '65': { code: 'PH', region: REGION_SOUTHEAST_ASIA },
  '66': { code: 'SG', region: REGION_SOUTHEAST_ASIA },
  '67': { code: 'TH', region: REGION_SOUTHEAST_ASIA },
  '68': { code: 'VN', region: REGION_SOUTHEAST_ASIA },

  '71': { code: 'FOREIGN_UNKNOWN', region: null },
  '72': { code: 'FOREIGN_UNKNOWN', region: null },

  '74': { code: 'CN', region: REGION_EAST_ASIA },
  '75': { code: 'IN', region: REGION_SOUTH_ASIA },
  '76': { code: 'PK', region: REGION_SOUTH_ASIA },
  '77': { code: 'SA', region: REGION_MIDDLE_EAST },
  '78': { code: 'LK', region: REGION_SOUTH_ASIA },
  '79': { code: 'BD', region: REGION_SOUTH_ASIA },

  '83': {
    code: 'AS|AU|CX|CC|CK|FJ|PF|GU|HM|MH|FM|NC|NZ|NU|NF|PG|TL|TK|UM|WF',
    region: REGION_OCEANIA },
  '84': {
    code: 'AI|AR|AW|BO|BR|CL|CO|EC|GF|GP|GY|PY|PE|GS|ST|UY|VE',
    region: REGION_SOUTH_AMERICA },
  '85': {
    code: 'DZ|AO|BW|BI|CM|CF|CG|CD|DG|EG|ER|ET|GA|GM|GN|KE|LR|MW|ML|MR|YT|' +
          'MA|MZ|NA|NE|NG|RW|RE|SN|SL|SO|SD|SZ|TZ|TG|TO|TN|UG|ME|ZR|ZM|ZW',
    region: REGION_AFRICA },
  '86': {
    code: 'AM|AT|BE|CY|DK|FO|FR|FI|DE|DD|GR|VA|IT|LU|' + 
          'MK|MT|MC|NL|NO|PT|MD|SK|SI|ES|SE|CH|GG|JE|IM',
    region: REGION_EUROPE },
  '87': {
    code: 'GB|IE',
    region: REGION_BRITISH_ISLES },
  '88': {
    code: 'BH|IR|IQ|PS|JO|KW|OM|QA|YE|SY|TR|YE|YD|',
    region: REGION_MIDDLE_EAST },
  '89': {
    code: 'JP|KP|KR|TW',
    region: REGION_EAST_ASIA },
  '90': {
    code: 'BS|BB|BZ|CR|CU|DM|DO|SV|GD|GT|HT|HN|' +
          'JM|MQ|MX|NI|PA|PR|KN|LC|VC|TT|TC|VI',
    region: REGION_MIDDLE_AMERICA },
  '91': {
    code: 'CA|GL|AN|PM|US',
    region: REGION_NORTH_AMERICA },
  '92': {
    code: 'AL|BY|BA|BG|HR|CZ|CS|EE|GE|HU|LV|LT|ME|PL|XK|RO|RU|RS|UA',
    region: REGION_SOVIET_REPUBLIC },
  '93': {
    code: 'AF|AD|AQ|AG|AZ|BJ|BM|BT|IO|BF|CV|KY|KM|DY|GQ|TF|GI|GW|HK|' + 
          'IS|CI|KZ|KI|KG|LS|LY|LI|MO|MG|MV|MU|MN|MS|NR|NP|MP|PW|PS|' +
          'PN|SH|LC|VC|WS|SM|ST|SC|SB|SJ|TJ|TM|TV|HV|UZ|VU|VA|VG|YU',
    region: REGION_MISCELLANEOUS },
  
  '98': { code: 'STATELESS', region: null },
  '99': { code: 'UNSPECIFIED', region: null },
};

function numisBetween(num, lower, upper) {
  return (num - lower) * (num - upper) <= 0
}

function codeToState(code) {
  return Object.keys(stateCodePairs).find(
    key => stateCodePairs[key].includes(code));
}

function isMalaysia(code) {
  return (
    numisBetween(code, 1, 16) ||
    numisBetween(code, 21, 59) ||
    code == 82
  );
}

function isForeign(code) {
  return countryCodePairs[code] != undefined;
}

function parseMalaysia(code) {  
  const data = {
    region: REGION_SOUTHEAST_ASIA,
    country: 'MY',
    state: codeToState(code),
  };

  return data;
}

function parseForeign(code) {
  const data = {
    region: null,
    country: 'FOREIGN',
    state: null,
  };

  if (numisBetween(code, 71, 72)) {
    return data;
  }

  const countryData = countryCodePairs[code];
  data.region = countryData.region;
  data.country = countryData.code;

  return data;
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
  parse,
  isValid,
}