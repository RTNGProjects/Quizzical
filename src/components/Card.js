import React from "react"
import parse from "html-react-parser"

export default function Card(props) {
    const answerHtml = props.answers.map(data => {
        let classes = data.selected ? "selected" : "answer"
        if(props.gameEnd) {
            // incorrect answers / not selected
            if(!data.selected && !data.correct) classes += " opaque" 
            // incorrect answers / selected      
            if(data.selected && !data.correct) classes += " incorrect"
            // correct answers
            if(data.correct) classes += " correct"
    } 
        
        return <p 
                id={data.id} 
                key={data.id} 
                className={classes}
                onClick={() => props.selectedAnswer(props.id, data.id)}> 
                {parse(data.answer)} 
                </p>
    })
    
    return (
        <div className="card-container">
            <p className="question">{parse(props.question)}</p>
            <div className="answer-container">
                {answerHtml}
            </div>
        </div>
    )
}