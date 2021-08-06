# MyKad

[![NPM](https://nodei.co/npm/mykad.png)](https://nodei.co/npm/mykad/)

The MyKad library provides tools to validate, parse, generate, and format Malaysian Identity Card (MyKad) numbers.

## Installation

Using npm:

```bash
npm install mykad
```


## Importing

```javascript
const mykad = require('mykad');
```

## Browser

```html
<script src="browser/mykad.min.js"></script>
```

## Features

### Validation

MyKad numbers can be checked for validity. It ensures correct 12-digits, valid date of birth, and place of birth code.

```javascript
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

#### Format
```javascript
try {
    const formatted = mykad.format('111013018934');
    console.log(formatted); // 111013-01-8934
} catch (error) {
    throw error; // Input error
}

// Alternative
mykad.format('111013018934', (err, formatted) => {
    if (err) throw error;
    console.log(formatted); // 111013-01-8934
});
```
#### Unformat
```javascript
try {
    const unformatted = mykad.unformat('111013-01-8934');
    console.log(unformatted); // 111013018934
} catch (error) {
    throw error; // Input error
}

// Alternative
mykad.unformat('111013-01-8934', (err, unformatted) => {
    if (err) throw error;
    console.log(unformatted); // 111013018934
});
```

### Generate

You can generate random MyKad numbers. All generate numbers are valid MyKad numbers.

```javascript
const randomIcNum = mykad.generateRandom();
console.log(randomIcNum);
```

## Parsing

MyKad numbers contain information about the holder's date of birth, place of birth, and gender. Date of birth assumes the age is under 100 years old. For example, the birth year '12' is 2012 instead of 1912.

```javascript
try {
    const data = mykad.parse('890724-01-2498');
    console.log(data);
} catch (error) {
    throw error;
}

// Alternative
mykad.parse('890724-01-2498', (err, data) => {
    if (err) throw err;
    console.log(data);
});
```

Parsed data is as the following:

```javascript
{
    birthDate: new Date(1989, 6, 24),
    birthPlace: { region: 'SOUTHEAST_ASIA', country: 'MY', state: 'JHR' },
    gender: 'female'
}
```

### Birthplace

State information is available for those born in Malaysia. For others, it either contains the specific country information or only an approximation of the region. However, some countries are uncategorized.

#### States 

```javascript
['JHR', 'KDH', 'KTN', 'MLK', 'NSN', 'PHG', 'PNG', 'PRK', 'PLS', 'SBH', 'SWK', 'SGR', 'TRG', 'KUL', 'LBN', 'PJY', 'UNKNOWN_STATE']
```

#### Countries

Refer to [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) for country codes. Country codes can also contain these following status.

```javascript
['FOREIGN_UNKNOWN', 'STATELESS', 'UNSPECIFIED']
```

#### Region

Some codes for place of birth only contain information of the approximate region or some only an approximate country. The list of regions are the following:

```javascript
['SOUTHEAST_ASIA', 'BRITISH_ISLES', 'SOVIET_REPUBLIC', 'EAST_ASIA', 'SOUTH_ASIA', 'AFRICA', 'SOUTH_AMERICA', 'CENTRAL_AMERICA', 'OCEANIA', 'MIDDLE_EAST', 'EUROPE', 'MIDDLE_AMERICA', 'MISCELLANEOUS']
```

Known regions data contains the list of the countries as documented in the official registry. For example:

```javascript
{
    region: 'NORTH_AMERICA',
    country: 'CA|GL|AN|PM|US',
    state: null
}
```

### Gender

Gender information is provided in the form of the following values:

```javascript
['male', 'female']
```

## Error handling
You can omit try/catch error handling when the inputted IC numbers are certain to be valid, such as after calling `mykad.isValid(icNum)` to verify the input.

```javascript
if (mykad.isValid(icNum)) {
    mykad.format(icNum);
    mykad.unformat(icNum);
    mykad.parse(icNum);
}
```

## Issues
For any issues or suggestions for the library, you can make them on the GitHub repository.

More info: [twm](https://twm.me)