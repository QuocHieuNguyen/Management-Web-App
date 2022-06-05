import { useParams } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import Answer from "./Answer";

const EditForm = (props) => {

  useEffect(()=>{
    if(isEditable){
      console.log("edit")
      console.log(formValues)
      fetchDetail()
    }
    if(isSubmit){
      console.log(formValues)
      updateDetail()
    }

        // initialValues = {text: data.text, answers : data.answers, correctAnswer: data.correctAnswer}            
  })
const {id} = useParams()
const [formValues, setFormValues] = useState({text: "", answers: [''], correctAnswer: 0})
const [isSubmit, setIsSubmit] = useState(false)
const [isEditable, setIsEditable] = useState(true)
const updateDetail = async () => {
  console.log(id)
  const itemsDetail = await fetch(`http://localhost:3001/questions/${id}`, {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues)
    })
  const detail = await itemsDetail.json()
  alert("Data is edited");
  console.log(detail)
  // setFormValues(prevState => ({text: detail.text, answers: detail.answers, correctAnswer: detail.correctAnswer}))
  setIsSubmit(false) 
}
const fetchDetail =  async () =>{
  console.log(id)
  const itemsDetail = await fetch(`http://localhost:3001/questions/${id}`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
    })
  const detail = await itemsDetail.json()
  console.log(detail)
  setFormValues(prevState => ({text: detail.text, answers: detail.answers, correctAnswer: detail.correctAnswer}))
  setIsEditable(false)
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
  setIsSubmit(true);
};
  return formValues &&(
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
                
                {
                
                formValues.answers.map((a, i) => 
                    <Answer 
                        id = {i} 
                        value = {a} 
                        key ={i} 
                        correctAnswer = {formValues.correctAnswer}
                        // setAnswerArray = {setAnswerArray}
                        answerArray = {formValues.answers}  
                        setFormValues = {setFormValues}
                        formValue = {formValues}
                        type = {"EditForm"}
                        ></Answer>
                )
                }
                

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
export default EditForm;