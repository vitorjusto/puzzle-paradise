import {useState, type JSX} from 'react'
import './Picross.css'
var solution = [
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1],
]


function generateRowClues(solution: number[][]): JSX.Element[] {
  const result: JSX.Element[] = [];

  solution.forEach((row, rowIndex) => {
    const rowClues = calculateClues(row);

      result.push(<PicrossRowCluesContainer numbers={rowClues}/> ) 

  });

  return result;
}



function generateColumnClues(solution: number[][]): JSX.Element[] {
  const result: JSX.Element[] = [];

  const columnCount = solution[0]?.length ?? 0;

  for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
    const columnValues = solution.map((row) => row[columnIndex]);
    const columnClues = calculateClues(columnValues);

      result.push(<PicrossCluesColumnContainer numbers={columnClues}/> ) 
  }

  return result;
}

function ColumnClues()
{

	return(
		<div className='ColumnClues' style={{width: solution[0].length * 54}}>
			{generateColumnClues(solution)}
		</div>
	)
}

function RowClues()
{

	return(
		<div className='RowClues' style={{height: solution.length * 54}}>
			{generateRowClues(solution)}
		</div>
	)
}

function calculateClues(solution: number[]): number[] {
  const clues: number[] = [];
  let currentCount = 0;

  for (const cell of solution) {
    if (cell === 1) {
      currentCount += 1;
    } else if (currentCount > 0) {
      clues.push(currentCount);
      currentCount = 0;
    }
  }

  if (currentCount > 0 || clues.length === 0) {
    clues.push(currentCount);
  }

  return clues;
}

export default function Picross()
{

    // const [tabContent, setTabContent] = 
    var game = StartGame()
    
    function StartGame()
    {
        var game = []
        for (let i = 0; i < solution.length; i++) 
        {
            var row = []
            for (let i = 0; i < solution.length; i++) 
            {
                row.push(0)
            }
            game.push(row)
        }

        return game
    }

    function UpdateGame(value: number, row: number, column: number)
    {
        game[row][column] = value
    }

    return(
		<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
			<ColumnClues/>
			<div style={{display: 'flex'}}>
			<RowClues/>
            <div><GameGrid/></div>
			</div>
        </div>
		</div>
    )
}

function GameGrid()
{	
	const [holdingStatus, setholdingStatus] = useState(EHoldingStatus.NOT_HOLDING);
	const [game, setGame] = useState<number[][]>(() => {
  		const matriz: number[][] = [];
  		for (let i = 0; i < solution.length; i++) {
    		matriz.push(new Array(solution[i].length).fill(0));
  		}
  		return matriz;
		});

	function VerifyAnser(value: ECellStatus, ri: number, ci: number): void
	{
		var newValue : number = JSON.parse(JSON.stringify(value))
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
			window.alert("parabens1")
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

function PicrossClues({n}: any)
{	
    return (
            <div className="Clues" style={{width: 50, height: 50}}>{n}</div>
        )
}

interface PicrossCluesContainerProps {
  numbers: number[]// renomeado de "number" para "value"
}

function PicrossRowCluesContainer({numbers} : PicrossCluesContainerProps)
{	
    var a =  numbers.map(
            (n, index) => 
        (
            <PicrossClues key={index} n={n} />
        ))
	
    return(
            <div style={{backgroundColor: 'red', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>{a}</div>
		)
}

function PicrossCluesColumnContainer({numbers} : PicrossCluesContainerProps)
{	
    var a =  numbers.map(
            (n, index) => 
        (
            <PicrossClues key={index} n={n} />
        ))
	
    return(
            <div style={{backgroundColor: 'red', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>{a}</div>
		)
}

function PicrossCell(cell: Cell)
{
    var [hoverColor, sethoverColor] = useState("rgba(0, 0, 0, 0)");
    var [selectedCell, setselectedCell] = useState(ECellStatus.NONE);
    var [cellColor, setcellColor] = useState("white");
    var [cellText, setcellText] = useState("");

	function onHover(hover: boolean)
	{
		if(hover)
		{
			sethoverColor("rgba(0, 0, 255, 0.1)")
			if(cell.HoldingStatus != EHoldingStatus.NOT_HOLDING)
				selectCell(cell.HoldingStatus == EHoldingStatus.HOLDING_SELECTED?ECellStatus.SELECTED: cell.HoldingStatus == EHoldingStatus.HOLDING_MARKED? ECellStatus.MARKED: ECellStatus.NONE)
		}
		else
			sethoverColor("rgba(0, 0, 0, 0)")
	}

	function selectCell(value : ECellStatus)
	{
		setselectedCell(value);

		if(value == ECellStatus.SELECTED)
			setcellColor("black")
		else
			setcellColor("white")

		if(value == ECellStatus.MARKED)
			setcellText("X")
		else
			setcellText("")
		
		cell.VerifyAnswer(value, cell.RowIndex, cell.ColumnIndex)
	}

	function onMouseDown(event : any)
	{
		if(event.button === 0)
		{
			var newValue = selectedCell == ECellStatus.NONE? ECellStatus.SELECTED: ECellStatus.NONE;
			cell.SetHolding(newValue == ECellStatus.NONE?EHoldingStatus.HOLDING_NONE: EHoldingStatus.HOLDING_SELECTED);
			selectCell(newValue)
		}else if (event.button === 2)
		{
			var newValue = selectedCell == ECellStatus.NONE? ECellStatus.MARKED: ECellStatus.NONE;
			cell.SetHolding(newValue == ECellStatus.NONE?EHoldingStatus.HOLDING_NONE: EHoldingStatus.HOLDING_MARKED);
			selectCell(newValue)
		}
	}

	function onMouseUp()
	{
		cell.SetHolding(EHoldingStatus.NOT_HOLDING);
	}

    return(
        <div className='Cell' onDragStart={e => e.preventDefault()} onContextMenu={e => e.preventDefault()} onMouseUp={onMouseUp} onMouseDown={onMouseDown} onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} style={{backgroundColor: cellColor, width: 50, height: 50}}>
			<div style={{backgroundColor: hoverColor, width: 50, height: 50}}>{cellText}</div>
        </div>
    )
}



class Cell
{
    Solution : number
    RowIndex : number
    ColumnIndex : number
	CellStatus: ECellStatus
	VerifyAnswer: (value: ECellStatus, ri: number, ci: number) => void

	//States
	HoldingStatus: EHoldingStatus
	SetHolding: (value: EHoldingStatus) => void

    constructor(solution: number, rowIndex: number, columnIndex: number, holdingStatus: EHoldingStatus, setholdingStatus : (value: EHoldingStatus) => void, verifyAnswer: (value: ECellStatus, ri: number, ci: number) => void)
    {
        this.Solution = solution
        this.RowIndex = rowIndex
        this.ColumnIndex = columnIndex
		this.HoldingStatus = holdingStatus
		this.SetHolding = setholdingStatus

		this.CellStatus = ECellStatus.NONE
		this.VerifyAnswer = verifyAnswer
    }
}

enum ECellStatus {
	NONE,
	SELECTED,
	MARKED,
}

enum EHoldingStatus{
	NOT_HOLDING,

	HOLDING_SELECTED,
	HOLDING_NONE,
	HOLDING_MARKED,
}