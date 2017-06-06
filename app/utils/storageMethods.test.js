import { getAsyncStorage } from './storageMethods';

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

  beforeEach(async () => {
    await AsyncStorage.setItem('test', JSON.stringify(expenses))
  })

  it('should be able to load data from AsyncStorage', async () => {
    const data = await getAsyncStorage()
    expect(data).toEqual(expenses)
  })
})

// xdescribe('setAsyncStorage', () => {

//  xit('should be able set data into Storage when storage is empty', () => {

//   })

//  xit('should be able set data into Storage when storage isnt empty', () => {

//   })
// })
