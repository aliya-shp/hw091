import React, {useState} from 'react';

const InputForm = (props) => {
    const [inputType] = useState(props.type);
    const [inputValue, setInputValue] = useState('');

    function inputChangeHandler(event) {
        setInputValue(event.target.value);

        if (props.onChange) {
            return props.onChange(inputValue);
        }
    }

    return (
        <>
            <input 
                type={inputType} 
                value={inputValue} 
                name="input-form" 
                onChange={inputChangeHandler} 
                className="input-class"
            />
        </>
    );
};

export default InputForm;