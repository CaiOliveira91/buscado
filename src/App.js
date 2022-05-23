import {useState} from 'react';
import './index.css';
import './style.css';
import api from './service/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function Search(){
    //https://viacep.com.br/ws/26011003/json/

    if(input === ''){
      alert("Preencha com cep válido! ")
      return ;
    }

    try{ 
      const resposta = await api.get(`${input}/json`);
      setCep(resposta.data)
      setInput("");

    }catch{
      alert("Preencha com cep válido! ");
      setInput("")
    }
  }

  return (
    <div className="Container">
      <h1 className='text'>Busca Cep</h1>

      <div className='cepInput' >
        <input type="text" placeholder='Digite o Cep...'
        value={input}
        onChange={(event) => setInput(event.target.value) }
        />

        <button className='procurar' onClick={Search}>
        <ion-icon name="search-outline"></ion-icon>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2 className='procura'> CEP: {cep.cep}</h2>

          <span className='rua'>{cep.logradouro}</span>
          <span className='bairro'>{cep.bairro}</span>
          <span className='cidade'>{cep.localidade} - {cep.uf}</span>
        </main>

      )}
      <footer>
        <p><a href='https://github.com/CaiOliveira91' >@2022 CaiOliveira91</a></p>
      </footer>
      
    </div>
  );
}

export default App;
