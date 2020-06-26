import React from 'react';
import Todo from "./Todo.js";


class TodoList extends React.Component {



    render() {
        const { todoList,toggleStatus,removeTask,onToggleSelect,editTask } = this.props;

        const todos = todoList.map(
            (todo) => (

                <Todo
                    onToggle = {toggleStatus}
                    removeTask = {removeTask}
                    onToggleSelect = {onToggleSelect}
                    editTask={editTask}
                    {...todo}
                    key={todo.id}
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






































