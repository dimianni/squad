export default function Button({ btnType, btnText, onClick, disabled }) {
    return (
        <button type={btnType} disabled={disabled} onClick={onClick} className="p-2 rounded-lg text-white bg-blue-500 sm:hover:bg-blue-900 transition-colors">
            {btnText}
        </button>
    )
}