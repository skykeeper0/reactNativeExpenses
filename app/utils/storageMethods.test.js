import { getAsyncStorage } from './storageMethods';

test('get data from storage', () => {
  expect(getAsyncStorage()).toBe(3)
})
