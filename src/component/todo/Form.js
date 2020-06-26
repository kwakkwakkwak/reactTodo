import React from 'react';

const Form = ({value, placeholder, addTask ,inputChange}) => {
    return(
        <div>
          <input value={value} onChange={inputChange} placeholder={placeholder} />
            <label onClick={addTask} > + </label>
        </div>
    )

}
export default Form;