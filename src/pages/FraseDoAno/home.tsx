import { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { ToastContainer, toast } from 'react-toastify'

import { deleteFraseDoAnoApi, getFraseDoAnoApi, getFraseDoAnoNameApi, postFraseDoAnoApi, putFraseDoAnoApi } from '@/services/FraseDoAnoService/api'
import { FraseDoAnoListProps } from '@/services/FraseDoAnoService/types'
import { DateHelper } from '@/utils/helpers'
import { DateFomartTypes } from '@/utils/helpers/types'

export default function ConsultarFrases () {
  const [frases, setFrases] = useState <FraseDoAnoListProps[]>([])
  const [phrase, setPhrase] = useState('')
  const [observation, setObservation] = useState('')
  const [id, setId] = useState(0)
  const [filtro, setFiltro] = useState('')

  // Filtro por frase
  async function Filtrar () {
    const resp = await getFraseDoAnoNameApi(filtro)
    console.log(filtro)
    if (filtro == null) {
      GetAllFrase()
    } else {
      setFrases(resp.data)
    }
  }
  // Cadastrar frase
  async function CadastrarFrase () {
    try {
      await postFraseDoAnoApi(phrase, observation)

      toast('Frase cadastrada')
      GetAllFrase()
    } catch (error: any) {
      toast.error(error.response.data)
    }
  }
  // Retorna a frase, id e observação para ser alterada
  async function RetornarFrase (id: number, phrase: string, observation: string) {
    setPhrase(phrase)
    setObservation(observation)
    setId(id)
  }
  // Remove a frase pelo id que recebe ao clicar no icon.
  async function RemoverFrase (id: number) {
    confirmAlert({
      title: 'Remover frase',
      message: 'Deseja remover a frase ?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            await deleteFraseDoAnoApi(id)
            if (filtro === '') {
              GetAllFrase()
            } else {
              Filtrar()
            }
            toast('Frase removida')
          }
        },
        {
          label: 'Não'
        }
      ]
    })
  }

  // Altera as informações da frase e observação.
  async function Alterar () {
    try {
      if (!phrase) {
        toast.error('Frase Obrigatória')
      } else {
        await putFraseDoAnoApi(id, phrase, observation)
        toast('Frase Alterada')
      }
      GetAllFrase()
    } catch (error: any) {
      toast.error(error.response.data)
    }
  }
  // Get de todas as frases
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
      <ToastContainer />
      <div className='Faixa-IMG'>
        <div className='Faixa1-Logo' />
      </div>
      <section className='Faixa1'>
        <h1 className='Frase-Do-Ano-text'>Frases do Ano (Projeto Piloto)</h1>
      </section>

      <div className='Card-F1'>
        <input
          type='text' placeholder='Pesquisa por nome'
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? Filtrar() : ''}
        />
        <button
          onClick={Filtrar}
          onKeyPress={e => e.key === 'Enter' ? Filtrar() : ''}
        >Consultar
        </button>
      </div>

      <section className='F1-Card'>
        <h1> Frases Cadastradas</h1>
        {frases.length === 0 && (
          <h1>Não há frases.</h1>
        )}
        {frases.map((item, index) =>
          <div className='Card-F2' key={index}>
            <h4 className='Card-F2-h4'> Frase - {item.phrase.substring(0, 35)} </h4>
            <h4 className='Card-F2-h4'> Observação - {item.observation.substring(0, 35)}</h4>
            <h4 className='H4-Inclusion'> Data de Inclusão: {DateHelper.setDate(item.inclusion).format(DateFomartTypes.DateTimeInput)}</h4>
            <div>
              <img src='/iconedit.svg' onClick={async () => await RetornarFrase(item.id, item.phrase, item.observation)} />
              <img src='/icondelete.svg' alt='Remover ' onClick={async () => await RemoverFrase(item.id)} />
            </div>
          </div>
        )}
      </section>
      <section className='Faixa-2'>
        <div className='Card-2'>
          <div className='Card-2-Faixa-1'> <h1> Cadastrar nova Frase</h1> </div>
          <div className='Card-2-Faixa-2'>
            <input value={phrase} onChange={e => setPhrase(e.target.value)} type='text' maxLength={35} placeholder='Frase' />
            <input value={observation} onChange={e => setObservation(e.target.value)} type='text' maxLength={35} placeholder='Observacao' />
          </div>
          <div className='Card-2-Faixa-3'> <button onClick={CadastrarFrase}> Cadastrar </button>
            <button onClick={Alterar}> Alterar </button>
          </div>
        </div>

      </section>

    </main>
  )
}
