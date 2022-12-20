import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'
import randomColor from './randomColor'

const randomColors = randomColor(4)
console.log(randomColors)

let initalLength = 4

function App() {
  const [count, setCount] = useState(['', '', '', ''])

  const [id, setId] = useState([1, 2, 3, 4])

  const [clicked, setClicked] = useState([])

  const [score, setScore] = useState(clicked.length)

  const [mounted, setMount] = useState(false)
  const generateRandomIndex = (n) => {
    return Math.floor(Math.random() * n)
  }

  useEffect(() => {
    setId(id.map((id, i) => {
      return {
        index: id,
        color: [randomColors[i][0], randomColors[i][1], randomColors[i][2]]
      }
    }))
    setMount(true)
  }, [])


  const setNewGame = () => {
    const newRandomColors = randomColor(initalLength + 5)
    console.log(newRandomColors)
    const newIds = []
    for (let i = initalLength + 1; i < initalLength + 5; i++) {
      newIds.push(
        {
          index: i,
          color: [newRandomColors[i][0], newRandomColors[i][1], newRandomColors[i][2]]
        }
      )
    }
    setId((id, i) => [...id, ...newIds])
    console.log(newIds)
    initalLength += 4
    setClicked([])
  }
  useEffect(() => {
    console.log(id)
  }, [id])
  const randomizeOrder = () => {
    const idList = id
    let index = Math.floor(Math.random() * idList.length)
    const alreadyGeneratedIndexs = []
    while (alreadyGeneratedIndexs.length < idList.length) {
      if (alreadyGeneratedIndexs.includes(index)) {

        index = generateRandomIndex(idList.length)
      }
      else {
        alreadyGeneratedIndexs.push(index)
      }
      index = generateRandomIndex(idList.length)
    }
    setId(id.map((i, index) => id[alreadyGeneratedIndexs.pop()]))
  }

  useEffect(() => {
    console.log(id)
  }, [id])

  const logClicked = (value) => {
    if (clicked.includes(value)) {
      console.log('lost ')
      setScore(0)
      setClicked([])
    } else {
      setClicked([...clicked, value])
      randomizeOrder();
      setScore(score + 1)
    }
    if (clicked.length === initalLength - 1) {
      setNewGame()
    }
  }

  return (
    <div className="App">
      <div className="main-container">
        <h1>Color Memory Game</h1>
        <div className="box-container">
          {mounted && id.map((b, i) => <div key={b.index}
            id={b.index}
            onClick={(e) => logClicked(e.target.id)}
            /*  className={`box-div${b[i]}`} */
            style={{ backgroundColor: `rgba(${b.color[0]}, ${b.color[1]}, ${b.color[2]})` }}
          >
          </div>
          )
          }
        </div>
        <h2>{score}</h2>
      </div>
    </div>
  )
}

export default App
