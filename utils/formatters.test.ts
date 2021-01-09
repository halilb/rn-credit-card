import { cardNumberFormatter, expirationDateFormatter } from './formatters'

describe('cardNumberFormatter', () => {
  test.each([
    {
      // pasting the number
      oldValue: '',
      newValue: '5555555555554444',
      output: '5555 5555 5555 4444',
    },
    {
      // trims extra characters
      oldValue: '',
      newValue: '55555555555544443333',
      output: '5555 5555 5555 4444',
    },
    {
      oldValue: '',
      newValue: '5555555555',
      output: '5555 5555 55',
    },
    {
      oldValue: '555',
      newValue: '5555',
      output: '5555 ',
    },
    {
      // deleting a character
      oldValue: '5555 5',
      newValue: '5555 ',
      output: '5555 ',
    },
    {
      oldValue: '',
      newValue: '5',
      output: '5',
    },
  ])('%j', ({ oldValue, newValue, output }) => {
    expect(cardNumberFormatter(oldValue, newValue)).toEqual(output)
  })
})

describe('expirationDateFormatter', () => {
  test.each([
    {
      // pasting 1121
      oldValue: '',
      newValue: '1121',
      output: '11/21',
    },
    {
      // pasting 11/21
      oldValue: '',
      newValue: '11/21',
      output: '11/21',
    },
    {
      oldValue: '1',
      newValue: '12',
      output: '12/',
    },
    {
      oldValue: '12/',
      newValue: '12/2',
      output: '12/2',
    },
    {
      oldValue: '12/2',
      newValue: '12/22',
      output: '12/22',
    },
    {
      // deleting a character
      oldValue: '12/2',
      newValue: '12/',
      output: '12/',
    },
  ])('%j', ({ oldValue, newValue, output }) => {
    expect(expirationDateFormatter(oldValue, newValue)).toEqual(output)
  })
})
