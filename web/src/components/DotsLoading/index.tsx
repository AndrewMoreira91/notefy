import { useEffect, useState, useCallback } from "react"
import "./styles.css"

export default function DotsLoading() {
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
	
	return <>{dots}</>
}