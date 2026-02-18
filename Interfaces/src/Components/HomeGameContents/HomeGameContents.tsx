import '../../index.css'
import './HomeGameContents.css'
import viteLogo from '../../assets/react.svg'

export default function HomeGameContentsBase() 
{
	
  const teste = [
					new GameContent("Picross", "Stats"),
					new GameContent("Connect Lines", "Stats"),
					new GameContent("Kakuro", "Stats"),
					new GameContent("Minesweeper", "Stats"),
					new GameContent("Queens", "Stats"),
					new GameContent("Sudoku", "Stats"),
				]

  const listaTeste = teste.map(
    (t) => (
      <HomeGameContents {...t}/>
    )
  )
  return (
	<div className='ContentsBase'>
		{listaTeste}
	</div>
  )
}

function HomeGameContents(props: GameContent) {

  return (
	<div className='HomeGameContent'>
        <img src={viteLogo} width={50} height={50}/>
		<h1 className='GameTitle'>{props.GameName}</h1>
		<p className='GameStats'>{props.GameStats}</p>
	</div>

  )
}

class GameContent
{
	GameName: string
	GameStats: string

	constructor(gameName: string, gameStats: string) 
	{
		this.GameName = gameName;
		this.GameStats = gameStats;
	}
}