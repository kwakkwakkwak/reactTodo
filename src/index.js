import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function AddedTask(props) {
        return(
        <div className="AddedTask">
            <label onClick={props.toggleStatus}>
                {props.status}
            </label>
            <label >{props.task}</label>
            <label onClick={props.removeTask}>
                -
            </label>
        </div>
        );
}
class Task extends React.Component {
    constructor(props){
        super(props);
        this.state={
            task : "Write your Task",
            status : "○", // null , added , done
        };


    }
    render() {
        return (
            <div className="task">
                <input placeholder={this.state.task}/>

                <label onClick={this.addTask}>
                    +
                </label>
            </div>
        );
    }

    addTask(){
        alert("add Task!");

    }


}


class Todo extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            task: "aaaaaaaaaaa",
            status: "○",
        };

        // this.toggleStatus = this.toggleStatus.bind(this);



    }


    toggleStatus(){
        this.setState({
            status : this.state.status === "○" ? "●" : "○",
        });
    }

    removeTask(){
        alert("remove Task!");

    }





    render() {
        return(
        <div>

            react-todo Start !!
            <AddedTask
                removeTask={() => this.removeTask()}
                toggleStatus = {() => this.toggleStatus()}
                task = {this.state.task}
                status = {this.state.status}
                />

            <Task></Task>

        </div>
        );
    }
}



ReactDOM.render(
    <Todo />,
    document.getElementById('root')
);
