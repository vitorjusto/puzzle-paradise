import { ECellStatus } from "../Enums/ECellStatus"
import type { EHoldingStatus } from "../Enums/EHoldingStatus"

export class Cell
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