import type GameLevel from "./GameLevel";

export default class GameLevelsDificulty
{
	Levels : Array<GameLevel>
	LevelDificult : string

	constructor(levelDificult : string, levels : Array<GameLevel>)
	{
		this.Levels = levels;
		this.LevelDificult = levelDificult;
	}
}