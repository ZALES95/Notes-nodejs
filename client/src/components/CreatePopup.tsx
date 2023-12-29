import axios from "axios"
import { useState, useEffect } from "react"

const CreatePopup: React.FC<{ handlePopupState: any }> = ({
	handlePopupState,
}) => {
	const newNoteBody = {
		title: "",
		body: "",
		category: "",
		isFavourite: false,
		backgroundColor: "",
	}
	const [newNote, setNewNote] = useState<{
		title: string
		body: string
		category: string
		isFavourite: boolean
		backgroundColor: string
	}>(newNoteBody)
	const [categories, setCategories] = useState<
		{ title: string; backgroundColor: string; _id: string }[]
	>([])
	const [errorMsg, setErrorMsg] = useState<string>("")

	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await axios.get("http://localhost:5000/categories")
				const data = await response.data
				setCategories(data)
			} catch (err) {
				console.error(err)
			}
		}
		getCategories()
	}, [])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let selectedCategory:
			| { title: string; backgroundColor: string; _id: string }
			| undefined
		if (name === "category") {
			selectedCategory = categories?.find(el => el.title === value)
		}

		setNewNote(prev => {
			return {
				...prev,
				[name]: value,
				backgroundColor:
					name === "category" && selectedCategory
						? selectedCategory?.backgroundColor
						: prev.backgroundColor,
			}
		})
	}

	const addNote = async () => {
		try {
			const response = await axios.post("http://localhost:5000/notes", newNote)
			if (response.status === 200) {
				setNewNote(newNoteBody)
				setErrorMsg("")
				handlePopupState(true)
			}
		} catch (err: any) {
			setErrorMsg(err.response.data)
		}
	}

	return (
		<div className='fixed left-0 right-0 top-0 flex flex-col sm:flex-row gap-4 justify-center items-center bg-[#f1f1f1] shadow-lg py-8 text-white font-bold'>
			<input
				className='bg-emerald-600 focus:outline-none shadow-lg text-2xl p-4 placeholder:text-gray-200 rounded-md font-normal'
				type='text'
				value={newNote?.title}
				name='title'
				onChange={e => handleChange(e)}
				placeholder='tytuł'
			/>
			<select
				onChange={handleChange}
				name='category'
				className='bg-emerald-600 focus:outline-none shadow-lg text-2xl p-4 text-gray-200 rounded-md font-normal'
				value={newNote.category}>
				<option value='' disabled>
					kategoria
				</option>
				{categories?.map(el => (
					<option value={el.title} key={el._id}>
						{el.title}
					</option>
				))}
			</select>
			<button
				onClick={addNote}
				className='text-2xl uppercase text-emerald-600 p-4'>
				dodaj
			</button>
			{errorMsg && (
				<p className='text-lg text-emerald-600 font-normal'>{errorMsg}</p>
			)}
		</div>
	)
}

export default CreatePopup
