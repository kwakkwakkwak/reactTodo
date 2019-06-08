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
            // { id: 1, text: ' 111111111', status: true , parent: "", select : false},
            // { id: 3, text: ' 3', status: false , parent: "", select : false},
            // { id: 5, text: ' 3', status: false , parent: 2, select : false},
            // { id: 2, text: ' 222222222', status: false , parent: "", select : false},
            // { id: 4, text: ' 1-1', status: false , parent: 1, select : false}
        ]

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
        if(Object.is({input}.input,"")){
            return ;
        }
        let parent = todos.map((todo)=>{
            if(todo.select)
                return todo.id;
            }).sort();
        const todo = JSON.stringify({'text' : input, 'status' : false, 'parent' : parent[0] ? parent[0] : "" , 'select' : "" });
        axios.post('http://localhost:8080/insert',todo,config).then(response =>{
            this.setState({
                todos : response.data
            });
        });
        this.setState({
            input : '',
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
        selected.status = !selected.status;

        axios.post('http://localhost:8080/insert',selected,config).then(response =>{
            this.setState({
                todos : response.data
            });
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