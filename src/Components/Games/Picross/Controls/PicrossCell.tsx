import { useState } from "react";
import { ECellStatus } from "../Enums/ECellStatus";
import { EHoldingStatus } from "../Enums/EHoldingStatus";
import type { Cell } from "../Entities/PicrossCell";

export default function PicrossCell(cell: Cell)
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