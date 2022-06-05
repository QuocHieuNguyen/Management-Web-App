import React, {useState, useEffect} from "react";
import './App.css';
import Container from "./components/AllQuestions/Container";
import QuestionForm from "./components/Add_EditQuestion/QuestionForm";
import SideBar from "./components/SideBar";
import EditForm from "./components/Add_EditQuestion/EditForm"
import {
  BrowserRouter as Router,
  Routes ,
  Route
  // Link,
  // BrowserRouter
} from "react-router-dom";

function App() {
  const [inputText, setInputText] = useState("")
  const [question, setQuestions] = useState([])
  
  useEffect(() => {
    fetch("http://localhost:3001/questions")
    .then(response => response.json())
    .then(question => setQuestions(question))
  },[])
  return (
    <div>
    <SideBar></SideBar>
    <Router>
      <Routes >
        
        <Route exact path="/" element={<Container name ="All Question" setInputText ={setInputText} 
        inputText = {inputText} question = {question} setQuestions = {setQuestions}/> } />
        <Route path="/edit/:id" element={<EditForm title ="Edit Question"/>} />
        <Route exact path="/add" element={<QuestionForm title ="Add Question"/>} />
      </Routes >
    </Router>
    </div>
  );
}

export default App;
