import type { ButtonHTMLAttributes } from 'react';
import './style.css';

type CategoryItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	category: string;
	isSelected?: boolean;
}

export default function CategoryItem({ category, isSelected = false, ...rest }: CategoryItemProps) {
	return (
		<button type="button" className={`category-item ${isSelected ? "selected" : ""}`} {...rest}>
			<span>{category}</span>
		</button>
	);
}