import React from "react";

function InputField(props)
{
    return (
        <>
            <input id={props.id} className={props.className} type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
        </>
    );
}

export default InputField;