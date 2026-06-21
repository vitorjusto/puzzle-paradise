import { useState } from "react";

interface SudokuCellProps 
{
  rowIndex: number;
  columnIndex: number;
  onGameChanged: (value: number, ri: number, ci: number) => void
}

export function SudokuCell({rowIndex, columnIndex, onGameChanged}: SudokuCellProps)
{
  	const [valor, setValor] = useState('');
	function handleChange(e : any)
	{
    	const newValue = e.target.value.replace(/\D/g, '').replace('0', '');

    	if (newValue.length <= 1) {
      		setValor(newValue);
			onGameChanged(newValue == ''? 0: Number(newValue), rowIndex, columnIndex)
    	}else if(e.target.value == '')
		{
      		setValor('');
			onGameChanged(0, rowIndex, columnIndex)
		}
	}
	return(
		<div style={{backgroundColor: 'white', width: 48, height: 48, border: '2px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
			<input 
			type="text" 
			maxLength={1} 
      		inputMode="numeric"
      		pattern="[0-9]"
      		onChange={handleChange}
      		value={valor}
			style={{backgroundColor: 'white', width: 44, height: 44, border: '0px solid black'}}></input>
		</div>
	)
}