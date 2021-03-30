import React from 'react';

// import "./form-input.scss";

const FormInput = ({handleChange, label,type,value, ...otherProps}) => {

    return (
        <div className="form-group">	
            <input type={type} className={'form-input'} value={value} onChange={handleChange} {...otherProps} />
            {label ? <label className={value ? 'control-label focused' : 'control-label'} htmlFor="input">{label}</label> : null }
            <i className="mtrl-select"></i>
        </div>
        // <div className="group">
        //     {<div>
        //         {
        //         label ? (<label className ={`${value ? 'shrink': ''} form-input-label `}>{label}
        //         </label>) : null
        //         }</div>}
            
        // </div>
    )
}

export default FormInput;