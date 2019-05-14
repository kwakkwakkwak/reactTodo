import React from 'react';
import Form from './component/Form.js'
import TodoTemplate from './component/TodoTemplate.js'
import TodoList from "./component/TodoList";

class App extends React.Component{

    id = 3;


    state = {
        input : '',
        todos: [
            { id: 0, text: ' 000000000', status: false },
            { id: 1, text: ' 111111111', status: true },
            { id: 2, text: ' 222222222', status: false }
        ]

    }


    addTask = ()=> {

        const {input, todos} = this.state;
        console.log();
        if(Object.is({input}.input,"")){
            return ;
        }

        this.setState({

            todos: todos.concat({
                id: this.id++,
                text: input,
                status : false,
            }),
            input : '',
        });

    }


    removeTask = (id) => {
        const { todos } = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id)
        });
    }


    inputChange = (e) => {
        this.setState({
            input: e.target.value
        });
    }


    render() {
        const {todos,input} = this.state;
        const {
            inputChange,
            toggleStatus,
            addTask,
            removeTask,
        } = this;
        return (
            <TodoTemplate
                form = {
                    <Form
                        value = {input}
                        addTask = {addTask}
                        inputChange = {inputChange}
                    />
                }
                todoList = {
                    <TodoList
                        todoList = {todos}
                        toggleStatus = {toggleStatus}
                        removeTask = {removeTask}
                        />
                }
            >

            </TodoTemplate>
        );
    }

    toggleStatus = (id) => {
        const {todos} = this.state;
        const index = todos.findIndex(todo => todo.id === id);

        const selected = todos[index];

        this.setState({
            todos: [
                ...todos.slice(0, index),
                {
                    ...selected,
                    status: !selected.status
                },
                ...todos.slice(index + 1, todos.length)
            ]
        });
    }


}

export default App;