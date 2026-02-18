import '../../index.css'
import './GameContent.css'

export default function GameContent()
{
  return (
	<div className="GameContent">
    	<iframe
    	  src="../../Builds/PuzzleGame.html"
    	  width="600"
    	  height="400"
    	  style={{ border: "none" }}
    	  allow="autoplay; fullscreen; cross-origin-isolated"
    	/>
	</div>
  )
}