import './GameLateralContent.css'
import {useState} from 'React'

export default function GameLateralContent()
{
	var [width, setWidth] = useState(0)

	function onClick()
	{
		if(width == 0)
			setWidth(300)
		else
			setWidth(0)
	}
  return (
	<div className="LateralContent">
		<div className="TutorialText" style={{width: width}}>
		</div>
		<div className="ToggleButton" onClick={onClick}></div>
	</div>
  )
}