interface InputProps {
    
    placeholder: string; 
    reference?:any
}

export function Input({  placeholder,reference }: InputProps) {
    return (
        <input
            type="text"
            className="w-full px-4 py-2 border rounded mb-2"
            ref={reference}
            placeholder={placeholder}
        />
    );
}