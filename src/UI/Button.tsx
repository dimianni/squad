import cls from "classnames"
import { useMemo } from "react"

interface ButtonProps {
    color: string
    onClick: () => void
    disabled: boolean 
    children: React.ReactNode
}

export default function Button({ color, onClick, disabled, children }: ButtonProps) {

    const buttonClasses = useMemo(() => {
        return {
            "text-white bg-blue-500 hover:bg-blue-900": color === "blue" && !disabled,
            "border border-grey text-blue-500 bg-white hover:drop-shadow": color === "white" && !disabled,
            "border border-grey text-blue-500 bg-white cursor-not-allowed": disabled,
        }
    }, [color, disabled])

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={cls("text-base font-medium mx-2 px-4 py-2 rounded-xl transition-colors", buttonClasses)}
        >
            {children}
        </button>
    )
}