import { useState } from "react";
import type { ECellStatus } from "../Enums/ECellStatus";
import { EHoldingStatus } from "../Enums/EHoldingStatus";
import { Cell } from "../Entities/PicrossCell";
import PicrossCell from "./PicrossCell";

interface PicrossRowCluesProps 
{
  solution: number[][]
}

export function GameGrid({solution}: PicrossRowCluesProps)
{	
	const [holdingStatus, setholdingStatus] = useState(EHoldingStatus.NOT_HOLDING);
	const [game, setGame] = useState<number[][]>(() => {
  		const matriz: number[][] = [];
  		for (let i = 0; i < solution.length; i++) {
    		matriz.push(new Array(solution[i].length).fill(0));
  		}
  		return matriz;
		});
	const [gameFinished, setGameFinished] = useState(false);
	
	function VerifyAnser(value: ECellStatus, ri: number, ci: number): void
	{
		if(gameFinished)
			return

		  setGame(prevGame => 
    		prevGame.map((linha, i) => 
      		i === ri 
        		? linha.map((celula, j) => (j === ci ? value : celula))
        		: linha
    		)
  		);

		var gameWon = true

  		solution.forEach((row, rowIndex) => {
			row.forEach((answer, columnIndex) => {
				if(rowIndex == ri && columnIndex == ci)
				{
					
					if(value != answer)
					{
						gameWon = false
						return 
					}
				}else
				{

					var verifingCell = game[rowIndex][columnIndex]
					
					if(verifingCell != answer)
						{
							gameWon = false
							return 
						}
				}
			})

			if(!gameWon)
				return 
  		});

		if(gameWon)
		{
			setGameFinished(true)
			window.alert("parabens1")
		}
	}

	function getCellValue(solution: number, rowIndex: number, columnIndex: number):  Cell {

		var cell = new Cell(solution, rowIndex, columnIndex, holdingStatus, setholdingStatus, VerifyAnser)
		return cell
	}

    return solution.map(
            (row, rowIndex) => 
        (
            <div className='RowGrid'>{row.map((solution, columnIndex) => <PicrossCell {...getCellValue(solution, rowIndex, columnIndex)}/>)}</div>
        )
    )
}