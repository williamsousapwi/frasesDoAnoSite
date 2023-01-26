export interface ApiFraseDoAnoListProps{
  id: number
  frase: string
  observacao: string
  inativo: boolean
  inclusao: string
  alteracao: string
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
