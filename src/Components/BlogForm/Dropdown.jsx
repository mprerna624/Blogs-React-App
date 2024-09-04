import React, { useId } from 'react'

function Dropdown({
    label,
    options,
    className = "",
    ...props
}, ref) {

    const id = useId();

  return (
    <div>
        {
            label && (
                <label htmlFor={id}>{label}</label>
            )
        }

        <select id={id} ref={ref} className={`w-full p-2 rounded-lg outline-0 ${className}`} {...props}>
            {
                options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ) )
            }
        </select>
    </div>
  )
}

export default React.forwardRef(Dropdown);