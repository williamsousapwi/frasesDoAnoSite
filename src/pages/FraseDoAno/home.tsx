import { useEffect, useState } from 'react'

import { getFraseDoAnoApi, postFraseDoAnoApi } from '@/services/FraseDoAnoService/api'
import { FraseDoAnoListProps } from '@/services/FraseDoAnoService/types'
import { DateHelper } from '@/utils/helpers'
import { DateFomartTypes } from '@/utils/helpers/types'

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
    <main className='Main'>
      <div className='Faixa-IMG'>
        <div className='Faixa1-Logo' />
      </div>
      <section className='Faixa1'>
        <h1 className='Frase-Do-Ano-text'>Frases do Ano (Projeto Piloto)</h1>
      </section>

      <div className='Card-F1'>
        <input type='text' placeholder='Consulta por frase' />
        <button>Consultar</button>
      </div>

      <section className='F1-Card'>
        <h1> Frases Cadastradas</h1>
        {frases.map((item, index) =>
          <div className='Card-F2' key={index}>
            <h4 className='Card-F2-h4'> Frase - {item.phrase} </h4>
            <h4 className='Card-F2-h4'> Observação - {item.observation}</h4>
            <h4 className='H4-Inclusion'> Data de Inclusão: {DateHelper.setDate(item.inclusion).format(DateFomartTypes.DateTimeInput)}</h4>
            <div>
              <img src='/iconedit.svg' />
              <img src='/icondelete.svg' />
            </div>
          </div>
        )}
      </section>
      <section className='Faixa-2'>
        <div className='Card-2'>
          <div className='Card-2-Faixa-1'> <h1> Cadastrar nova Frase</h1> </div>
          <div className='Card-2-Faixa-2'>
            <input value={phrase} onChange={e => setPhrase(e.target.value)} type='text' placeholder='Frase' />
            <input value={observation} onChange={e => seObservation(e.target.value)} type='text' placeholder='Observacao' />
          </div>
          <div className='Card-2-Faixa-3'> <button onClick={CadastrarFrase}> Cadastrar </button>
            <button> Alterar </button>
          </div>
        </div>

      </section>

    </main>
  )
}
