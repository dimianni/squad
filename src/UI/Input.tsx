import cls from "classnames"
import { useMemo } from "react"

interface InputProps {
    value: string
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onBlur?: () => void
    error?: boolean
}

export default function Input({value, placeholder, onChange, onKeyPress, onBlur, error} : InputProps){

    const inputClasses = useMemo(() => {
        return {
            "error": error
        }
    }, [error])

    return (
        <input
            type="text"
            className={cls("bg-wite border border-grey p-2 pl-4 rounded-xl text-base", inputClasses)}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyPress={onKeyPress}
            onBlur={onBlur}
        />
    )
}