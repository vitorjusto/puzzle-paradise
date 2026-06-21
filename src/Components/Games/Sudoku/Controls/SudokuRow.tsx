import { SudokuCell } from "./SudokuCell";
import { SudokuCellHint } from "./SudokuCellHint";

interface SudokuRowProps 
{
  row: number[];
  rowIndex: number;
  onGameChanged: (value: number, ri: number, ci: number) => void
}

export function SudokuRow({row, rowIndex, onGameChanged} : SudokuRowProps)
{
	return row.map(
		(value, column) =>
			<div>
				{value == 0? <SudokuCell rowIndex={rowIndex} columnIndex={column} onGameChanged={onGameChanged}/>: <SudokuCellHint hintText={value.toString()}/>}
			</div>
		)
}