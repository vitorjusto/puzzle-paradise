import type { JSX } from "react";
import { EClueContainerOrientation } from "../Enums/EClueContainerOrientation";
import { PicrossCluesContainer } from "./PicrossCluesContainer";
import { calculateClues } from "../Helpers/PicrossHelper";

interface PicrossColumnCluesProps 
{
  solution: number[][]
}

function generateColumnClues(solution: number[][]): JSX.Element[] {
  const result: JSX.Element[] = [];

  const columnCount = solution[0]?.length ?? 0;

  for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
    const columnValues = solution.map((row) => row[columnIndex]);
    const columnClues = calculateClues(columnValues);

      result.push(<PicrossCluesContainer numbers={columnClues} orientation={EClueContainerOrientation.Column}/> ) 
  }

  return result;
}

export function ColumnClues({solution} : PicrossColumnCluesProps)
{

	return(
		<div className='ColumnClues'>
			{generateColumnClues(solution)}
			<p></p>
		</div>
	)
}
