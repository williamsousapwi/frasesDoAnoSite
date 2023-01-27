import { ApiFraseDoAnoCadastroProps, ApiFraseDoAnoListProps, apiCadastroVotoProps, apiFraseDoAnoCadastrarUsuarioProps, apiFraseDoAnoLoginUsuarioProps, apiRemoverVotoProps } from './api/types'
import { FraseDoAnoListCadastro, FraseDoAnoListProps } from './types'

export const FrasesDoAnoListApiToFrontFactory = (data: ApiFraseDoAnoListProps): FraseDoAnoListProps => ({
  id: data.id,
  phrase: data.frase,
  observation: data.observacao,
  inclusion: data.inclusao,
  alterationDate: data.alteracao,
  inactive: data.inativo,
  idVotation: data.idVotacao
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
  inactive: data.inativo,
  idVotation: data.idVotacao
})

export const UsarioListApiToFrontFactory = (data: apiFraseDoAnoCadastrarUsuarioProps): FraseDoAnoListCadastro => ({
  name: data.nome,
  password: data.senha,
  login: data.login

})

export const FrasesDoAnoUserToApi = (name: string, login: string, password: string): apiFraseDoAnoCadastrarUsuarioProps => ({
  nome: name,
  login: login,
  senha: password
})

export const FrasesDoAnoUserLoginToApi = (login: string, password: string): apiFraseDoAnoLoginUsuarioProps => ({
  login: login,
  senha: password
})

export const FraseDoAnoVotoToApi = (idPhrase: number): apiCadastroVotoProps => ({
  IdFrase: idPhrase
})

export const RemoverDoVotoToApi = (idVotation: number): apiRemoverVotoProps => ({
  IdVotacao: idVotation
})
