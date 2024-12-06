import { useState } from 'react';
import './Game.css';

const GameOption = {
  NONE: '0',
  ROCK: '1',
  PAPER: '2',
  SCISSORS: '3',
  LIZARD: '4',
  SPOCK: '5',
};

const Game = () => {
  const [player1Choice, setPlayer1Choice] = useState(GameOption.NONE);
  const [player2Choice, setPlayer2Choice] = useState(GameOption.NONE);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [result, setResult] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const getResult = (p1, p2) => {
    if (p1 === GameOption.NONE || p2 === GameOption.NONE) {
      return 'Seleccione una opción válida';
    }
    if (p1 === p2) {
      return 'Ninguno gana, empate';
    }

    const rules = {
      [`${GameOption.ROCK}${GameOption.SCISSORS}`]: 'Piedra 🪨 aplasta Tijera ✂️',
      [`${GameOption.PAPER}${GameOption.ROCK}`]: 'Papel 📄 cubre Piedra 🪨',
      [`${GameOption.PAPER}${GameOption.SPOCK}`]: 'Papel 📄 desautoriza Spock 🖖🏻',
      [`${GameOption.SCISSORS}${GameOption.PAPER}`]: 'Tijera ✂️ corta Papel 📄',
      [`${GameOption.SCISSORS}${GameOption.LIZARD}`]: 'Tijera ✂️ decapita Lagarto 🦎',
      [`${GameOption.LIZARD}${GameOption.SPOCK}`]: 'Lagarto 🦎 envenena Spock 🖖🏻',
      [`${GameOption.LIZARD}${GameOption.PAPER}`]: 'Lagarto 🦎 devora Papel 📄',
      [`${GameOption.SPOCK}${GameOption.ROCK}`]: 'Spock 🖖🏻 vaporiza Piedra 🪨',
      [`${GameOption.ROCK}${GameOption.LIZARD}`]: 'Piedra 🪨 aplasta Lagarto 🦎',
      [`${GameOption.SPOCK}${GameOption.SCISSORS}`]: 'Spock 🖖🏻 rompe Tijera ✂️',
    };

    const key = `${p1}${p2}`;
    const reverseKey = `${p2}${p1}`;
    return rules[key] || rules[reverseKey] || 'Sin resultado';
  };

  const handlePlay = () => {
    if (currentPlayer === 1) {
      setCurrentPlayer(2);
    } else {
      setResult(getResult(player1Choice, player2Choice));
      setCurrentPlayer(1);
    }
  };

  const options = [
    { value: GameOption.NONE, label: 'Seleccionar' },
    { value: GameOption.ROCK, label: 'Piedra ✊🏻' },
    { value: GameOption.PAPER, label: 'Papel ✋🏻' },
    { value: GameOption.SCISSORS, label: 'Tijera ✌🏻' },
    { value: GameOption.LIZARD, label: 'Lagarto 🦎' },
    { value: GameOption.SPOCK, label: 'Spock 🖖🏻' },
  ];

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <div className="toggle-theme">
        <input
          type="checkbox"
          id="checkbox"
          className="checkbox"
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
        />
       
      </div>

      <h1>Piedrapapel..</h1>
      <label htmlFor="checkbox" className="label">
          <i className="bi bi-moon-fill">🌙</i>
          <i className="bi bi-sun-fill">☀️</i>
          <div className="bi bi-circle-fill"></div>
        </label>
      <div className="game-container">
        {currentPlayer === 1 ? (
          <div className="players">
            <h2>Jugador 1: Elige tu opción</h2>
            <select
              value={player1Choice}
              onChange={(e) => setPlayer1Choice(e.target.value)}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="players">
            <h2>Jugador 2: Elige tu opción</h2>
            <select
              value={player2Choice}
              onChange={(e) => setPlayer2Choice(e.target.value)}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <button onClick={handlePlay}>
          {currentPlayer === 1 ? 'Jugador 2, tu turno' : 'Ver resultado'}
        </button>

        {result && <div id="result">{result}</div>}
      </div>
    </div>
  );
};

export default Game;
