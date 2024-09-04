import React, { useId } from 'react'

function InputBox({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {

    const id = useId();

  return (
    <div className='w-full'>
        { label && <label htmlFor={id}> {label} </label> }
        <input type={type} id={id} className= {`block w-full mt-1 p-2 rounded-lg border border-gray-200 ${className}`} {...props} ref={ref} />
    </div>
  )
}

export default React.forwardRef(InputBox);