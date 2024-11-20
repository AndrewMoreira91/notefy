import type { ButtonHTMLAttributes } from "react";
import "./style.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export default function Button({children, ...rest}: ButtonProps) {
	return (
		<button className="btn-container" {...rest}>
			{children}
		</button>
	)
}