import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { useRouter } from 'next/router'

import { LogarUsuarioApi } from '@/services/FraseDoAnoService/api'
import Storage from 'local-storage'

function RedirecionarParaCadastrar () {
  window.location.replace('http://localhost:3005/CadastroPage/cadastro')
}

export default function () {
  const router = useRouter()
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  // const [carregando, setCarregando] = useState(false)

  async function LoginButton () {
    // setCarregando(true)
    try {
      setLoading(true)
      const r = await LogarUsuarioApi(login, senha)

      Storage('usuario-logado', r.data)

      setTimeout(() => {
        router.push('/FraseDoAno/home')
      }, 3000)
    } catch (error: any) {
      toast(error.response.data)
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className='Main-Login'>
      <ToastContainer />
      <div className='Div-Imagem'> <div className='Logo-Imagem' /> </div>
      <section className='Faixa-2-Login'>
        <div className='Card-Central'>
          <h1> Log In</h1>
          <div className='Faixa-Central-1'>
            {loading && <div className='Load' />}
            {!loading && <div className='ImagemEntrar' />}
          </div>

          <div className='Faixa-Central-2'>
            <input className='Input-Usuario' placeholder='Usuario' type='text' value={login} onChange={e => setLogin(e.target.value)} />
            <input className='Input-Senha' placeholder='Senha' type='password' value={senha} onChange={e => setSenha(e.target.value)} />
          </div>

          <section className='Faixa-3-Login'>
            <div>
              <button onClick={LoginButton}> Entrar</button>
              <button onClick={RedirecionarParaCadastrar}> Cadastrar-se</button>
            </div>
          </section>

        </div>

      </section>

    </main>
  )
}
