export interface FraseDoAnoListProps{
  id: number
  creator: string
  phrase: string
  observation: string
  inactive: boolean
  inclusion: string
  alterationDate: string
  idVotation: number
}
export interface FraseDoAnoListCadastro {
  name: string
  login: string
  password: string
}

export interface CadastrarVotoProps{
  idPhrase: number
}

export interface RemoverVotoProps{
  idVotation: number
}

export interface FraseDoAnoRankingListProps{
  id: number
  creator: string
  phrase: string
  observation: string
  qtdVotes: number
}
