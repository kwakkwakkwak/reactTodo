import React from 'react';


const TodoTemplate = ({form , todoList}) => {
    // console.log(todoList)
    return(
        <div>
            <section>
                {form}
            </section>

            <section>
                {todoList}
            </section>



        </div>
    )
}

export default TodoTemplate;