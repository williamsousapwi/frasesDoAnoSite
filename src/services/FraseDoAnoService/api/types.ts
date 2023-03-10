export interface ApiFraseDoAnoListProps{
  id: number
  criador: string
  frase: string
  observacao: string
  inativo: boolean
  inclusao: string
  alteracao: string
  idVotacao: number
}

export interface ApiFraseDoAnoCadastroProps{
  frase: string
  observacao: string
}

export interface apiFraseDoAnoCadastrarUsuarioProps{
  nome: string
  login: string
  senha: string
}
export interface apiFraseDoAnoLoginUsuarioProps{
  login: string
  senha: string
}

export interface apiCadastroVotoProps{
  IdFrase: number
}

export interface apiRemoverVotoProps{
  IdVotacao: number
}

export interface ApiFraseDoAnoRankingListProps{
  id: number
  criador: string
  frase: string
  observacao: string
  qtdVotos: number
}
