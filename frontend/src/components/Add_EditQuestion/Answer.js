import React from "react";
import { useState } from "react";
const Answer = (props) => {
    const {isChecked, setChecked} = useState(props.correctAnswer == props.id)
    const removeButtonEvent = (e) =>{
        if(props.answerArray.length > 1){
            let a = [...props.answerArray]
            a.splice(props.id, 1)
            props.setFormValues(prevState => ({
                ...prevState,
                answers: a
            }))
        }
    }
    const handleChange = (e) =>{
        const {name, value} =e.target
        let items = [...props.answerArray];
        let item = {...items[props.id]};
        item = value
        items[props.id] = item
        props.setFormValues(prevState => ({
            ...prevState,
            answers: items
        }))
    }
    const radioHandleChange = (e) => {
        const {name, value} =e.target
        // setChecked(true)
        props.setFormValues(prevState => ({
            ...prevState,
            correctAnswer: parseInt(value, 10)
        }))        
    }
    return (
        <div className="answer">
        <input type="text" onChange={handleChange} name="answers" placeholder="A" value ={props.value} id={props.id}/>
        <div>
            <input name="correctAnswer" type="radio" value={props.id} id="answer0" onChange={radioHandleChange} checked = {isChecked} /> <label htmlFor="answer0">correct</label>
        </div>
        <button type="button" className="btn btn-orange" onClick ={removeButtonEvent}><i className="fas fa-times"></i> Remove</button>
    </div>
    )
}
export default Answer;