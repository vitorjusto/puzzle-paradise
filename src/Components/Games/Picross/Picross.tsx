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
    // const [tabContent, setTabContent] = useState(Click(game.GameModes[0].LevelsDificulty[0].Levels));
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
        <>
            <GameGrid/>
        </>
    )
}

function GameGrid()
{
    return solution.map(
            (row, rowIndex) => 
        (
            <div className='RowGrid'>{row.map((solution, columnIndex) => <PicrossCell {...new Cell(solution, rowIndex, columnIndex)}/>)}</div>
        )
    )
}

function PicrossCell(cell: Cell)
{
    var [color, setColor] = 
    return(
        <div className='Cell' onClick style={{backgroundColor: "white", width: 50, height: 50}}>
        </div>
    )
}

class Cell
{
    Solution : number
    RowIndex : number
    ColumnIndex : number

    constructor(solution: number, rowIndex: number, columnIndex: number)
    {
        this.Solution = solution
        this.RowIndex = rowIndex
        this.ColumnIndex = columnIndex
    }
}