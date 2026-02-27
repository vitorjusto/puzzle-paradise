import type GameMode from "./GameMode";

export default class Game
{
	GameModes : Array<GameMode>
	Name : string

	constructor(name : string, gameModes : Array<GameMode>)
	{
		this.Name = name;
		this.GameModes = gameModes;
	}
}