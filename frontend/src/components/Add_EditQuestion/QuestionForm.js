
import React from "react";
import { useState, useEffect } from "react";
import Answer from "./Answer";

const QuestionForm = (props) => {
    
    // const [answerArray, setAnswerArray] =useState(['A'])
    // const initialValues = props.title === "Edit Question" ? 
    //                     {text: props.text, answers : props.answers, correctAnswer: props.correctAnswer} : {text: "", answers : [], correctAnswer: 0}
    
    const initialValues ={text: "", answers : [], correctAnswer: 0}
    const [formValues, setFormValues] = useState(initialValues)
    const [isSubmit, setIsSubmit] = useState(false);
    // const [isEdit, setIsEdit] = useState(props.title === "Edit Question")

    useEffect(()=>{
        console.log("test")
        if (isSubmit) {
            console.log("use eff")
            const  addData = async ()=> fetch('http://localhost:3001/questions', {
                method: 'POST', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
              })
              .then(response => response.json())
              .then(data => {
                console.log('Success:', data);
                alert("Data is added");
                setIsSubmit(false)
              })
              .catch((error) => {
                console.error('Error:', error);
              });
            addData()
            // console.log(formValues);
          }
    }, [isSubmit, formValues])

    console.log(formValues);
    // console.log(id)
    function addQuestionApi(){

    }
    const addButtonEvent = (e) =>{
        if (formValues.answers.length < 4) {
            // setAnswerArray([...answerArray, 'B'])
            setFormValues(prevState => ({
                ...prevState,
                answers: [...prevState.answers.concat('')]
            }))
            // console.log(formValues)
        }
        
    }
    const handleChange =(e) =>{
        const {name, value} =e.target
        console.log(value)
        setFormValues({...formValues, text: value})
        // console.log(formValues)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(prev => true);
        console.log(isSubmit)
      };
    return (
        <main>
        <div className="container">
            <h1>{props.title}</h1>
            <form id="frm-create">
                <div className="form-group">
                    <label htmlFor="text">Text</label>
                    <input 
                    type="text" 
                    name="text" 
                    placeholder="What does HTML stand for?" 
                    value ={formValues.text} 
                    onChange={handleChange}/>
                </div>
                
                <div className="form-group">
                    <label>Answers: </label>
                    {formValues.answers.map((a, i) => 
                        <Answer 
                            id = {i} 
                            value = {a} 
                            key ={i} 
                            // setAnswerArray = {setAnswerArray}
                            answerArray = {formValues.answers}  
                            setFormValues = {setFormValues}
                            formValue = {formValues}
                            // type = {"AddForm"}
                            ></Answer>
                    )}
                    

                    <div className="text-right">
                        <button type="button" className="btn btn-blue" onClick={addButtonEvent}><i className="fas fa-plus"></i> Add</button>
                    </div>
                </div>

                <div className="actions">
                    <button className="btn btn-blue btn-large" onClick ={handleSubmit}><i className="fas fa-save"></i> Save</button>
                </div>
            </form>
        </div>
    </main>
    )
}
export default QuestionForm;