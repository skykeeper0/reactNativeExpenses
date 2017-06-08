import seeded_expenses from './testData.js';
import MockDate from 'mockdate';
import { getYear } from '../dateMethods.js';


const date = new Date(2018, 2, 1)

// set the current time to 1/1/2017
MockDate.set('1/1/2017');

describe('getYear ', () => {

  it('should return current year if there are no input', () => {
    const year = getYear();
    expect(year).toBe('2017')
  })

  it('should return year of the input day if it exist', () => {
    const year = getYear(date);
    expect(year).toBe('2018')
  })
})


MockDate.reset()