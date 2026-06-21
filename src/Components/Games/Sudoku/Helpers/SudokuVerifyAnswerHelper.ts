export default function verifyVictory(grid: number[][]): boolean 
{
	if(!VerifyEmptyCells(grid))
		return false;

	if(!VerifyRows(grid))
		return false;

	if(!VerifyColumns(grid))
		return false;

	if(!VerifyGroups(grid))
		return false;

  	return true;
}


function isGrupValid(values: number[]): boolean 
{
	const set = new Set(values);
  
  	if (set.size !== 9) 
		return false;
  
  	for (const value of values) 
	{
		if (value < 1 || value > 9)
	  		return false;
	}

  	return true;
}

function VerifyEmptyCells(grid: number[][]): boolean
{
  	for (let row = 0; row < grid.length; row++) 
	{
		for (let column = 0; column < grid[row].length; column++) 
		{
	  		if (grid[row][column] === 0)
				return false;
  		}
	}

	return true;
}

function VerifyRows(grid: number[][]) : boolean
{
  	for (let row = 0; row < grid.length; row++) 
	{
		if (!isGrupValid(grid[row])) 
	  		return false;
  	}
	return true;
}

function VerifyColumns(grid: number[][]) : boolean
{
	
  	for (let row = 0; row < grid.length; row++) 
	{
		const columnValues: number[] = [];

		for (let column = 0; column < grid[row].length; column++) 
	  		columnValues.push(grid[row][column]);

		if (!isGrupValid(columnValues))
	  		return false;
  	}
	
	return true;
}

function VerifyGroups(grid: number[][]) : boolean
{
  	for (let rowBlock = 0; rowBlock < 3; rowBlock++)
	{
		for (let columnBlock = 0; columnBlock < 3; columnBlock++)
		{
	  		const blockValues: number[] = [];
	  		for (let i = 0; i < 3; i++) 
			{
				for (let j = 0; j < 3; j++) 
				{
		  			const row = rowBlock * 3 + i;
		  			const column = columnBlock * 3 + j;
		  			blockValues.push(grid[row][column]);
				}
			}

	  		if (!isGrupValid(blockValues)) 
				return false;
		}
  	}

	return true;
}