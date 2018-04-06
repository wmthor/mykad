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
const REGION_ASIA_PACIFIC = 'ASIA_PACIFIC';
const REGION_EUROPE = 'EUROPE';

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

const aseanCountryCodePairs = {
  '60': 'BN', '61': 'ID', '62': 'KH',
  '63': 'LA', '64': 'MM', '65': 'PH',
  '66': 'SG', '67': 'TH', '68': 'VN',
};

const otherCountryCodePairs = {
  '74': { code: 'CN', region: REGION_EAST_ASIA },
  '75': { code: 'IN', region: REGION_SOUTH_ASIA },
  '76': { code: 'PK', region: REGION_SOUTH_ASIA },
  '77': { code: 'SA', region: REGION_MIDDLE_EAST },
  '78': { code: 'LK', region: REGION_SOUTH_ASIA },
  '79': { code: 'BD', region: REGION_SOUTH_ASIA },
}

const regionCodePairs = {
  '83': REGION_ASIA_PACIFIC,
  '84': REGION_SOUTH_AMERICA,
  '85': REGION_AFRICA,
  '86': REGION_EUROPE,
  '87': REGION_BRITISH_ISLES,
  '88': REGION_MIDDLE_EAST,
  '89': REGION_EAST_ASIA,
  '90': REGION_CENTRAL_AMERICA,
  '91': REGION_NORTH_AMERICA,
  '92': REGION_SOVIET_REPUBLIC,
}

function numisBetween(num, lower, upper) {
  return (num - lower) * (num - upper) <= 0
}

function codeToState(code) {
  for (var key in stateCodePairs) {
    if (stateCodePairs[key].includes(code)) {
      return key;
    }
  }

  return null;
}

function aseanCodeToCountry(code) {
  for (var key in aseanCountryCodePairs) {
    if (aseanCountryCodePairs[key] == code) {
      return key;
    }
  }

  return null;
}

function isMalaysia(code) {
  return (
    numisBetween(code, 1, 16) ||
    numisBetween(code, 21, 59) ||
    code == 82
  );
}

function isAsean(code) {
  return numisBetween(code, 60, 68);
}

function isForeignKnown(code) {
  return numisBetween(code, 74, 79);
}

function isForeignUnknown(code) {
  return [71, 72, 93].includes(code);
}

function isRegion(code) {
  return numisBetween(code, 83, 93);
}

function isStateless(code) {
  return code == 98 || code == 99;
}

function parseMalaysia(code) {  
  const data = {
    region: REGION_SOUTHEAST_ASIA,
    country: 'MY',
    state: codeToState(code),
  };

  return data;
}

function parseAsean(code) {
  const data = {
    region: REGION_SOUTHEAST_ASIA,
    country: aseanCodeToCountry(code),
    state: null,
  }
}

function parseForeignKnown(code) {
  const countryData = otherCountryCodePairs[code];

  const data = {
    region: countryData.region,
    country: countryData.code,
    state: null,
  };

  return data;
}

function parseForeignUnknown(code) {
  const data = {
    region: null,
    country: 'FOREIGN',
    state: null,
  };
  
  if (code == 93) {
    data.country = 'OTHERS';
  }

  return data;
}

function parseRegion(code) {
  const data = {
    region: regionCodePairs[code],
    country: null,
    state: null,
  }

  return data;
}

function parseStateless(code) {
  const country = (code == 98)
    ? 'STATELESS'
    : 'NEUTRAL_ZONE';

  const data = {
    region: null,
    country,
    state: null,
  }

  return data;
}

function birthplaceInfo(code) {
  if (isMalaysia(code)) return parseMalaysia(code);
  if (isAsean(code)) return parseAsean(code);
  if (isForeignKnown(code)) return parseForeignKnown(code);
  if (isForeignUnknown(code)) return parseForeignUnknown(code);
  if (isRegion(code)) return parseRegion(code);
  if (isStateless(code)) return parseStateless(code);

  return null;
}

console.log(birthplaceInfo('98'));
