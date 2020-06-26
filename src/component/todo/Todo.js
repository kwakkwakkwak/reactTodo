import React, { Component } from 'react';
import {Delete, Edit} from '@material-ui/icons/';
import './Todo.css';

let resize = {width: '18px', height: '18px'};

class Todo extends Component {




    render() {
        const { text,  id, onToggle, status , parent ,select,removeTask,onToggleSelect,editTask } = this.props;

        return (
            <div className= {parent ? select ? "selected child" : "child" : select ? "selected" : ""}  >
                <input type="checkbox" onClick={() => onToggle(id)} defaultChecked={status ? "checked" : "" } />
                <label onClick={() => onToggleSelect(id)}  className={status ? "complete" : ""} >
                        {text}
                </label>

                <label  onClick={() => editTask(id)} className="child" >
                    <Edit style={resize}></Edit>
                </label>

                <label  onClick={() => removeTask(id)} className="child" >
                    <Delete style={resize}></Delete>
                </label>

            </div>

        );
    }
}

export default Todo;