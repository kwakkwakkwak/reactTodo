import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {

    render() {
        const { text,  id, onToggle, status ,removeTask } = this.props;

        return (
            <div>
                <label onClick={() => onToggle(id)} className={status ? "complete" : ""}>
                        {text}
                </label>
                <label onClick={() => removeTask(id)} >
                    X
                </label>

            </div>

        );
    }
}

export default Todo;