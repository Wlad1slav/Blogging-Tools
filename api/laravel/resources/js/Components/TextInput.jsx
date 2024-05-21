import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                {...props}
                type={type}
                className={
                    'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-pink-500 dark:focus:border-pink-600 focus:ring-pink-500 dark:focus:ring-indigo-600 shadow-sm ' +
                    className
                }
                ref={input}
            />
        </div>
    );
});
