function RedirecionarParaCadastrar () {
  window.location.replace('http://localhost:3005/CadastroPage/cadastro')
}

export default function () {
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
            <input className='Input-Usuario' placeholder='Usuario' type='text' />
            <input className='Input-Senha' placeholder='Senha' type='text' />
          </div>

          <section className='Faixa-3-Login'>
            <div>
              <button> Entrar</button>
              <button onClick={RedirecionarParaCadastrar}> Cadastrar-se</button>
            </div>
          </section>
        </div>
      </section>

    </main>
  )
}
