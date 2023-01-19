import { useState } from 'react'

import { postFraseDoAnoApi } from '@/services/FraseDoAnoService/api'

export default function index () {
  const [phrase, setPhrase] = useState('')
  const [observation, seObservation] = useState('')

  async function CadastrarFrase () {
    const teste = await postFraseDoAnoApi(phrase, observation)
    if (!teste) {
      alert('erro')
    }
    alert('Frase cadastrada')
  }
  return (
    <main>
      <div>
        <input value={phrase} onChange={e => setPhrase(e.target.value)} type='text' placeholder='Frase' />
        <input value={observation} onChange={e => seObservation(e.target.value)} type='text' placeholder='Observacao' />
      </div>
      <div> <button onClick={CadastrarFrase}> Cadastrar </button> </div>
    </main>
  )
}
