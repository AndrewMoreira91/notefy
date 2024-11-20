import { useState, type ReactNode } from "react";
import "./style.css"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	width?: string;
	icon?: ReactNode
	background?: string;
}

export default function Input({ width, icon, ...rest }: InputProps) {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div
			className={`input-container ${isFocused && "focus"}`}
			style={{ width: `${width}`, background: rest.background }}
		>
			<input
				{...rest}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			{icon &&
				<div className="icon-input-container">
					{icon}
				</div>
			}
		</div >
	)
}