import './Picross.css'
import { ColumnClues } from './Controls/ColumnClues';
import { RowClues } from './Controls/RowClues';
import { GameGrid } from './Controls/GameGrid';

var solution = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
]

export default function Picross()
{
    return(
		<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
			<ColumnClues solution={solution}/>
			<div style={{display: 'flex'}}>
			<RowClues solution={solution}/>
            <div><GameGrid solution={solution}/></div>
			</div>
        </div>
		</div>
    )
}

