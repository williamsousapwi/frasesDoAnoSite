import { dateToDb, dateHourToInput, dateToInput, dateFormatTitle } from './index'

jest.mock('utils/common/constants', () => ({
  MonthList: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  WeekDayList: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
}))

const date = new Date(2021, 0, 1, 1, 1, 1)

test('dateToDb(new Date(2021, 0, 1, 1, 1, 1)) - Expected result 2021-01-01', () => {
  expect(dateToDb(date)).toMatch(/2021-01-01/)
})

test('dateToInput(new Date(2021, 0, 1, 1, 1, 1)) - Expected result 01/01/2021', () => {
  expect(dateToInput(date)).toMatch(/01\/01\/2021/)
})

test('dateToInput(new Date(2021, 0, 1, 1, 1, 1)) - Expected result 01/01/2021 01:01:01', () => {
  expect(dateHourToInput(date)).toMatch(/01\/01\/2021 01:01:01/)
})

test('dateFormatTitle(2021-01-01, 2021-01-11) - Expected result 01/01/2021 - 11/01/2021', () => {
  expect(dateFormatTitle('2021-01-01', '2021-01-11')).toMatch(/01\/01\/2021 - 11\/01\/2021/)
})
