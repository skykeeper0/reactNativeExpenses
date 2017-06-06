import { getAsyncStorage, setAsyncStorage } from './storageMethods';

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
