import React from 'react';
import Form from './component/Form.js'
import TodoTemplate from './component/TodoTemplate.js'
import TodoList from "./component/TodoList";

class App extends React.Component{

    id = 6;


    state = {
        input : '',
        todos: [
            { id: 1, text: ' 111111111', status: true , parent: "", select : false},

            { id: 3, text: ' 3', status: false , parent: "", select : false},
            { id: 5, text: ' 3', status: false , parent: 2, select : false},

            { id: 2, text: ' 222222222', status: false , parent: "", select : false},
            { id: 4, text: ' 1-1', status: false , parent: 1, select : false},
        ]

    }


    addTask = ()=> {

        const {input, todos} = this.state;
        if(Object.is({input}.input,"")){
            return ;
        }
        let parent = todos.map((todo)=>{
            if(todo.select)
                return todo.id;
            }).sort();

        this.setState({

            todos: todos.concat({
                id: this.id++,
                text: input,
                status : false,
                parent : parent[0] ? parent[0] : "" ,
                select : false,
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
            onToggleSelect,
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
                        onToggleSelect = {onToggleSelect}
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

    onToggleSelect = (id) => {
        const {todos} = this.state;
        const index = todos.findIndex(todo => todo.id === id);

        const selected = todos[index];

        console.log(selected.parent)
        if (selected.parent) {
            return;
        }


        this.setState({
            todos: [
                ...todos.slice(0, index).map(
                    (todo)=>{
                        todo.select = false;
                        return todo;
                    },
                ),
                {
                    ...selected,
                    select: !selected.select,
                },
                ...todos.slice(index + 1, todos.length).map(
                    (todo)=>{
                        todo.select = false;
                        return todo;
                    },
                )
            ]
        });
    }


}

export default App;