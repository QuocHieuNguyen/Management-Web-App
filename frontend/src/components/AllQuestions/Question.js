import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Question = (props) => {
    const deleteButtonHandler = () =>{
        let text = "Press a button!\nOk to delete it";
        if (window.confirm(text) == true) {
            let url = 'http://localhost:3001/questions/' + props.id
            fetch(
                url, {
                method: 'DELETE', // or 'PUT'
                headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Header': '*'
                }
            }).then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
                props.setQuestions(props.question.filter((q) => q._id !== props.id))
            });
        } else {
          text = "You canceled!";
        }

    }
    return (
        <tr>
            {/* {console.log(props)} */}
            <td>{props.index}</td>
            <td>{props.questionName}</td>
            <td>{props.questionAnswer}</td>
            <td>
                <Link to={`/edit/${props.id}`} className="btn btn-blue"><i className="far fa-edit"></i>Edit</Link>
                {/* <a href={`/edit/${props.id}`}  className="btn btn-blue"><i className="far fa-edit"></i> Edit</a> */}
                <a className="btn btn-orange" onClick={deleteButtonHandler}><i className="far fa-trash-alt"></i> Delete</a>
            </td>
        </tr>
    )
}
export default Question;