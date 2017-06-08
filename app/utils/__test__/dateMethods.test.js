import seeded_expenses from './testData.js';
import MockDate from 'mockdate';
import { getYear, getMonth, getDay, getMonthString } from '../dateMethods.js';

// input date
const date = new Date(2018,1,2)

describe('getYear ', () => {

  beforeAll( () => {
    MockDate.set('1/1/2017');
  })

  it('should return current year if there are no input', () => {
    const year = getYear();
    expect(year).toBe('2017')
  })

  it('should return year of the input day when it exist', () => {
    const year = getYear(date);
    expect(year).toBe('2018')
  })
})

describe('getMonth ', () => {

  beforeAll( () => {
    MockDate.set('1/1/2017');
  })

  it('should return current month if there are no input', () => {
    const month = getMonth();
    expect(month).toBe('1')
  })

  it('should return month of the input date when it exist', () => {
    const month = getMonth(date);
    expect(month).toBe('2')
  })
})

describe('getDay ', () => {

  beforeAll( () => {
    MockDate.set('1/21/2017');
  })

  it('should return current day if there are no input', () => {
    const day = getDay();
    expect(day).toBe('21')
  })

  it('should return the day of the input date when it exist', () => {
    const day = getDay(date)
    expect(day).toBe('2')
  })
})

describe('getMonthString ', () => {

  it('should return month in string if the input is int type', () => {
    const month = getMonthString(5);
    expect(month).toBe('May');
  })

  it('should return month in string if the input is string type', () => {
    const month = getMonthString('12');
    expect(month).toBe('December');
  })

  it('should return undefined if the input is not valid a month', () => {
    const month = getMonthString('123');
    expect(month).toBe(undefined)
  })
})

MockDate.reset()
