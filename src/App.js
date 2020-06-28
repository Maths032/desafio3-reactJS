import React, { useEffect, useState } from "react";
import api from './services/api'
import "./styles.css";

 function App() {

  const [ repositories, setRepositories ] = useState([])

  useEffect(() => {//sempre que algo acontece ele roda esse trecho de código
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])


  // async function handleAddRepository() {
  //  api.post('repositories', {
  //     title: `New repository, ${Date.now()}`,
  //     url: `http://github.coom/repository/${Date.now()}`,
  //     techs: [
  //       "NodeJS",
  //       "ReactJS",
  //       "ReactNative"
  //     ]
  //   }).then((response) => {
  //     setRepositories([...repositories, response.data])
  //   } )
    
  // }

  async function handleAddRepository() {
    const response = await api.post('repositories', {
       title: `New repository, ${Date.now()}`,
       url: `http://github.coom/repository/${Date.now()}`,
       techs: [
         "NodeJS",
         "ReactJS",
         "ReactNative"
       ]
     });
      setRepositories([...repositories, response.data])
     
   }

  async function handleRemoveRepository(id) {

   await api.delete(`repositories/${id}`)
   
    setRepositories(repositories.filter(

      repository => repository.id !== id //faz um filtro no array repositories, procura quando o id encontrado for diferente o id que vem na função e insere esses valores no setRepositories
 
      ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => <li key={repository.id}>
          {repository.title}          

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li> )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
