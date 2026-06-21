import '../../../index.css'
import Picross from '../../Games/Picross/Picross'
import Sudoku from '../../Games/Sudoku/Sudoku'
import GameContentFooter from '../GameContentFooter/GameContentFooter'
import './GameContent.css'

export default function GameContent()
{
  return (
	<div className="GameContent">
    	<Sudoku/>
		<GameContentFooter/>
	</div>
  )
}