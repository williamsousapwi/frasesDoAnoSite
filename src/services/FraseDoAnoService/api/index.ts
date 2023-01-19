import HttpBase from '@/services/HttpBase'

import { FrasesDoAnoFrontToApiFactory, FrasesDoAnoListApiToFrontFactory } from '../factory'
// import { FraseDoAnoListProps } from '../types'

export const getFraseDoAnoApi = async () =>
  await HttpBase.get('FrasesDoAno', { transformResponse: transformResponseAdapter(FrasesDoAnoListApiToFrontFactory) })

export const postFraseDoAnoApi = async (phrase: string, observation: string) =>
  await HttpBase.post('FrasesDoAno', FrasesDoAnoFrontToApiFactory(phrase, observation))

export const replaceUndefinedForNull = (data: any) => {
  if (!data) return null
  const { ...newData } = data
  Object
    .keys(newData)
    .forEach(key => {
      const value = newData[key]
      if (typeof value === 'object') replaceUndefinedForNull(newData[key])
      if (value === undefined) newData[key] = null
    })
  return newData
}

export const isValidJson = (data: string): boolean => {
  try {
    JSON.parse(data)
    return true
  } catch (error: any) {
    return false
  }
}

export const transformResponseAdapter = <T, U>(transformerFactory: (data: T) => U) => (responseData: string, headers: any): U | U[] => {
  const dataParsed = isValidJson(responseData) ? JSON.parse(responseData) : responseData
  const contentType: string = headers['content-type']
  const transformWithReplace = (data: T) => {
    try {
      return replaceUndefinedForNull(transformerFactory(data))
    } catch (error: any) {
      throw new Error(`Erro ao tratar os dados retornados pela Api.\n\tDetalhes: ${error.message}`)
    }
  }
  if (!contentType || contentType.includes('application/problem+json')) return dataParsed // Error Api
  if (!Array.isArray(dataParsed)) return transformWithReplace(dataParsed)
  return dataParsed.map(item => transformWithReplace(item))
}
