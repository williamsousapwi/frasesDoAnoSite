
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { useRouter } from 'next/router'

import { cadastrarUsuarioApi } from '@/services/FraseDoAnoService/api'

export default function () {
  const router = useRouter()
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
            <input className='Input-Usuario-Cadastro' placeholder='Nome de Usuario' type='text' value={name} onChange={e => setName(e.target.value)} />
            <input className='Input-Nome-Cadastro' placeholder='Login' type='text' value={login} onChange={e => setLogin(e.target.value)} />
            <input className='Input-Senha-Cadastro' placeholder='Senha' type='text' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <section className='Faixa3-Card'>
            <div>
              <button onClick={SignInUser}> Cadastrar</button>
            </div>
          </section>

        </div>
      </section>
    </main>
  )
}
