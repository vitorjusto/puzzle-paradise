import type { JSX } from "react";
import { EClueContainerOrientation } from "../Enums/EClueContainerOrientation";
import { PicrossCluesContainer } from "./PicrossCluesContainer";
import { calculateClues } from "../Helpers/PicrossHelper";


function generateRowClues(solution: number[][]): JSX.Element[] {
  const result: JSX.Element[] = [];

  solution.forEach((row, rowIndex) => {
    const rowClues = calculateClues(row);

      result.push(<PicrossCluesContainer numbers={rowClues} orientation={EClueContainerOrientation.Row}/> ) 

  });

  return result;
}

interface PicrossRowCluesProps 
{
  solution: number[][]
}

export function RowClues({solution}: PicrossRowCluesProps)
{

	return(
		<div className='RowClues'>
			{generateRowClues(solution)}
		</div>
	)
}

