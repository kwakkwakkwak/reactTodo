import React from 'react';

const Form = ({value , addTask ,inputChange}) => {
    return(
        <div>
          <input value={value} onChange={inputChange} placeholder="Write Your Task" />
            <label onClick={addTask} > + </label>
        </div>
    )
}

export default Form;