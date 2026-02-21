import type GameLevelsDificulty from "./GameLevelsDificulty";

export default class GameMode
{
	LevelsDificulty : Array<GameLevelsDificulty>
	GameModeName : string

	constructor(gameModeName : string, levelDificult : Array<GameLevelsDificulty>)
	{
		this.GameModeName = gameModeName;
		this.LevelsDificulty = levelDificult;
	}
}