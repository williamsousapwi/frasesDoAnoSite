
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { useRouter } from 'next/router'

import { cadastrarUsuarioApi } from '@/services/FraseDoAnoService/api'
import * as storage from 'local-storage'

export default function () {
  const router = useRouter()
  if (storage.get('usuario-logado')) {
    router.push('http://localhost:3005/FraseDoAno/home')
  }
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  async function SignInUser () {
    try {
      await cadastrarUsuarioApi(name, login, password)
      toast('Usuário cadastrado.')
      router.push('/LoginPage/login')
    } catch (err: any) {
      toast.error(err.response.data)
    }
  }

  function VoltarButton () {
    window.location.replace('http://localhost:3005/LoginPage/login')
  }

  return (
    <main className='Main-Cadastro'>
      <ToastContainer />
      <div className='Div-Imagem'> <div className='Logo-Imagem' /> </div>

      <section className='Card-Central-Cadastro'>
        <div className='Faixa1-Card'>
          <h1>Cadastrar novo Usuario </h1>
          <div className='Faixa-Imagem'>
            <div className='ImagemCadastro' />
          </div>

          <div className='Faixa-Central-2'>
            <input className='Input-Usuario-Cadastro' placeholder='Nome de Usuario' type='text' value={name} maxLength={50} onChange={e => setName(e.target.value)} />
            <input className='Input-Nome-Cadastro' placeholder='Login' type='text' value={login} maxLength={50} onChange={e => setLogin(e.target.value)} />
            <input className='Input-Senha-Cadastro' placeholder='Senha' type='password' value={password} maxLength={50} onChange={e => setPassword(e.target.value)} />
          </div>
          <section className='Faixa3-Card'>
            <div>
              <button onClick={SignInUser}> Cadastrar</button>
              <button onClick={VoltarButton}> Voltar</button>

            </div>
          </section>

        </div>
      </section>
    </main>
  )
}
