import React from "react"
import {nanoid} from "nanoid"
import Card from "./Card"


export default function Main(props) {
    const [gameData, setgameData] = React.useState([])  
    const [gameEnd, setgameEnd] = React.useState(false)
    const [gameScore, setGameScore] = React.useState(0)
    
    
    
    React.useEffect( () => {
        if (!gameEnd) {
            const {trivia_amount, trivia_category, trivia_difficulty, trivia_type } = props.allGameSettings;
            
            const url = `https://opentdb.com/api.php?amount=${+ trivia_amount
                }${trivia_category ? "&category=" + trivia_category : ""
                }${trivia_difficulty ? "&difficulty=" + trivia_difficulty : ""
                }${trivia_type ? "&type=" + trivia_type : ""}
		        `
                
        async function getData() {
            const res = await fetch(url)
            const data = await res.json()
            const gameDataArray = []
            data.results.forEach(dat => {
                const answers = []
                answers.push({
                answer: dat.correct_answer, 
                correct: true,
                id: nanoid(),
                selected: false
                })
        
            dat.incorrect_answers.forEach(info => {
                answers.push({
                answer: info, 
                correct: false,
                id: nanoid(),
                selected: false
                })
            })
            
            gameDataArray.push({
                question: dat.question,
                answers: shuffledAnswers(answers),
                id: nanoid()            
                })
        })
        setgameData(gameDataArray)
        }
        getData()
    }}, [gameEnd, props.allGameSettings])
        
    function shuffledAnswers(data) {
        return data.sort( () => .5 - Math.random())
    }
    
    const gameDataRender = gameData.map(data => {
        return <Card 
                    question={data.question}
                    answers={data.answers}
                    correct={data.correct} 
                    selected={data.selected}
                    key={data.id}
                    id={data.id} 
                    selectedAnswer={selectedAnswer}
                    gameEnd={gameEnd}
                />
    })
        
        function checkAnswers() {
                let score = 0
                gameData.forEach(data => {
                 data.answers.forEach(dat => {
                     if (dat.correct && dat.selected) {
                         score++
                     }
                })
            setGameScore(score)
            setgameEnd(true)
            
        })
        }
        
        function newGame() {
            setgameEnd(false)
        }

    function selectedAnswer(questionId, answerId) {
            setgameData(prevData => {
            const edited = prevData.map(data => {
                if(data.id === questionId) {
                    data.answers.forEach(answer => {
                        answer.selected = false
                        if(answer.id === answerId) {
                            answer.selected = true
                        }    
                    })      
                }
                return data
            })
            return edited
        })  
        }
        
        const btnHtml = 
            gameEnd ?      
                <div className="btn-container">
                    <p className="score-msg">You scored {gameScore}/{props.allGameSettings.trivia_amount} correct answers</p>
                    <button className="game-btn" onClick={newGame}>Play again</button>
                    <button className="game-btn" onClick={props.handleClick}>Menu</button>
                </div>
                : 
                <div className="btn-container">
                    <button className="game-btn" onClick={checkAnswers}>Check answers</button>
                    <button className="game-btn" onClick={props.handleClick}>Menu</button>
                </div>
            

    return (
        <div className="main-container">
            {gameDataRender}
            {btnHtml}
            <div className="blob-container">
                <img className="blue-blob"src={require("../images/intro-blue-blob.png")} alt="decorative blue blob" /> 
                <img className="yellow-blob"src={require("../images/yellow-blob.png")} alt="decorative yellow blob" />
            </div>
        </div>
        
    )
}