import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import SingleNote from "./components/SingleNote"
import ErrorPage from "./components/404"

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/:id' element={<SingleNote />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</>
	)
}

export default App
