import React from "react";
import Question from "./Question";

const QuestionList = (props) => {
    return (
        
        <table>
            {console.log(props)}
        <tbody>
        <tr>
            <th>#</th>
            <th>Question</th>
            <th>Answer</th>
            <th width="210">Actions</th>
        </tr>
        {
                       
            props.question.filter((val)=>{
                if(props.inputText === ""){
                    return val
                }else if(val.text.toLowerCase().includes(props.inputText.toLowerCase())) {
                    return val
                }return ""
            }).map((q, i) =>
                <Question questionName = {q.text} 
                            key = {props.question[i]._id} 
                            id = {props.question[i]._id} 
                            index = {i+1}
                            question =  {props.question}
                            setQuestions = {props.setQuestions}
                            questionAnswer = {q.answers[q.correctAnswer]}/>
            )
        }
        </tbody>
    </table>
    )
}
export default QuestionList;
