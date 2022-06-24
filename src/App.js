import React from "react"
import Main from "./components/Main"

export default function App() {
    const [gameStart, setgameStart] = React.useState(false)
    const [gameSettings, setGameSettings] = React.useState(
        {
            trivia_amount: 5, 
            trivia_category: "", 
            trivia_difficulty: "", 
            trivia_type: ""
        }
    )
    
    function handleSubmit(event) {
    event.preventDefault()
    setgameStart(currentState => !currentState)
    }

    function handleChange(event) {
        const {name, value} = event.target
        setGameSettings(prevData => {
            return {
                ...prevData,
                [name]: value === "any" ? "" : value
            }
        })
    }
    const formHtml = 

        <form onSubmit={handleSubmit}>
            <label htmlFor="trivia_amount">Number of Questions (1-50):</label>
            <input onChange={handleChange} type="number" name="trivia_amount" className="form-control" min="1" max="50" defaultValue={gameSettings.trivia_amount === 5 ? 5 : gameSettings.trivia_amount} />

            <br/>

            <label htmlFor="trivia_category">Select Category: </label>
            <select onChange={handleChange} defaultValue={gameSettings.trivia_category} name="trivia_category" className="form-control">
                <option value="any">Any Category</option>
                <option value="9">General Knowledge</option><option value="10">Entertainment: Books</option><option value="11">Entertainment: Film</option><option value="12">Entertainment: Music</option><option value="13">Entertainment: Musicals &amp; Theatres</option><option value="14">Entertainment: Television</option><option value="15">Entertainment: Video Games</option><option value="16">Entertainment: Board Games</option><option value="17">Science &amp; Nature</option><option value="18">Science: Computers</option><option value="19">Science: Mathematics</option><option value="20">Mythology</option><option value="21">Sports</option><option value="22">Geography</option><option value="23">History</option><option value="24">Politics</option><option value="25">Art</option><option value="26">Celebrities</option><option value="27">Animals</option><option value="28">Vehicles</option><option value="29">Entertainment: Comics</option><option value="30">Science: Gadgets</option><option value="31">Entertainment: Japanese Anime &amp; Manga</option><option value="32">Entertainment: Cartoon &amp; Animations</option>		</select>

            <br/>

            <label htmlFor="trivia_difficulty">Select Difficulty: </label>
            <select onChange={handleChange} defaultValue={gameSettings.trivia_difficulty}name="trivia_difficulty" className="form-control">
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <br/>

            <label htmlFor="trivia_type">Select Type: </label>
            <select onChange={handleChange} defaultValue={gameSettings.trivia_type}name="trivia_type" className="form-control">&gt;
                <option value="any">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
            </select>
            
            <div className="btn-container">
                <button className="intro-btn">Start Quiz</button>
            </div>
        </form>
    
    
    return (
        <div>
            {gameStart ? <Main allGameSettings={gameSettings} handleClick={handleSubmit} />  : 
            <div className="intro-container">
                <h1 className="intro-title">Quizzical</h1>               
                {formHtml}
                <div className="blob-container">
                    <img className="blue-blob"src={require("./images/intro-blue-blob.png")} alt="decorative blue blob" /> 
                    <img className="yellow-blob"src={require("./images/yellow-blob.png")} alt="decorative yellow blob" />
                </div>
            </div>
            }

        </div>
    )
}

// 