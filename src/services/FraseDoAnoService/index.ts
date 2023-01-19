import { postFraseDoAnoApi } from './api'

export const createFrasesdoAnoService = (phrase: string, observation: string) => {
  try {
    if (!phrase) throw new Error('Frase nao Informada para a Inclusao.')

    postFraseDoAnoApi(phrase, observation)

    alert('Frase Incluida com Sucesso.')
  } catch (error: any) {
    alert(error.message)
  }
}
