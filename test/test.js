var chai = require('chai');  
var expect = chai.expect;

const mykad = require('../dist/');

describe('MyKad', () => {
  describe('#isValid()', () => {
    it('should return true for valid unformatted MyKad number', () => {
      expect(mykad.isValid('910401052331')).to.be.true;
      expect(mykad.isValid('000401052331')).to.be.true;
    });

    it('should return true for valid formatted MyKad number', () => {
      expect(mykad.isValid('910223-08-1274')).to.be.true;
      expect(mykad.isValid('000223-08-1274')).to.be.true;
    });

    it('should return false for invalid input', () => {
      expect(mykad.isValid('loooool')).to.be.false;  
    });

    it('should return false for MyKad with too many numbers', () => {
      expect(mykad.isValid('27812121293451')).to.be.false;
    });

    it('should return false for MyKad with too little numbers', () => {
      expect(mykad.isValid('8705')).to.be.false;
    });

    it('should return false for MyKad with invalid date of birth', () => {
      expect(mykad.isValid('110234013324')).to.be.false;
      expect(mykad.isValid('110200013324')).to.be.false;
    });

    it('should return false for MyKad with invalid month of birth', () => {
      expect(mykad.isValid('541324013324')).to.be.false;
      expect(mykad.isValid('540024013324')).to.be.false;
    });

    it('should return false for MyKad with invalid month and date of birth', () => {
      expect(mykad.isValid('541352013324')).to.be.false;
      expect(mykad.isValid('540000013324')).to.be.false;
    });

    it('should return false for MyKad with invalid place of births', () => {
      const invalidBirthPlaceCodes = [
        '00', '17', '18', '19', '20', '69', '70', 
        '73', '80', '81', '94', '95', '96', '97',
      ];

      invalidBirthPlaceCodes.forEach((code) => {
        expect(mykad.isValid(`560714${code}3094`)).to.be.false;
      })
    });
  });

  describe('#parse()', () => {
    it('should return correct data object for valid MyKad numbers', () => {
      const numDataPairs = {
        '460911021389': {
          birthDate: new Date(1946, 8, 11),
          birthPlace: { region: 'SOUTHEAST_ASIA', country: 'MY', state: 'KDH' },
          gender: 'male',
        },
        '001103049627': {
          birthDate: new Date(2000, 10, 3),
          birthPlace: { region: 'SOUTHEAST_ASIA', country: 'MY', state: 'MLK' },
          gender: 'male',
        },
        '880527637345': {
          birthDate: new Date(1988, 4, 27),
          birthPlace: { region: 'SOUTHEAST_ASIA', country: 'LA', state: null },
          gender: 'male',
        },
        '440807724018': {
          birthDate: new Date(1944, 7, 7),
          birthPlace: { region: null, country: 'FOREIGN_UNKNOWN', state: null },
          gender: 'female',
        },
        '921105789014': {
          birthDate: new Date(1992, 10, 5),
          birthPlace: { region: 'SOUTH_ASIA', country: 'LK', state: null },
          gender: 'female',
        },
        '640101829913': {
          birthDate: new Date(1964, 0, 1),
          birthPlace: { region: 'SOUTHEAST_ASIA', country: 'MY', state: 'UNKNOWN_STATE' },
          gender: 'male',
        },
        '850215902166': {
          birthDate: new Date(1985, 1, 15),
          birthPlace: { region: 'MIDDLE_AMERICA', country: 'BS|BB|BZ|CR|CU|DM|DO|SV|GD|GT|HT|HN|' +
            'JM|MQ|MX|NI|PA|PR|KN|LC|VC|TT|TC|VI', state: null },
          gender: 'female',
        },
        '880717932209': {
          birthDate: new Date(1988, 6, 17),
          birthPlace: { region: 'MISCELLANEOUS', country:
            'AF|AD|AQ|AG|AZ|BJ|BM|BT|IO|BF|CV|KY|KM|DY|GQ|TF|GI|GW|HK|' + 
            'IS|CI|KZ|KI|KG|LS|LY|LI|MO|MG|MV|MU|MN|MS|NR|NP|MP|PW|PS|' +
            'PN|SH|LC|VC|WS|SM|ST|SC|SB|SJ|TJ|TM|TV|HV|UZ|VU|VA|VG|YU',state: null },
          gender: 'male',
        },
        '890405983319': {
          birthDate: new Date(1989, 3, 5),
          birthPlace: { region: null, country: 'STATELESS', state: null },
          gender: 'male',
        },
        '931030990123': {
          birthDate: new Date(1993, 9, 30),
          birthPlace: { region: null, country: 'UNSPECIFIED', state: null },
          gender: 'male',
        },
      }
  
      Object.keys(numDataPairs).find(key => {
        mykad.parse(key, (err, data) => {
          expect(data).to.deep.equal(numDataPairs[key]);
        });
      });
    });

    it('should return correct data object for valid formatted MyKad number', done => {
      const icNum = '460911-02-1389';
      mykad.parse(icNum, (err, data) => {
        expect(data).to.deep.equal({
          birthDate: new Date(1946, 8, 11),
          birthPlace: { region: 'SOUTHEAST_ASIA', country: 'MY', state: 'KDH' },
          gender: 'male',
        });
        done();
      });
    });

    it('should throw error for MyKad number with wrong format', done => {
      const icNum = '1910401052331';
      mykad.parse(icNum, (err, data) => {
        expect(err).to.be.an('error');
        expect(data).to.be.null;
        done();
      });
    });

    it('should throw error for invalid input', done => {
      const icNum = 'lololz';
      mykad.parse(icNum, (err, data) => {
        expect(err).to.be.an('error');
        expect(data).to.be.null;
        done();
      })
    });
  });

  describe('#format()', () => {
    it('should return formatted MyKad number', done => {
      mykad.format('670822073459', (err, formatted) => {
        expect(formatted).to.be.equal('670822-07-3459');
        done();
      });
    });

    it('should throw error for invalid MyKad number', done => {
      mykad.format('67a642019435', (err, formatted) => {
        expect(err).to.be.an('error');
        expect(formatted).to.be.null;
        done();
      });
    });
  });

  describe('#unformat()', () => {
    it('should return unformatted MyKad number', done => {
      mykad.unformat('450312-09-4387', (err, unformatted) => {
        expect(unformatted).to.be.equal('450312094387');
        done();
      });
    });

    it('should throw error for invalid MyKad number', done => {
      mykad.unformat('95303132094287', (err, formatted) => {
        expect(err).to.be.an('error');
        expect(formatted).to.be.null;
        done();
      });
    });
  });

  describe('#generateRandom()', () => {
    it('should return valid randomized MyKad number', () => {
      const randomNo = mykad.generateRandom();

      expect(randomNo).to.have.lengthOf(12);
      expect(mykad.isValid(randomNo)).to.be.true;
    });
  });
});