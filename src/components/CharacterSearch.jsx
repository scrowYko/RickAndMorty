import { useState } from "react";
import "./CharacterSearch.css";

export default function CharacterSearch() {
  const [charName, setCharName] = useState(""); //iniciando nome como string vazia, esta variavel sera usada como parametro no fetchdata e no input
  const [character, setCharacter] = useState(null); //iniciando dado personagem com valor nulo
  const [characterName, setCharacterName] = useState("");
  const [characterImage, setCharacterImage] = useState("");

  const handleInputChar = (event) => {
    setCharName(event.target.value);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${charName}`
      );
      const data = await res.json();
      if (data.results.length > 0) {
        setCharacterName(data.results[0].name); // Atualiza o nome do personagem
      } else {
        setCharacterName("Personagem não encontrado"); // Caso não encontre o personagem
      }
      if (data.results.length > 0) {
        setCharacterImage(data.results[0].image); // Atualiza o nome do personagem
      } else {
        setCharacterImage("Personagem não encontrado"); // Caso não encontre o personagem
      }
      setCharacter(data);
      console.log(data.results[0].name);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    }
  };

  return (
    <>
      <div className="center">
        <h1 id="title">Pesquisador de personagem do Rick and Morty</h1>
        <div className="input-boxes">
          <input
            type="text"
            value={charName}
            id="pesquisa"
            onChange={handleInputChar}
            placeholder="Pesquise um personagem"
          />
          <button onClick={fetchData}>Buscar</button>
        </div>
        {character && (
          <div className="info">
            <p id="name">{characterName}</p>
            <img src={characterImage} />
          </div>
        )}
      </div>
    </>
  );
}
