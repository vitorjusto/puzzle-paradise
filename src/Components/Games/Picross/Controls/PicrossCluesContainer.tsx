import { EClueContainerOrientation } from "../Enums/EClueContainerOrientation"
import { PicrossClues } from "./PicrossClues"

interface PicrossCluesContainerProps {
  numbers: number[]
  orientation : EClueContainerOrientation
}

export function PicrossCluesContainer({numbers, orientation} : PicrossCluesContainerProps)
{
    var numberMap =  numbers.map(
            (n, index) => 
        (
            <PicrossClues key={index} n={n} />
        ))
	
    return(
            <div style={{backgroundColor: 'red', display: 'flex', flexDirection: orientation == EClueContainerOrientation.Row?'row': 'column', justifyContent: 'flex-end'}}>{numberMap}</div>
		)
}
