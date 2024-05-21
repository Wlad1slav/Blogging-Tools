export default function Alert({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm text-green-600 dark:text-red-400 ' + className}>
            {message}
        </p>
    ) : null;
}
