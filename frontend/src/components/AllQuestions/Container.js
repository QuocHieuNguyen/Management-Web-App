import React from "react";
import QuestionList from "./QuestionList";
import SearchBar from "./SearchBar";

const Container = (props) => {
    return (
        <main>
        <div className="container">
            <h1>All questions</h1>
            <SearchBar setInputText = {props.setInputText} inputText = {props.inputText} 
            question = {props.question} setQuestions = {props.setQuestions}> </SearchBar>
            <QuestionList question = {props.question} setQuestions = {props.setQuestions} inputText = {props.inputText}></QuestionList>
        </div>
        </main>
    )
}
export default Container;