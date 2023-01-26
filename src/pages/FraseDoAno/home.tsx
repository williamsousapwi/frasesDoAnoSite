import { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { ToastContainer, toast } from 'react-toastify'

import { deleteFraseDoAnoApi, getFraseDoAnoNameApi, postFraseDoAnoApi, putFraseDoAnoApi } from '@/services/FraseDoAnoService/api'
import { FraseDoAnoListProps } from '@/services/FraseDoAnoService/types'
import { DateHelper } from '@/utils/helpers'
import { DateFomartTypes } from '@/utils/helpers/types'

export default function ConsultarFrases () {
  const [frases, setFrases] = useState<FraseDoAnoListProps[]>([])
  const [phrase, setPhrase] = useState('')
  const [observation, setObservation] = useState('')
  const [id, setId] = useState(0)
  const [filtro, setFiltro] = useState('')
  const [loading, setLoading] = useState(false)

  // Filtro por frase
  async function Filtrar () {
    try {
      setLoading(true)
      const resp = await getFraseDoAnoNameApi(filtro)
      setFrases(resp.data)
    } catch (error) {
      alert('Erro Interno')
    } finally {
      setLoading(false)
    }
  }
  // Cadastrar frase
  async function CadastrarFrase () {
    try {
      await postFraseDoAnoApi(phrase, observation)
      toast('Frase cadastrada')
      Filtrar()
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
              Filtrar()
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
      Filtrar()
    } catch (error: any) {
      toast.error(error.response.data)
    }
  }

  // Carregar apenas uma vez.
  useEffect(() => {
    Filtrar()
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
        <div className='F1-Card-Pesquisa'>
          <img src='/pesquisa.png' />
          <input
            type='text' placeholder='Pesquisa por nome'
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            onKeyPress={e => e.key === 'Enter' ? Filtrar() : ''}
          />
        </div>
        <button
          onClick={Filtrar}
          onKeyPress={e => e.key === 'Enter' ? Filtrar() : ''}
        >Consultar
        </button>

      </div>

      <section className='F1-Card'>
        {frases.length === 0 && !loading && (
          <h1>Nenhuma frase foi encontrada...😞</h1>
        )}
        {frases.length >= 1 && (
          <h1> Frases Cadastradas</h1>
        )}

        {loading && <div className='Load' />}
        {!loading && frases.map((item, index) =>
          <div className='Card-F2' key={index}>
            <h4 className='Card-F2-h4' title={item.phrase}> Frase - {item.phrase.length >= 35 ? item.phrase.substring(0, 35) + '...' : item.phrase}  </h4>
            <h4 className='Card-F2-h4' title={item.observation}> Observação - {item.observation.length >= 35 ? item.observation.substring(0, 30) + '...' : item.observation} </h4>
            <h4 className='H4-Inclusion'> Data de Inclusão: {DateHelper.setDate(item.inclusion).format(DateFomartTypes.DateTimeInput)}</h4>
            <div>
              <img src='/iconedit.svg' onClick={async () => await RetornarFrase(item.id, item.phrase, item.observation)} />
              <img src='/icondelete.svg' alt='Remover ' onClick={async () => await RemoverFrase(item.id)} />
              <img src='/iconamei.svg' /* onClick={async () => await AmeiFunction(item.id)} */ />

              <div className='container'>
                <div className='popup'>
                  <div className='popup-fechar'>r</div>
                  <div className='popup-content'>
                    <h1>Alterar Frase</h1>
                    <div>
                      <input value={phrase} onChange={e => setPhrase(e.target.value)} type='text' maxLength={50} placeholder='Frase' />
                      <input value={observation} onChange={e => setObservation(e.target.value)} type='text' maxLength={250} placeholder='Observacao' />
                    </div>
                    <button onClick={Alterar}> Alterar </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </section>
      <section className='Faixa-2'>
        <div className='Card-2'>
          <div className='Card-2-Faixa-1'> <h1> Cadastrar nova Frase</h1> </div>
          <div className='Card-2-Faixa-2'>
            <input value={phrase} onChange={e => setPhrase(e.target.value)} type='text' maxLength={50} placeholder='Frase' />
            <input value={observation} onChange={e => setObservation(e.target.value)} type='text' maxLength={250} placeholder='Observacao' />
          </div>
          <div className='Card-2-Faixa-3'> <button onClick={CadastrarFrase}> Cadastrar </button>
          </div>
        </div>

      </section>

    </main>
  )
}
