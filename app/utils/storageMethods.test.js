import { 
    getAsyncStorage, 
    setAsyncStorage, 
    checkCurrentMonthBudget, 
    saveMonthlyBudget
} from './storageMethods';

import MockStorage from './MockStorage';

const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);

jest.setMock('AsyncStorage', AsyncStorage)

const seeded_expenses = {
        '2017': {
            '01': {
                budget: 500,
                expenses: [
                    {
                        amount: '4',
                        category: 'Coffee',
                        date: 'Jan 12, 2017',
                        description: 'Latte @ Coffeeshop'
                    },{
                        amount: '1.50',
                        category: 'Books',
                        date: 'Jan 17, 2017',
                        description: 'Sunday Newspaper'
                    }
                ]
            }
        }
    }

it('Mock Async Storage working', async () => {
  await AsyncStorage.setItem('myKey','myValue')
  const value = await AsyncStorage.getItem('myKey')
  expect(value).toBe('myValue')
})

describe('getAsyncStorage', () => {
  // add seeededData into Storage and check the data it got back
  const expenses = {'a':'b'}

  beforeAll(async () => {
    await AsyncStorage.setItem('test', JSON.stringify(expenses))
  })

  afterAll(async () => {
    await AsyncStorage.setItem('test', '')
  })

  it('should be able to load data from AsyncStorage', async () => {
    const data = await getAsyncStorage()
    expect(data).toEqual(expenses)
  })
})

describe('setAsyncStorage', () => {
  const expenses_testcase1 = {'a':'b'}
  const expenses_testcase2 = {'b': 'c'}

  beforeAll(async () => {
    await AsyncStorage.setItem('test', '')
  })

  afterEach(async () => {
    await AsyncStorage.setItem('test', '')
  })

 it('should be able set data into Storage when storage is empty', async () => {
    await setAsyncStorage(expenses_testcase1)
    const data = await AsyncStorage.getItem('test')
    expect(JSON.parse(data)).toEqual(expenses_testcase1)
  })

 it('should be able set data into Storage when storage isnt empty', async () => {
    await setAsyncStorage(expenses_testcase2)
    const data = await AsyncStorage.getItem('test')
    expect(JSON.parse(data)).toEqual(expenses_testcase2)
  })
})

describe('checkCurrentMonthBudget ', () => {
    beforeAll(async () => {
        await AsyncStorage.setItem('test', JSON.stringify(seeded_expenses))
    })

    afterAll(async () => {
        await AsyncStorage.setItem('test', '')
    })

    it('should return the budget if budget exist', () => {
        const budget1 = checkCurrentMonthBudget('01', '2017');
        expect(budget1).toBe(500);
    })

    it('should return false if the budget doesnt exist', () => {
        const budget2 = checkCurrentMonthBudget('02', '2017')
        expect(budget2).toBe(false)
    })
})

describe('saveMonthlyBudget ', () => {
    beforeAll( async () => {
        await AsyncStorage.setItem('test', JSON.stringify(seeded_expenses))
    })

    afterAll( () => {
        await AsyncStorage.setItem('test', '')
    })

    xit('should add new month to the year with budget if none exist', async () => {
        await saveMonthlyBudget('02','2017', 3000)
        const expenses = getAsyncStorage();
        expect(expenses['2017']['02'].budget).tobe(3000)
    })

    xit('should replace the current month budget if it already exist', () => {
        await saveMonthlyBudget('02','2017', 4000)
        const expenses = getAsyncStorage();
        expect(expenses['2017']['02'].budget).tobe(4000)
    })

    xit('should add new month and year if none of them exsit yet', () => {
        await saveMonthlyBudget('01','2018', 400000)
        const expenses = getAsyncStorage();
        expect(expenses['2018']['01'].budget).tobe(400000)
    })
})