import HttpBase from '@/services/HttpBase'

import { FraseDoAnoVotoToApi, FrasesDoAnoFrontToApiFactory, FrasesDoAnoListApiToFrontFactory, FrasesDoAnoListApiToFrontFactorybyName, FrasesDoAnoUserLoginToApi, FrasesDoAnoUserToApi, RankingListApiToFrontFactory } from '../factory'

export const CadastrarVotoApi = async (idPhrase: number) =>
  await HttpBase.post('votacao', FraseDoAnoVotoToApi(idPhrase))

export const getRanking = async () =>
  await HttpBase.get('Votacao/ranking', { transformResponse: transformResponseAdapter(RankingListApiToFrontFactory) })

export const RemoverVotoApi = async (id: number) =>
  await HttpBase.delete(`votacao/${id}`)

export const cadastrarUsuarioApi = async (name: string, login: string, password: string) =>
  await HttpBase.post('Usuario/Cadastro', FrasesDoAnoUserToApi(name, login, password))

export const LogarUsuarioApi = async (login: string, password: string) =>
  await HttpBase.post<number>('Usuario/Login', FrasesDoAnoUserLoginToApi(login, password))

export const getFraseDoAnoApi = async () =>
  await HttpBase.get('FrasesDoAno', { transformResponse: transformResponseAdapter(FrasesDoAnoListApiToFrontFactory) })

export const getFraseDoAnoNameApi = async (phrase: string) =>
  await HttpBase.get(`FrasesDoAno?frase=${phrase}`, { transformResponse: transformResponseAdapter(FrasesDoAnoListApiToFrontFactorybyName) })

export const getFraseDoAnoIdApi = async (id: number) =>
  await HttpBase.get(`FrasesDoAno/${id}`)

export const postFraseDoAnoApi = async (phrase: string, observation: string) =>
  await HttpBase.post('FrasesDoAno', FrasesDoAnoFrontToApiFactory(phrase, observation))

export const deleteFraseDoAnoApi = async (id: number) =>
  await HttpBase.delete(`FrasesDoAno/${id}`)

export const putFraseDoAnoApi = async (id: number, phrase: string, observation: string) =>
  await HttpBase.put(`FrasesDoAno/${id}`, FrasesDoAnoFrontToApiFactory(phrase, observation))

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
      throw new Error('Erro ao tratar os dados retornados pela Api.\n\tDetalhes: ')
    }
  }
  if (!contentType || contentType.includes('application/problem+json')) return dataParsed // Error Api
  if (!Array.isArray(dataParsed)) return transformWithReplace(dataParsed)
  return dataParsed.map(item => transformWithReplace(item))
}
