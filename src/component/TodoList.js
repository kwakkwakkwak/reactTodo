import React from 'react';
import Todo from "./Todo.js";


class TodoList extends React.Component {



    render() {
        const { todoList,toggleStatus,removeTask,onToggleSelect } = this.props;

        todoList.sort((a,b)=>{
            let aa, bb;

            a.parent ? aa = a.parent * 10 + a.parent : aa = a.id * 10;
            b.parent ? bb = b.parent * 10 + b.parent : bb = b.id * 10;

            return aa - bb;
        });
        console.log(todoList);

        const todos = todoList.map(
            (todo) => (

                <Todo
                    onToggle = {toggleStatus}
                    removeTask = {removeTask}
                    onToggleSelect = {onToggleSelect}
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






































