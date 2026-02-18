import type Game from '../../Entites/Game'
import GameLevel from '../../Entites/GameLevel'
import GameLevelsDificulty from '../../Entites/GameLevelsDificulty'
import '../../index.css'
import './GameDificulty.css'
import './GameDificulty.css'
import {useState} from 'react'

function GameDificulty(game : Game) {

	var gameModeMap = game.GameModes.map(
    	(t) => (
    	  <GameDificultyTab onClick={() => onChangeDificulty(t.LevelsDificulty)} key={t.GameModeName} name={t.GameModeName}/>
    	))

  const [tabContent, setTabContent] = useState(Click(game.GameModes[0].LevelsDificulty[0].Levels));
  const [dificultyMap, setdificultyMap] = useState(getGameModeMap(game.GameModes[0].LevelsDificulty));

  function Click(gameContent: Array<GameLevel>) : any
  {
	return gameContent.map(
    	(t) => (
      		<GameLevelContainer key={t.Level} name={t.Level}/>
    	)
  	)
  }

  function onChangeDificulty(game : Array<GameLevelsDificulty>)
  {
	setTabContent(Click(game[0].Levels))
	setdificultyMap(getGameModeMap(game))
  }

  function getGameModeMap(game : Array<GameLevelsDificulty>) : any
  {
	return game.map(
    (t) => (
      <GameDificultyTab onClick={() => setTabContent(Click(t.Levels))} key={t.LevelDificult} name={t.LevelDificult}/>
    ))

  }

  return (
	<>
		<div style={{display: game.GameModes.length > 1? "flex": "none"}} className="GameDificultyTabContainer">
			{gameModeMap}
		</div>
		<div >
			<div className="GameDificultyTabContainer">
				{dificultyMap}
			</div>
			<div className="GameLevelContainer">
				{tabContent}
			</div>
		</div>
	</>
  )
}

function GameDificultyTab(props: any) {

  return (
		<button onClick={props.onClick} className="GameDificultyTab">
			{props.name}
		</button>
  )
}

function GameLevelContainer(props: any) {

  return (
	<>
		<div className="GameLevel">
			{props.name}
		</div>
	</>
  )
}

export default GameDificulty