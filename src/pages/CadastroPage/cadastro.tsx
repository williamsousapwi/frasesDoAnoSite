export default function () {
  return (

    <main className='Main-Cadastro'>
      <section className='Card-Central-Cadastro'>
        <div className='Faixa1-Card'>
          <h1>Frases do Ano Cadastrar </h1>
          <div className='Faixa-Imagem'>
            <div className='ImagemCadastro' />
          </div>

          <div className='Faixa-Central-2'>
            <input className='Input-Usuario-Cadastro' placeholder='Nome de Usuario' type='text' />
            <input className='Input-Nome-Cadastro' placeholder='Primeiro Nome' type='text' />
            <input className='Input-Senha-Cadastro' placeholder='Senha' type='text' />
          </div>
          <section className='Faixa3-Card'>
            <div>
              <button> Cadastrar</button>
            </div>
          </section>

        </div>
      </section>
    </main>
  )
}
