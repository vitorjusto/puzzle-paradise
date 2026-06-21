import { useState } from "react";

var solution = [
	[1, 2, 3, 4, 5, 6, 7, 8, 9],
	[4, 5, 6, 7, 8, 9, 1, 2, 3],
	[7, 8, 9, 1, 2, 3, 4, 5, 6],
	[2, 3, 4, 5, 6, 7, 8, 9, 1],
	[5, 6, 7, 8, 9, 1, 2, 3, 4],
	[8, 9, 1, 2, 3, 4, 5, 6, 7],
	[3, 4, 5, 6, 7, 8, 9, 1, 2],
	[6, 7, 8, 9, 1, 2, 3, 4, 5],
	[9, 1, 2, 3, 4, 5, 6, 7, 8],
]

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

function verifyVisctory(grid: number[][]): boolean {
  // 1. Verifica se ainda há células vazias (0)
  for (let linha = 0; linha < 9; linha++) {
    for (let coluna = 0; coluna < 9; coluna++) {
      if (grid[linha][coluna] === 0) {
        return false; // ainda tem espaço vazio, não terminou
      }
    }
  }

  // 2. Verifica todas as linhas
  for (let linha = 0; linha < 9; linha++) {
    if (!isGrupoValido(grid[linha])) {
      return false;
    }
  }

  // 3. Verifica todas as colunas
  for (let coluna = 0; coluna < 9; coluna++) {
    const colunaValores: number[] = [];
    for (let linha = 0; linha < 9; linha++) {
      colunaValores.push(grid[linha][coluna]);
    }
    if (!isGrupoValido(colunaValores)) {
      return false;
    }
  }

  // 4. Verifica todos os blocos 3x3
  for (let blocoLinha = 0; blocoLinha < 3; blocoLinha++) {
    for (let blocoColuna = 0; blocoColuna < 3; blocoColuna++) {
      const blocoValores: number[] = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const linha = blocoLinha * 3 + i;
          const coluna = blocoColuna * 3 + j;
          blocoValores.push(grid[linha][coluna]);
        }
      }
      if (!isGrupoValido(blocoValores)) {
        return false;
      }
    }
  }

  // Se passou por todas as verificações, o jogo foi vencido
  return true;
}

// Função auxiliar: verifica se um grupo de 9 números contém 1-9 sem repetição
function isGrupoValido(valores: number[]): boolean {
  const set = new Set(valores);
  
  // Deve ter exatamente 9 valores únicos
  if (set.size !== 9) {
    return false;
  }

  // Todos os valores devem estar entre 1 e 9
  for (const valor of valores) {
    if (valor < 1 || valor > 9) {
      return false;
    }
  }

  return true;
}

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

		console.log(game)

		if(verifyVisctory(game))
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
				{value == 0? <SudokuCell rowIndex={rowIndex} columnIndex={column} onGameChanged={onGameChanged}/>: <SudokuCellHint hintText={solution[rowIndex][column].toString()}/>}
			</div>
		)
}

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