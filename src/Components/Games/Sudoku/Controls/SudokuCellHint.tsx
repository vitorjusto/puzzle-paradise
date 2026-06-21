
interface SudokuCellHintProps {
	hintText : string
}

export function SudokuCellHint({hintText}: SudokuCellHintProps)
{
	return(
		<div style={{backgroundColor: 'white', width: 48, height: 48, border: '2px solid black'}}>
			<div style={{width: 48, height: 48}}>{hintText}</div>
		</div>
	)
}