import { useEffect, useState } from 'react'

import { getFraseDoAnoApi, postFraseDoAnoApi } from '@/services/FraseDoAnoService/api'
import { FraseDoAnoListProps } from '@/services/FraseDoAnoService/types'

export default function ConsultarFrases () {
  const [frases, setFrases] = useState <FraseDoAnoListProps[]>([])
  const [phrase, setPhrase] = useState('')
  const [observation, seObservation] = useState('')

  async function CadastrarFrase () {
    const teste = await postFraseDoAnoApi(phrase, observation)
    if (!teste) {
      alert('erro')
    }
    alert('Frase cadastrada')
  }
  async function GetAllFrase () {
    const resp = await getFraseDoAnoApi()
    setFrases(resp.data)
  }

  // Carregar apenas uma vez.
  useEffect(() => {
    GetAllFrase()
  }, [])
  return (
    <main className='container-principal'>
      <h1>Projeto Frases Do Ano (Projeto Piloto)</h1>
      <div className='box-frases'>
        <div className=''>
          <input type='text' placeholder='Pesquisa por nome' />
          <button>Buscar</button>
          <table className='table-exibir'>
            <thead>
              <tr className='table-titulo'>
                <th>Frase</th>
                <th>Observação</th>
              </tr>
            </thead>
            <tbody className='tabela-frases'>
              {frases.map(item =>
                <tr key={item.id}>
                  <th>{item.phrase}</th>
                  <th>{item.observation}</th>
                  <img src='/iconedit.svg' />
                  <img src='/icondelete.svg' />
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
      <div>
        <input value={phrase} onChange={e => setPhrase(e.target.value)} type='text' placeholder='Frase' />
        <input value={observation} onChange={e => seObservation(e.target.value)} type='text' placeholder='Observacao' />
      </div>
      <div> <button onClick={CadastrarFrase}> Cadastrar </button> </div>
    </main>
  )
}
