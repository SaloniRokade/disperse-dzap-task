import React, { useState } from "react"
import "./App.css"
import { FaInfoCircle } from "react-icons/fa"

function App() {
	// const order: any
	const [inputValue, setInputValue] = useState<string>("")
	const [validationResults, setValidationResults] = useState<string[]>([])
	const [order, setOrder] = useState<any>([1])

	const handleKeyUp = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(event.target.value)
		const numberOfLines = event.target.value.split("\n").length
		setOrder(Array.from({ length: numberOfLines }, (x, i) => i))
	}
	const submit = () => {const lines = inputValue.split("\n")
		const results: string[] = []
		const seenLines = new Map<string, number[]>()
		// Check each line
		lines.forEach((line, index) => {
			const items = line.split(/[=, ]/)

			// Condition 1: Check if each line starts with '0x' and the address length = 42
			if (!line.startsWith("0x") && items.length > 0 && items[0].length !== 42) {
				results.push(`Line ${index + 1} invalid Ethereum address and wrong amount`)
			} else if (!line.startsWith("0x")) {
				results.push(`Line ${index + 1} invalid Ethereum address`)
			} else if (items.length > 0 && items[0].length !== 42) {
				results.push(`Line ${index + 1}  wrong amount`)
			}

			// Condition 2: Check if the input string has special characters '=', ' ', or ','
			if (!/[=, ]/.test(line)) {
				results.push(`Line ${index + 1} invalid address`)
			}

			// Condition 3: Check for duplicate lines and keep the first occurrence
			if (seenLines.has(line)) {
				const previousIndexes = seenLines.get(line)!
				previousIndexes.push(index + 1)
				results.push(`${line} duplicate in line ${previousIndexes.join(",")}`)
			} else {
				seenLines.set(line, [index + 1])
			}
		})

		setValidationResults(results)
	}
	return (
		<div className="App">
			<div className="p-20 bg-[#1d1d1d] text-white">
				<div className="pb-4 flex justify-between">
					<span>Adresses with Amounts</span>
					<span>Upload File</span>
				</div>
				<div className="flex justify-center mb-10">
					<div className="w-full flex border-none py-4 px-8 bg-black rounded shadow">
						<div className="py-4 px-1 text-gray-400">
							{order.map((or: any, index: any) => {
								return <div>{index + 1}</div>
							})}
						</div>
						<textarea
							onChange={handleKeyUp}
							value={inputValue}
							className="py-4 px-1 w-full h-60 bg-black border-s-2 outline-none font-bold"
						></textarea>
					</div>
				</div>
				<div className="pb-4 flex justify-between">
					<span>Seperated by ',' or '' or '='</span>
					<span>Show Example</span>
				</div>
				{/* Error Box */}
				{validationResults.length > 0 && (
					<div className="w-full p-2 text-left text-red-800 border border-solid border-red-800 rounded flex items-baseline  gap-2">
						<FaInfoCircle />
						<div>
							{validationResults.map((result, index) => (
								<p>{result}</p>
							))}
						</div>
					</div>
				)}
				{/* Error Box end */}
				{/* Submit button */}
				<button
					onClick={submit}
					disabled={!inputValue || inputValue === ""}
					className="p-4 my-5 w-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-full disabled:bg-black"
				>
					Next
				</button>
			</div>
		</div>
	)
}

export default App
