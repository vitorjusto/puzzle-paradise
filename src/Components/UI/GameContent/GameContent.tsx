import '../../../index.css'
import Picross from '../../Games/Picross/Picross'
import Sudoku from '../../Games/Sudoku/Sudoku'
import GameContentFooter from '../GameContentFooter/GameContentFooter'
import GameContentHeader from '../GameContentHeader/GameContentHeader'
import GameLateralContent from '../GameLateralContent/GameLateralContent'
import './GameContent.css'

export default function GameContent()
{
  return (
	<div className="GameContent">
		<div className="GameSubContent">
			<GameLateralContent/>
			<div className="GameMainContent">
				<GameContentHeader/>
				<div className="MainContent">
    				<Picross/>
				</div>
				<GameContentFooter/>
			</div>
		</div>
	</div>
  )
}