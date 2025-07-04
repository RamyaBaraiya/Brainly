import type { ReactElement } from "react";

export interface ButtonProps {
    variant?: "primary" | "secondary";
    size?: "small" | "medium" | "large";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}


const variantStyles = {
    primary: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:from-purple-600 hover:to-indigo-600",
    secondary: "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50",
};

const defaultStyles = "flex items-center px-4 py-2 rounded-xl font-semibold justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300";
const sizeStyles = {
    small: "py-1 px-3 text-sm",
    medium: "py-2 px-5 text-base",
    large: "py-4 px-8 text-lg",
};

const Button = (props: ButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            className={`
                ${variantStyles[props.variant]}
                ${defaultStyles}
                ${sizeStyles[props.size || "medium"]}
                ${props.fullWidth ? "w-full" : ""}
                ${props.loading ? "opacity-50" : ""}
            `}
        >
            {props.startIcon && (
                <div className="pr-2 flex items-center">
                    {props.startIcon}
                </div>
            )}

            <div className="flex items-center">
                {props.text}
            </div>

            {props.endIcon && (
                <div className="pl-2 flex items-center">
                    {props.endIcon}
                </div>
            )}
        </button>
    );
};

export default Button;
