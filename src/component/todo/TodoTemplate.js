import React from 'react';


const TodoTemplate = ({form , todoList}) => {
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