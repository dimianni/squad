import cls from "classnames"
import { useMemo } from "react"

export default function Input({value, placeholder, onChange, onKeyPress, onBlur, error}){

    const inputClasses = useMemo(() => {
        return {
            "error": error
        }
    })

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