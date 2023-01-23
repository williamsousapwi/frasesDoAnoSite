import { ApiFraseDoAnoCadastroProps, ApiFraseDoAnoListProps } from './api/types'
import { FraseDoAnoListProps } from './types'

export const FrasesDoAnoListApiToFrontFactory = (data: ApiFraseDoAnoListProps): FraseDoAnoListProps => ({
  id: data.id,
  phrase: data.frase,
  observation: data.observacao,
  inclusion: data.inclusao,
  alterationDate: data.alteracao,
  inactive: data.inativo
})

export const FrasesDoAnoFrontToApiFactory = (phrase: string, observation: string): ApiFraseDoAnoCadastroProps => ({
  frase: phrase,
  observacao: observation
})

export const FrasesDoAnoListApiToFrontFactorybyName = (data: ApiFraseDoAnoListProps): FraseDoAnoListProps => ({
  id: data.id,
  phrase: data.frase,
  observation: data.observacao,
  inclusion: data.inclusao,
  alterationDate: data.alteracao,
  inactive: data.inativo
})
