import React, { useId } from 'react';

const Input = React.forwardRef(function Input(
  {
    label,
    type = 'text',
    className = '',
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`
          px-3 py-2 w-full rounded-md border border-gray-300 
          bg-white text-black dark:bg-gray-800 dark:text-white 
          outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          transition duration-200 ease-in-out 
          placeholder-gray-400 dark:placeholder-gray-500
          ${className}
        `}
        {...props}
      />
    </div>
  );
});

export default Input;
