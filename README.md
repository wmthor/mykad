# MyKad
The MyKad library provides tools to validate, parse, and format Malaysian Identity Card (MyKad) numbers.

## Installation
Using npm:
```
npm install mykad
```
## Importing
```
const mykad = require('mykad');
```

## Features
### Validation
MyKad numbers can be checked for validity. It ensures correct 12-digits, valid date of birth, and place of birth code.
```
if (mykad.isValid('560224108354')) {
    console.log('Valid MyKad number');
}

if (mykad.isValid('560224-10-8354')) {
    console.log('Also valid...');
}

// Not valid. Invalid date of birth and place of birth code.
mykad.isValid('561372-70-7953')

```

### Formatting
MyKad numbers can be formatted to either have dash or without. Note that this simply formats without validation (date/place of birth code). You can use isValid() if you need to check for validity.
```
mykad.format('111013018934', (err, formatted) => {
    if (err) throw error;
    console.log(formatted); // 111013-01-8934
});

mykad.unformat('111013-01-8934', (err, unformatted) => {
    if (err) throw error;
    console.log(unformatted); // 111013018934
});
```

## Parsing
MyKad numbers contain information about the holders date of birth, place of birth, and gender.
```
mykad.parse('890724-01-2498', (err, data) => {
    if (err) throw err;
    console.log(data);
    /*
    {
        birthDate: 1989-07-23T16:00:00.000Z,
        birthPlace: { region: 'SOUTHEAST_ASIA', country: 'MY', state: 'JHR' },
        gender: 'female'
    }
    */
});

mykad.parse('921005-91-1487', (err, data) => {
    if (err) throw err;
    console.log(data);
    /*
    {
        birthDate: 1992-10-04T16:00:00.000Z,
        birthPlace:{ region: 'NORTH_AMERICA', country: 'CA|GL|AN|PM|US', state: null },
        gender: 'male'
    }
    */
});
```

### Birthplace
State information is available for those born in Malaysia. For others, it either contains the specific country information, or only an approximation of the region. However, some countries are uncategorized.

#### States 
```
['JHR', 'KDH', 'KTN', 'MLK', 'NSN', 'PHG', 'PNG', 'PRK', 'PLS', 'SBH', 'SWK', 'SGR', 'TRG', 'KUL', 'LBN', 'PJY', 'UNKNOWN_STATE']
```

#### Countries
Refer to [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) for country codes. Country codes can also contain these following status.
```
['FOREIGN_UNKNOWN', 'STATELESS', 'UNSPECIFIED']
```

#### Region
Some codes for place of birth only contain information of the approximate region or some only an approximate country. The list of regions are the following:
```
['SOUTHEAST_ASIA', 'BRITISH_ISLES', 'SOVIET_REPUBLIC', 'EAST_ASIA', 'SOUTH_ASIA', 'AFRICA', 'SOUTH_AMERICA', 'CENTRAL_AMERICA', 'OCEANIA', 'MIDDLE_EAST', 'EUROPE', 'MIDDLE_AMERICA', 'MISCELLANEOUS']
```
Known regions data contains the list of countries. For example:
```
{
    region: 'NORTH_AMERICA',
    country: 'CA|GL|AN|PM|US',
    state: null
}
```