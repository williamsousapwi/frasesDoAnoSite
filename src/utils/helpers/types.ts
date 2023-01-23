import { Moment, MomentInput } from 'moment'

export enum DateFomartTypes {
  // Dia
  Day = 'DD',
  DayName = 'dddd',

  // Mês
  Month = 'MM',
  MonthName = 'MMMM',

  // Ano
  SummaryYear = 'YY',
  Year = 'YYYY',

  // ISO (Organização Internacional para Padronização)
  Iso = 'YYYY-MM-DD',
  IsoTime = 'YYYY-MM-DDTHH:mm:ss',

  DayMonth = 'DD/MM',
  DayMonthName = 'DD/MMM',

  MonthYear = 'MM-YYYY',
  MonthYearInput = 'MM/YYYY',
  MonthNameYear = 'MMM/YYYY',
  MonthYearName = 'MMMM YYYY',

  Time = 'HH:mm:ss',
  DateInput = 'DD/MM/YYYY',
  DateTimeInput = 'DD/MM/YYYY HH:mm:ss'
}

export type DateAcceptType = Date | string | undefined | null | Moment | MomentInput
