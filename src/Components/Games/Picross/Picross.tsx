import {useState} from 'react'
import './Picross.css'
var solution = [
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 0, 1, 1],
]


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
        <div>
            <GameGrid/>
        </div>
    )
}

function GameGrid()
{	
	const [holdingStatus, setholdingStatus] = useState(EHoldingStatus.NOT_HOLDING);
	
    return solution.map(
            (row, rowIndex) => 
        (
            <div className='RowGrid'>{row.map((solution, columnIndex) => <PicrossCell {...new Cell(solution, rowIndex, columnIndex, holdingStatus, setholdingStatus)}/>)}</div>
        )
    )
}

function PicrossCell(cell: Cell)
{
    var [hoverColor, sethoverColor] = useState("rgba(0, 0, 0, 0)");
    var [selectedCell, setselectedCell] = useState(false);
    var [cellColor, setcellColor] = useState("white");

	function onHover(hover: boolean)
	{
		if(hover)
		{
			sethoverColor("rgba(0, 0, 255, 0.1)")
			if(cell.HoldingStatus != EHoldingStatus.NOT_HOLDING)
				selectCell(cell.HoldingStatus == EHoldingStatus.HOLDING_SELECTED)
		}
		else
			sethoverColor("rgba(0, 0, 0, 0)")
	}

	function selectCell(value : boolean)
	{
		setselectedCell(value);

		if(value)
			setcellColor("black")
		else
			setcellColor("white")

	}

	function onMouseDown()
	{
		cell.SetHolding(selectedCell?EHoldingStatus.HOLDING_UNSELECTED: EHoldingStatus.HOLDING_SELECTED);
		selectCell(!selectedCell)
	}

	function onMouseUp()
	{
		cell.SetHolding(EHoldingStatus.NOT_HOLDING);
	}

    return(
        <div className='Cell' onMouseUp={onMouseUp} onMouseDown={onMouseDown} onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} style={{backgroundColor: cellColor, width: 50, height: 50}}>
			<div style={{backgroundColor: hoverColor, width: 50, height: 50}}></div>
        </div>
    )
}

class Cell
{
    Solution : number
    RowIndex : number
    ColumnIndex : number
	CellStatus: ECellStatus

	//States
	HoldingStatus: EHoldingStatus
	SetHolding: (value: EHoldingStatus) => void

    constructor(solution: number, rowIndex: number, columnIndex: number, holdingStatus: EHoldingStatus, setholdingStatus : (value: EHoldingStatus) => void)
    {
        this.Solution = solution
        this.RowIndex = rowIndex
        this.ColumnIndex = columnIndex
		this.HoldingStatus = holdingStatus
		this.SetHolding = setholdingStatus

		this.CellStatus = ECellStatus.NONE
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
	HOLDING_UNSELECTED,

	HOLDING_MARKED,
	HOLDING_UNMARKED,
}