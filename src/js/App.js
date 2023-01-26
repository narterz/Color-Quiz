import { useEffect,  useState } from 'react';
import '../scss/App.scss';

function App() {
  const [color, setColor] = useState('');
  const [answers, setAnswers] = useState(['']);
  const [correct, setCorrect] = useState(false);
  const [rightCounter, setRightCounter] = useState(0);
  const [wrongCounter, setWrongCounter] = useState(0);
  const [gameMode, setGameMode] = useState('hex');

const GenerateHex = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

const GenerateRGB = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return 'rgb(' + r + ',' + g + ',' + b +')';
}

  const generateColor = () => {
    const randomArray = arr => {return arr.sort(() => 0.5 - Math.random())};
    if (gameMode === 'hex') {
      const correctHex = GenerateHex();
      const hexArr = randomArray([correctHex, GenerateHex(), GenerateHex()])
      setColor(correctHex)
      setAnswers(hexArr)
    } else {
      const correctRGB = GenerateRGB();
      const RGBArr = randomArray([correctRGB, GenerateRGB(), GenerateRGB()])
      setColor(correctRGB)
      setAnswers(RGBArr)
    }
  }

  const HandleGameMode = mode => {
    if (mode === 'rgb'){
      const rgbmode = 'rgb'
      setGameMode(rgbmode)
    } else {
      const hexMode = 'hex'
      setGameMode(hexMode)
    }
  }

  const HandleReset = () => { window.location.reload(false) };

  useEffect(() => {
    generateColor()
  }, [gameMode, correct]);

  const isCorrect = ans => {
    if (ans) {
      if (ans === color) {
        setCorrect(true)
        setRightCounter(rightCounter + 1)
      } else {
        setCorrect(false)
        setWrongCounter(wrongCounter + 1)
        generateColor()
      }
    } return
  }

  return (
    <div className="App">
      <div className="title">
        <h1>Color Quiz!</h1>
      </div>
      <div className="gameMode">
        <button className='gameModeBtn' onClick={() => HandleGameMode('hex')}>Hex Color Mode</button>
        <button className='gameModeBtn' onClick={HandleReset}>Reset</button>
        <button className='gameModeBtn' onClick={() => HandleGameMode('rgb')}>RGB Color Mode</button>
      </div>
      <div className="box" style={{ backgroundColor: color }}>
      </div>
      <div className="gamebtn-container">
        {answers.map((answer) => {
          return (
            <button key={answer} id='gamebtn' onClick={() => isCorrect(answer)}>{answer}</button>
          )
        })}
      </div>
      <div className="grade">
        <h3 id='correct'>Correct: {rightCounter}</h3>
        <h3 id='wrong'>Wrong: {wrongCounter}</h3>
      </div>

    </div>
  );
}

export default App;
