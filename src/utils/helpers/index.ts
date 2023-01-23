import moment, { Moment, unitOfTime } from 'moment'
//* import { checkEquals } from 'utils/common'-
//* import { MonthList, ShortMonthList, WeekDayList } from 'utils/common/constants'

//* import { generateNumberArray } from '../Array'
import { DateAcceptType, DateFomartTypes } from './types'

/** Classe estatica DateHelper */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DateHelper {
  private static _moment: Moment = moment(new Date())
  private static _noReset: boolean = false

  /** Metodos de adapter's privados */
  private static readonly callbackReturnThis = <T extends unknown[]>(fnc: (...args: T) => void) =>
    (...args: T) => {
      fnc(...args)

      return this
    }

  private static readonly callbackResetDate = <T extends unknown[], TResult>(fnc: (...args: T) => TResult) =>
    (...args: T): TResult => {
      const result = fnc(...args)

      if (!this._noReset) {
        this._moment = moment(new Date())
      }

      this._noReset = false

      return result
    }

  /** Metodos privados */
  // private static readonly getDatesBetweenPeriod = this.callbackResetDate((condition: 'day' | 'month' | 'year', finalDate: DateAcceptType) => {
  //   const initialDateMoment = this._moment.clone().set({ hours: 0, minutes: 0, seconds: 0 })
  //   const finalDateMoment = moment(finalDate).set({ hours: 0, minutes: 0, seconds: 0 })
  //   // const countDays = finalDateMoment.diff(initialDateMoment, condition) + 1 // Realiza o mais 1 pois o 'moment.diff' não considera a propria data

  //   // Utiliza o "Math.min(i, 1)" para não pular o primeiro dia que será o proprio "initialDate"
  //   return generateNumberArray(countDays, 0).map(i => initialDateMoment.add(Math.min(i, 1), condition).format('YYYY-MM-DD'))
  // })

  /** Metodos para manuseio da data */
  static setDay = this.callbackReturnThis((day: number) => this._moment.set('date', day))
  static addDay = this.callbackReturnThis((count: number) => this._moment.add(count, 'day'))
  static subtractDay = this.callbackReturnThis((count: number) => this._moment.subtract(count, 'day'))

  static setMonth = this.callbackReturnThis((month: number) => this._moment.set('month', month))
  static addMonth = this.callbackReturnThis((count: number) => this._moment.add(count, 'month'))
  static subtractMonth = this.callbackReturnThis((count: number) => this._moment.subtract(count, 'month'))

  static setYear = this.callbackReturnThis((year: number) => this._moment.set('year', year))
  static addYear = this.callbackReturnThis((count: number) => this._moment.add(count, 'year'))
  static subtractYear = this.callbackReturnThis((count: number) => this._moment.subtract(count, 'year'))

  static toStartWeek = this.callbackReturnThis(() => this._moment.startOf('week'))
  static toEndWeek = this.callbackReturnThis(() => this._moment.endOf('week'))

  static toStartMonth = this.callbackReturnThis(() => this._moment.startOf('month'))
  static toEndMonth = this.callbackReturnThis(() => this._moment.endOf('month'))

  static toStartYear = this.callbackReturnThis(() => this._moment.startOf('year'))
  static toEndYear = this.callbackReturnThis(() => this._moment.endOf('year'))

  /** Metodos finais (Retornam dados) */
  static format = this.callbackResetDate((dateFormat: DateFomartTypes, removeTimeIfEmpty: boolean = false): string => {
    const removeTime = removeTimeIfEmpty && this._moment.hours() === 0 && this._moment.minutes() === 0 && this._moment.seconds() === 0

    return this._moment.format(removeTime ? dateFormat.replace('HH:mm:ss', '') : dateFormat)
  })

  static diffDay = this.callbackResetDate((finalDate: string): number => moment(finalDate).diff(this._moment, 'day'))

  static getDay = this.callbackResetDate(() => this._moment.date())

  static getMonth = this.callbackResetDate(() => this._moment.month())

  static getYear = this.callbackResetDate(() => this._moment.year())

  // static dateIsWeekend = this.callbackResetDate(() => checkEquals(this._moment.weekday(), [0, 6]))

  static countDaysInMonth = this.callbackResetDate(() => this._moment.daysInMonth())

  static isValid = this.callbackResetDate(() => this._moment.isValid())

  // static getWeekDays = this.callbackResetDate((): string[] => {
  //   this.toStartWeek() // Leva a data atual para o inicio da semana
  //   const finalWeek = this._moment.clone().endOf('week')

  //   return this.getDaysBetweenDates(finalWeek)
  // })

  // static getDaysBetweenDates = this.callbackResetDate((finalDate: DateAcceptType) => this.getDatesBetweenPeriod('day', finalDate))

  // static getMonthsBetweenDates = this.callbackResetDate((finalDate: DateAcceptType): string[] => this.getDatesBetweenPeriod('month', finalDate))

  // static getYearsBetweenDates = this.callbackResetDate((finalDate: DateAcceptType): string[] => this.getDatesBetweenPeriod('year', finalDate))

  static isBefore = this.callbackResetDate((date: DateAcceptType, granularity?: unitOfTime.StartOf): boolean => this._moment.isBefore(date, granularity))
  static isSameOrBefore = this.callbackResetDate((date: DateAcceptType, granularity?: unitOfTime.StartOf): boolean => this._moment.isSameOrBefore(date, granularity))

  static isAfter = this.callbackResetDate((date: DateAcceptType, granularity?: unitOfTime.StartOf): boolean => this._moment.isAfter(date, granularity))
  static isSameOrAfter = this.callbackResetDate((date: DateAcceptType, granularity?: unitOfTime.StartOf): boolean => this._moment.isSameOrAfter(date, granularity))

  /** Metodos de configuração */
  static populateMonthsLocale = (monthList: string[]) => moment.updateLocale('pt-br', { months: monthList })
  static populateShortMonthsLocale = (shortMonthList: string[]) => moment.updateLocale('pt-br', { monthsShort: shortMonthList })
  static populateWeekDaysLocale = (weekDayList: string[]) => moment.updateLocale('pt-br', { weekdays: weekDayList })
  static updatePortugueseMomentLocale = () => {
    moment.locale('pt-br')
  }

  /** Metodos publicos auxiliares */
  static setDate = this.callbackReturnThis((date: Date | string | undefined) => {
    this._moment = moment(date ?? new Date())
  })

  static noReset = this.callbackReturnThis(() => {
    this._noReset = true
  })
}

export const dateToDb = (date: DateAcceptType = '') =>
  date ? moment(date).format('YYYY-MM-DD') : undefined

export const dateToApiOrEmpty = (date: DateAcceptType = '') =>
  date ? moment(date).format('YYYY-MM-DD') : ''

export const monthYearToDb = (date: DateAcceptType = '') =>
  date ? moment(date).format('MM-YYYY') : ''

export const dateToInput = (date: DateAcceptType = '') =>
  date ? moment(date).format('DD/MM/YYYY') : ''

export const timeToInput = (date: DateAcceptType = '') =>
  date ? moment(date).format('HH:mm:ss') : ''

// export const dateTimeToInput = (date: DateAcceptType = '') =>
// `${dateToInput(date)} ${timeToInput(date)}`

export const monthToInput = (date: DateAcceptType = '') =>
  date ? moment(date).format('DD/MM') : ''

export const dayToInput = (date: DateAcceptType = '') =>
  date ? moment(date).format('DD') : ''

export const monthYearToInput = (date: DateAcceptType = '') =>
  date ? moment(date).format('MM/YYYY') : ''

export const yearToInput = (date: DateAcceptType = '') =>
  date ? moment(date).format('YYYY') : ''

export const monthNameToInput = (date: Date | string) => moment(date).format('DD/MMM')

export const monthName = (date: Date | string) => moment(date).format('MMM/YYYY')

// export const dateHourToInput = (date: DateAcceptType = '', removeTimeIfEmpty: boolean = true) => {
//   const dateMoment = moment(date)

//   if (!dateMoment.isValid()) return ''

//   const dateFormated = dateToInput(date)
//   const timeFormated = removeTimeIfEmpty && dateMoment.hours() === 0 && dateMoment.minutes() === 0 && dateMoment.seconds() === 0
//     ? ''
//     : ` - ${timeToInput(date)}`

//   return `${dateFormated}${timeFormated}`
// }

export const dateHourToDb = (date: DateAcceptType = '') =>
  date ? moment(date).format('YYYY-MM-DDTHH:mm:ss') : ''

export const dateSubtractByPeriod = (period: number = 0, date?: DateAcceptType) => {
  return moment(date ?? new Date()).subtract(period, 'days').startOf('day').format()
}

export const dateAddDaysByPeriod = (date: DateAcceptType = '', period: number = 0) => date ? moment(date).add(period, 'days') : ''

export const dateAddCurrentByPeriod = (period: number = 0) => moment().add(period, 'days').startOf('day').format()

// export const dateFormatTitle = (initial: string = '', final: string = ''): string => {
//   return `${dateToInput(initial)}` + (final !== '' ? `${(` - ${dateToInput(final)}`)}` : '')
// }

export const dateMonthName = (date: Date | string) => moment(date).format('MMMM')

export const dateWeekDayName = (date: Date | string) => moment(date).format('dddd')

export const dateClone = (date: DateAcceptType = '') => date ? moment(date).toDate() : null

// export const populateMonthsLocale = () => moment.updateLocale('pt-br', { months: MonthList })

// export const populateShortMonthsLocale = () => moment.updateLocale('pt-br', { monthsShort: ShortMonthList })

// export const populateWeekDaysLocale = () => moment.updateLocale('pt-br', { weekdays: WeekDayList })

// export const updatePortugueseMomentLocale = () => {
//   populateMonthsLocale()
//   populateShortMonthsLocale()
//   populateWeekDaysLocale()
//   moment.locale('pt-br')
// }

export const dateIsWeekend = (date: Date | string) => {
  const weekday = moment(date).weekday()
  return weekday === 6 || weekday === 0
}

export const dateToNextWeekday = (date: Date) => {
  while (dateIsWeekend(date)) {
    date.setDate(date.getDate() + 1)
  }
}

export const getYearDate = (date: Date | string) => moment(date).year()

export const getResumeYearDate = (date: Date | string) => moment(date).format('YY')

export const getMonthDate = (date: Date | string) => moment(date).month()

export const getDayDate = (date: DateAcceptType) => moment(date).date()

// export const dateMonthYear = (date: Date | string) => `${dateMonthName(date).toUpperCase()} ${getYearDate(date)}`

export const getStartWeek = (date: DateAcceptType, startByMonday?: boolean) => moment(date).startOf(startByMonday ? 'isoWeek' : 'week')

export const getEndWeek = (date: DateAcceptType, startByMonday?: boolean) => moment(date).endOf(startByMonday ? 'isoWeek' : 'week')

export const getStartMonth = (date: DateAcceptType) => moment(date).startOf('month')

export const getEndMonth = (date: DateAcceptType) => moment(date).endOf('month')

export const getStartYear = (date: DateAcceptType) => moment(date).startOf('year')

export const getEndYear = (date: DateAcceptType) => moment(date).endOf('year')

export const getCountDayInMonth = (date: DateAcceptType) => moment(date).daysInMonth()

export const getPreviousMonth = (date: DateAcceptType) => moment(date).add(-1, 'month')

export const getPreviousWeekByPeriod = (period: number, date?: DateAcceptType) => moment(date ?? new Date()).add(period * -1, 'week')

export const getNextWeekByPeriod = (period: number, date?: DateAcceptType) => moment(date ?? new Date()).add(period, 'week')

export const isValidDate = (date: string): boolean => moment(date).isValid()

// export const getDaysBetweenDates = (initialDate: DateAcceptType, finalDate: DateAcceptType): string[] => {
//   const initialDateMoment = moment(initialDate).set({ hours: 0, minutes: 0, seconds: 0 })
//   const finalDateMoment = moment(finalDate).set({ hours: 0, minutes: 0, seconds: 0 })
//   const countDays = finalDateMoment.diff(initialDateMoment, 'day') + 1

//   return generateNumberArray(countDays, 0).map(i => dateHourToDb(initialDateMoment.add(Math.min(i, 1), 'days')))
// }

// export const getWeekDaysByDate = (date: DateAcceptType, startByMonday?: boolean): string[] => {
//   const initalDayWeek = moment(date).startOf(startByMonday ? 'isoWeek' : 'week')
//   const finalDayWeek = moment(date).endOf(startByMonday ? 'isoWeek' : 'week')

//   return getDaysBetweenDates(initalDayWeek, finalDayWeek)
// }

// export const getMonthsBetweenDates = (initialDate: DateAcceptType, finalDate: DateAcceptType): string[] => {
//   const initialDateMoment = moment(initialDate)
//   const finalDateMoment = moment(finalDate)
//   const countMonths = finalDateMoment.diff(initialDateMoment, 'month') + 1

//   return generateNumberArray(countMonths, 0).map(i => dateHourToDb(initialDateMoment.add(Math.min(i, 1), 'month')))
// }

export const generateDateByProps = (day: number, month: number, year: number): string =>
  moment(`${year}-${month.toString().padStart(2, '0')}-${day.toString().toString().padStart(2, '0')}`).format('YYYY-MM-DD')

export const validateDateBetweenDates = (initialDate: DateAcceptType, finalDate: DateAcceptType, date: DateAcceptType): boolean => {
  const momentDate = moment(date)
  const momentInitialDate = moment(initialDate)
  const momentFinalDate = moment(finalDate)

  return momentDate.isBetween(momentInitialDate, momentFinalDate)
}
