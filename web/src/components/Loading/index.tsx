import { useEffect, useState, useCallback } from "react"
import "./styles.css"
import { DotLoader } from "react-spinners"

export default function Loading() {
	const [dots, setDots] = useState("")

	const addDot = useCallback(() => {
		setDots((prev) => {
			if (prev.length >= 3) return ""
			return `${prev}.`
		})
	}, [])

	useEffect(() => {
		const interval = setInterval(addDot, 500)
		return () => clearInterval(interval)
	}, [addDot])
	
	return (
		<div className="loading-page">
			<DotLoader size={100} className="icon-loading" color="#3471FF" />
			<h3>Carregando{dots}</h3>
		</div>
	)
}