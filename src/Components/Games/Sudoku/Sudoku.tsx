import { useState } from "react";
import verifyVictory from "./Helpers/SudokuVerifyAnswerHelper";
import { SudokuRow } from "./Controls/SudokuRow";

var clues = [
	[1, 2, 3, 4, 5, 6, 7, 8, 9],
	[4, 5, 6, 7, 8, 9, 1, 2, 3],
	[7, 8, 9, 1, 2, 3, 4, 5, 6],
	[2, 3, 4, 5, 6, 7, 8, 9, 1],
	[5, 6, 7, 8, 9, 1, 2, 3, 4],
	[8, 9, 1, 2, 3, 4, 5, 6, 7],
	[3, 4, 5, 6, 7, 8, 9, 1, 2],
	[6, 7, 8, 9, 1, 2, 3, 4, 5],
	[9, 1, 2, 3, 4, 5, 6, 7, 0],
]

export default function Sudoku()
{	
  	const game: number[][] = [];
  		for (let i = 0; i < clues.length; i++) {
    		game.push(new Array(clues[i].length).fill(0));

			for(let j = 0; j < clues[i].length; j++)
			{
				if(clues[i][j] > 0)
					game[i][j] = clues[i][j]
			}
  		}
	
	const [gameFinished, setGameFinished] = useState(false);

	function GameChanged(value: number, ri: number, ci: number)
	{
		if(gameFinished)
			return

		game[ri][ci] = value

		if(verifyVictory(game))
		{
			window.alert("congrast")
			setGameFinished(true)
		}
	}

	return clues.map(
		(r, i) =>
			<div style = {{display: 'flex'}}>
				<SudokuRow row={r} rowIndex={i} onGameChanged={GameChanged}/>
			</div>
	)
}