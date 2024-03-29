import React from 'react';

const Input = ({ name, type, label, id, value, onChange, checked }) => {
    return (
        <div className="flex items-center p-2 gap-2">
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                checked={checked}
                // defaultValue={}
            />
            <label htmlFor={id}>
                {label}
            </label>
        </div>
    );
};

export default Input;