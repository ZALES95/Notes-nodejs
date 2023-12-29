import axios from "axios"
import { useState, useEffect } from "react"
import Note from "../interfaces/note"
import { Link, useNavigate } from "react-router-dom"
import CreatePopup from "../components/CreatePopup"

const Home = () => {
	const [allNotes, setAllNotes] = useState<Note[]>([])
	const [createPopup, setCreatePopup] = useState<boolean>(false)
	const [refreshNotes, setRefreshNotes] = useState<boolean>(false)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:5000/notes")
				const data = await response.data
				setAllNotes(data)
				setRefreshNotes(false)
			} catch (err) {
				console.error(err)
			}
		}

		fetchData()
	}, [navigate, refreshNotes === true])

	const handleToggleFavourite = async (e: React.MouseEvent, id: string) => {
		e.preventDefault()
		try {
			const noteToUpdate = allNotes.find(el => el._id === id)
			const response = await axios.put(`http://localhost:5000/notes/${id}`, {
				...noteToUpdate,
				isFavourite: !noteToUpdate?.isFavourite,
			})

			if (response.status === 200) {
				setAllNotes(prev => {
					const notesToReturn = prev.map(el => {
						if (el._id === id) {
							return { ...el, isFavourite: !el.isFavourite }
						} else {
							return el
						}
					})
					return notesToReturn
				})
			}
		} catch (err) {
			console.log(err)
		}
	}

	const notesPreview = allNotes?.map(el => {
		return (
			<Link
				to={`/${el._id}`}
				className={`relative flex flex-col gap-2 p-4 text-white bg-[${el.backgroundColor}] aspect-square text-ellipsis overflow-hidden rounded-md`}
				key={el._id}
				style={{
					backgroundColor: el.backgroundColor ? el.backgroundColor : "#059669",
				}}>
				<i
					className={`absolute right-[16px] top-[16px] fa-${
						el.isFavourite ? "solid" : "regular"
					} fa-star text-xl`}
					onClick={e => handleToggleFavourite(e, el._id)}></i>
				<h2 className='font-bold text-xl'>{el.title}</h2>
				<p>{el.body}</p>
			</Link>
		)
	})

	return (
		<div className='relative flex flex-col items-center gap-8 min-h-screen'>
			<h1 className='text-4xl font-bold mt-8 text-slate-600 tracking-wide'>
				Notatnik
			</h1>
			<div
				className='grid grid-cols-1 sm:grid-cols-2 lg:sm:grid-cols-3 gap-8 px-8 max-w-[1440px] mx-auto w-full'
				onClick={() => setCreatePopup(false)}>
				{notesPreview}
			</div>
			<button
				className='mt-auto py-8 w-full hover:bg-gray-200 transition'
				onClick={() => setCreatePopup(prev => !prev)}>
				<i className='fa-solid fa-plus text-slate-600 text-4xl'></i>
			</button>
			{createPopup && <CreatePopup handlePopupState={setRefreshNotes} />}
		</div>
	)
}

export default Home
