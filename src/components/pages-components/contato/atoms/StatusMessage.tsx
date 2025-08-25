interface StatusMessageProps {
    type: 'error' | 'success'
    message: string
}

export default function StatusMessage({ type, message }: StatusMessageProps) {
    const isError = type === 'error'

    return (
        <div
            role={isError ? 'alert' : 'status'}
            className={`
        text-sm mt-1 md:col-span-2
        ${isError ? 'text-red-500' : 'text-green-600'}
      `}
            aria-live="polite"
        >
            {message}
        </div>
    )
}
