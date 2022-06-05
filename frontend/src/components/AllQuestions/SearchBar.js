import React from "react";

const SearchBar = (props) => {
    const inputTextHandler = (e) =>{
        console.log(e.target.value)
        props.setInputText(e.target.value)
        // let questions = Object.assign(props.question)
        // props.setQuestions(
        //     questions.filter(q => q.text.includes(props.inputText))
        // )
    }
    return (
        <div id="search">
            <input type="text" onChange={inputTextHandler} placeholder="Search..." />
        </div>
    )
}
export default SearchBar;