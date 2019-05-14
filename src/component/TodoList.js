import React from 'react';
import Todo from "./Todo.js";


class TodoList extends React.Component {


    render() {
        const { todoList,toggleStatus,removeTask } = this.props;

        const todos = todoList.map(
            (todo) => (

                <Todo
                    text = {todo.text}
                    id = {todo.id}
                    status={todo.status}
                    onToggle = {toggleStatus}
                    removeTask = {removeTask}
                    key = {todo.id}
                />
            )
        )
        return (
            <div>
                {todos}
            </div>
        );
    }
}

export default TodoList;






































