import React from 'react';
import Form from './component/Form.js'
import TodoTemplate from './component/TodoTemplate.js'
import TodoList from "./component/TodoList";
import axios from 'axios';


let config = {headers: { 'Content-Type': 'application/json',} }

class App extends React.Component{




    state = {
        input : '',
        todos: [
        ],
        placeholder : "write Your Task"

    }

    getList = () =>{

        axios.get('http://localhost:8080/findAll').then(response =>{
            this.setState({
                todos : response.data
            });
        });
    }

    componentDidMount() {
        this.getList();
    }

    addTask = ()=> {
        const {input, todos} = this.state;
        let id = null;
        let parent = null;

        let index = todos.findIndex(todo => todo.edit === true);
        if(index > 0 ) id = todos[index].id;


        if(Object.is({input}.input,"")){
            return ;
        }
        index = todos.findIndex(todo => todo.select === true);

        if(index > 0) parent = todos[index].id ;
        const todo = JSON.stringify({'id': id ,'text' : input, 'status' : false, 'parent' : parent, 'select' : "" });
        axios.post('http://localhost:8080/save',todo,config).then(response =>{
            this.setState({
                todos : response.data
            });
        });
        this.setState({
            input : '',
            placeholder : "Write Your Task"
        });
    }

    editTask = (id) => {
        const {todos} = this.state;
        const index = todos.findIndex(todo => todo.id === id);

        const selected = todos[index];

        console.log(selected);

        this.setState({
            todos: [
                ...todos.slice(0, index).map(
                    (todo)=>{
                        todo.eidt = false;
                        return todo;
                    },
                ),
                {
                    ...selected,
                    edit: !selected.edit,
                },
                ...todos.slice(index + 1, todos.length).map(
                    (todo)=>{
                        todo.edit = false;
                        return todo;
                    },
                )
            ],
            input : '',
            placeholder : "edit Your Task"
        });

    }


    removeTask = (id) => {
        const todo = {"id" : id };
        axios.post('http://localhost:8080/delete',todo,config).then(response =>{
            if(response.data < 0  ){
                return alert("하위 메뉴부터 삭제해주세요 ");

            }
            this.setState({
                todos : response.data
            });
        });
    }


    inputChange = (e) => {
        this.setState({
            input: e.target.value
        });
    }


    render() {

        const {todos,input, placeholder} = this.state;
        const {
            inputChange,
            toggleStatus,
            addTask,
            removeTask,
            onToggleSelect,
            editTask
        } = this;
        return (
            <TodoTemplate
                form = {
                    <Form
                        value = {input}
                        addTask = {addTask}
                        inputChange = {inputChange}
                        placeholder = {placeholder}
                    />
                }
                todoList = {
                    <TodoList
                        todoList = {todos}
                        toggleStatus = {toggleStatus}
                        removeTask = {removeTask}
                        onToggleSelect = {onToggleSelect}
                        editTask ={editTask}
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
        selected.status = !selected.status;

        axios.post('http://localhost:8080/save',selected,config).then(response =>{
            this.setState({
                todos : response.data
            });
        });



    }

    onToggleSelect = (id) => {
        const {todos} = this.state;
        const index = todos.findIndex(todo => todo.id === id);

        const selected = todos[index];

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