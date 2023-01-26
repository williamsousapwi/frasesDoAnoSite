import { useState } from 'react'

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
  // const [carregando, setCarregando] = useState(false)

  async function LoginButton () {
    // setCarregando(true)
    try {
      const r = await LogarUsuarioApi(login, senha)

      Storage('usuario-logado', r)

      setTimeout(() => {
        router.push('/FraseDoAno/home')
      }, 3000)
    } catch (error: any) {
      alert(error.response.data)
    }
  }
  return (
    <main className='Main-Login'>
      <div className='Div-Imagem'> <div className='Logo-Imagem' /> </div>
      <section className='Faixa-2-Login'>
        <div className='Card-Central'>
          <div className='Faixa-Central-1'>
            <h1> Log In</h1>
            <div className='ImagemEntrar' />
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
