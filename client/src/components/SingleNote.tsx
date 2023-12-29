import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import Note from "../interfaces/note"
import { useNavigate } from "react-router-dom"

const SingleNote = () => {
	const noteId = useParams().id
	const navigation = useNavigate()

	const [note, setNote] = useState<Note>({
		title: "",
		body: "",
		category: "",
		isFavourite: false,
		_id: "",
		backgroundColor: "",
	})

	const [isAutosaving, setIsAutosaving] = useState<boolean>(false)

	useEffect(() => {
		const findNote = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/notes/${noteId}`
				)
				const data = await response.data
				setNote(data)
			} catch (err) {
				console.log(err)
			}
		}
		findNote()
	}, [])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setNote(prev => {
			return {
				...prev,
				[name]: value,
			}
		})
	}

	const saveNote = async (shouldRedirect?: boolean) => {
		try {
			const response = await axios.put(
				`http://localhost:5000/notes/${note._id}`,
				note
			)
			if (response.status === 200 && shouldRedirect) {
				navigation("/")
			}
		} catch (err) {
			console.log(err)
		}
	}

	const deleteNote = async () => {
		try {
			const response = await axios.delete(
				`http://localhost:5000/notes/${note._id}`
			)
			if (response.status === 200) {
				navigation("/")
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		const autosaveTimeout = setTimeout(() => {
			setIsAutosaving(true)
		}, 1500)

		return () => clearTimeout(autosaveTimeout)
	}, [note])

	useEffect(() => {
		if (isAutosaving) {
			saveNote()
			setIsAutosaving(false)
		}
	}, [isAutosaving])

	return (
		<div className='flex flex-col items-flex-start gap-8 min-h-screen px-8 max-w-[1440px] mx-auto w-full text-slate-600 my-8'>
			<div className='flex justify-start text-4xl gap-8'>
				<button onClick={() => saveNote(true)}>
					<i className='fa-solid fa-chevron-left '></i>
				</button>
				<h1 className='font-bold tracking-wide'>
					<input
						className='bg-inherit focus:outline-none'
						type='text'
						value={note?.title}
						name='title'
						onChange={e => handleChange(e)}
					/>
				</h1>
				<button onClick={deleteNote} className='ml-auto'>
					<i className='fa-solid fa-trash'></i>
				</button>
			</div>
			<h2 className='text-xl'>Kategoria: {note?.category}</h2>

			<textarea
				className='bg-inherit min-h-screen focus:outline-none'
				value={note?.body}
				name='body'
				onChange={e => handleChange(e)}></textarea>
		</div>
	)
}

export default SingleNote
