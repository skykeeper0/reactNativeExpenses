import { 
    getAsyncStorage, 
    setAsyncStorage, 
    checkCurrentMonthBudget, 
    saveMonthlyBudget,
    resetAsyncStorage,
    logAsyncStogae
} from '../storageMethods';

import MockStorage from './MockStorage';

const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);

jest.setMock('AsyncStorage', AsyncStorage)

import { seeded_expenses } from './testData.js'

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

    it('should return the budget if budget exist', async () => {
        const budget1 = await checkCurrentMonthBudget('01', '2017');
        expect(budget1).toBe(500);
    })

    it('should return false if the budget doesnt exist', async () => {
        const budget2 = await checkCurrentMonthBudget('02', '2017')
        expect(budget2).toBe(false)
    })
})

describe('saveMonthlyBudget ', () => {
    beforeAll( async () => {
        await AsyncStorage.setItem('test', JSON.stringify(seeded_expenses))
    })

    afterAll( async () => {
        await AsyncStorage.setItem('test', '')
    })

    it('should add new month to the year with budget if the month is not exist', async () => {
        await saveMonthlyBudget('02','2017', 3000)
        const expenses = await getAsyncStorage();
        expect(expenses['2017']['02'].budget).toBe(3000)
    })

    it('should replace the current month budget if it already exist', async () => {
        await saveMonthlyBudget('02','2017', 4000)
        const expenses = await getAsyncStorage();
        expect(expenses['2017']['02'].budget).toBe(4000)
    })

    it('should add new month and year if none of them exsit yet', async () => {
        await saveMonthlyBudget('01','2018', 400000)
        const expenses = await getAsyncStorage();
        expect(expenses['2018']['01'].budget).toBe(400000)
    })
})

describe('resetAsyncStorage ', () => {
    beforeAll( async () => {
        await AsyncStorage.setItem('test',JSON.stringify(seeded_expenses))
    })

    afterAll( async () => {
        await AsyncStorage.setItem('test', '')
    })

    it('should erase data in AsyncStorage', async () => {
        resetAsyncStorage();
        const data = await getAsyncStorage();
        expect(data).toEqual({});
    })
})

describe('logAsyncStorage ', () => {

    xit('should log data in AsyncStorage', () => {

    })
})
