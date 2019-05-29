import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {



    render() {
        const { text,  id, onToggle, status , parent ,select,removeTask,onToggleSelect } = this.props;

        return (
            <div className= {parent ? select ? "selected child" : "child" : select ? "selected" : ""}  >
                <input type="checkbox" onClick={() => onToggle(id)} checked={status ? "checked" : "" } />
                <label onClick={() => onToggleSelect(id)}  className={status ? "complete" : ""} >
                        {text}
                </label>
                <label  onClick={() => removeTask(id)} className="child" >
                    X
                </label>

            </div>

        );
    }
}

export default Todo;