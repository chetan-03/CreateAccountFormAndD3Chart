import React from "react";

const FormInput = ({ onChange, credentials, errors, name, type }) => {
    return (
        <div className='main__form_container'>
            <input
                id={ name }
                name={ name }
                value={ credentials }
                onChange={ onChange }
                type={ type }
                className={ `main__form_input ${ errors ? `error` : credentials && `success`
                    }` }
            // className={ `main__form_input errors` }
            />
            <span className='main__form_input_status'>
                { errors ? (
                    <>
                        <span style={ { color: "red" } }>x</span>
                        <span className='main__form_input_status_error-text'>
                            { errors }
                        </span>
                    </>
                ) : (
                    <span style={ { color: "green" } }>&#10003;</span>
                ) }
            </span>
        </div>
    )
};

export default FormInput;
