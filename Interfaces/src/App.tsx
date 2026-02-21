import Header from './Components/Headers/Header'
// import GameDificulty from './Components/GameDificulty/GameDificulty'
import Game from './Entites/Game'
import GameMode from './Entites/GameMode'
import GameLevelsDificulty from './Entites/GameLevelsDificulty'
import HomeGameContentsBase from './Components/HomeGameContents/HomeGameContents'
import GameDificulty from './Components/GameDificulty/GameDificulty'
import NotFoundPage from './Components/NotFoundPage/NotFoundPage'
import GameLevel from './Entites/GameLevel'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'
import GameContent from './Components/GameContent/GameContent'

function App() {

 	return <RouterProvider router={router}/>
}

function Layout() {

  return (
    <>
		<Header/>
		<Outlet />
    </>
  )
}


var normalDificulty = [new GameLevelsDificulty("Easy", 
	                    [
							new GameLevel(1),
							new GameLevel(2),
							new GameLevel(3),
							new GameLevel(4),
							new GameLevel(5),
							new GameLevel(6),
							new GameLevel(7),
							new GameLevel(8),
							new GameLevel(9),
							new GameLevel(10),
							new GameLevel(11),
							new GameLevel(12),
							new GameLevel(13),
							new GameLevel(14),
							new GameLevel(15),
							new GameLevel(16),
							new GameLevel(17),
							new GameLevel(18),
							new GameLevel(19),
							new GameLevel(20),
							new GameLevel(21),
							new GameLevel(22),
							new GameLevel(23),
							new GameLevel(24),
							new GameLevel(25),
							new GameLevel(26),
							new GameLevel(27),
							new GameLevel(28),
							new GameLevel(29),
							new GameLevel(30),
						]),
					new GameLevelsDificulty("Normal", 
	                    [
							new GameLevel(1),
							new GameLevel(2),
							new GameLevel(3),
							new GameLevel(4),
							new GameLevel(5),
							new GameLevel(6),
							new GameLevel(7),
							new GameLevel(8),
							new GameLevel(9),
							new GameLevel(10),
							new GameLevel(11),
							new GameLevel(12),
							new GameLevel(13),
							new GameLevel(14),
							new GameLevel(15),
							new GameLevel(16),
							new GameLevel(17),
							new GameLevel(18),
							new GameLevel(19),
							new GameLevel(20),
							new GameLevel(21),
							new GameLevel(22),
							new GameLevel(23),
							new GameLevel(24),
							new GameLevel(25),
							new GameLevel(26),
							new GameLevel(27),
							new GameLevel(28),
							new GameLevel(29),
						]),
					new GameLevelsDificulty("Hard", 
	                    [
							new GameLevel(1),
							new GameLevel(2),
							new GameLevel(3),
							new GameLevel(4),
							new GameLevel(5),
							new GameLevel(6),
							new GameLevel(7),
							new GameLevel(8),
							new GameLevel(9),
							new GameLevel(10),
							new GameLevel(11),
							new GameLevel(12),
							new GameLevel(13),
							new GameLevel(14),
							new GameLevel(15),
							new GameLevel(16),
							new GameLevel(17),
							new GameLevel(18),
							new GameLevel(19),
							new GameLevel(20),
							new GameLevel(21),
							new GameLevel(22),
							new GameLevel(23),
							new GameLevel(24),
							new GameLevel(25),
							new GameLevel(26),
							new GameLevel(27),
						]),
					]

var normalDificulty2 = [new GameLevelsDificulty("Easy", 
	                    [
							new GameLevel(1),
							new GameLevel(2),
							new GameLevel(3),
							new GameLevel(4),
							new GameLevel(5),
							new GameLevel(6),
							new GameLevel(7),
							new GameLevel(8),
							new GameLevel(9),
							new GameLevel(10),
							new GameLevel(11),
							new GameLevel(12),
							new GameLevel(13),
							new GameLevel(14),
							new GameLevel(15),
							new GameLevel(16),
							new GameLevel(17),
							new GameLevel(18),
							new GameLevel(19),
							new GameLevel(20),
						]),
					new GameLevelsDificulty("Normal", 
	                    [
							new GameLevel(1),
							new GameLevel(2),
							new GameLevel(3),
							new GameLevel(4),
							new GameLevel(5),
							new GameLevel(6),
							new GameLevel(7),
							new GameLevel(8),
							new GameLevel(9),
							new GameLevel(10),
							new GameLevel(11),
							new GameLevel(12),
							new GameLevel(13),
							new GameLevel(14),
							new GameLevel(15),
							new GameLevel(16),
							new GameLevel(17),
						])
					]

var gameModes = [new GameMode("Nonogram", normalDificulty), new GameMode("Colored", normalDificulty2)]
var game = new Game("Picross", gameModes)

const router = createBrowserRouter([
	{
		path: "/",//Home path
		element: <Layout />,//Control Layout (to add tag link on header)
		children://All paths
		[
			{path: "", element:<HomeGameContentsBase/>},
			{path: "GameDificulty", element: <GameDificulty {...game}/>},
			{path: "GameContent", element: <GameContent/>},
			{path: "*", element:<NotFoundPage/>}
		]
	}
])

export default App