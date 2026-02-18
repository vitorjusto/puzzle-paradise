extends Node2D
class_name PicrossGrid

var picrossCell = preload("res://Scenes/Picross/PicrossCell.tscn")
var picrossClue = preload("res://Scenes/Picross/PicrossClue.tscn")
var selectionMode:= PicrossEnums.ECellStatus.NONE

func GenerateGrid(solution: Array, cellUpdate: Callable):

	for row in solution.size():
		generate_row_clues(solution[row], row)
		
		for column in solution[0].size():
			generate_column_clues(solution, column)
			var instance: PicrossCell = picrossCell.instantiate()
			instance.picrossGrid = self
			instance.position = Vector2(column * 40, row * 40)
			instance.picrossIndex = Vector2(row, column)
			instance.onCellUpdate = cellUpdate
			add_child(instance)

func _process(delta: float) -> void:
	if(Input.is_action_just_released('LeftMouseClick') || Input.is_action_just_released('RightMouseClick')):
		selectionMode= PicrossEnums.ECellStatus.NONE
		
func generate_row_clues(solution: Array, rowIndex: int):
	var rowClues = calculate_clues(solution)
	var i = rowClues.size()
	
	for clue in rowClues:
		var instance: PicrossClue = picrossClue.instantiate()
		add_child(instance)
		instance.position = Vector2(i * -40, rowIndex * 40)
		instance.change_text(clue)
		i -= 1

func generate_column_clues(solution: Array, columnIndex: int):
	var columnSolutions = solution.map(func(x): return x[columnIndex])
	
	var columnClues = calculate_clues(columnSolutions)
	var i = columnClues.size()
	
	for clue in columnClues:
		var instance: PicrossClue = picrossClue.instantiate()
		add_child(instance)
		instance.position = Vector2(columnIndex * 40, i * -40)
		instance.change_text(clue)
		i -= 1

func calculate_clues(solution: Array) -> Array[int]:
	var clues: Array[int] = [];
	var currentCount = 0;
	
	for cell in solution:
		if(cell == 1):
			currentCount+= 1
		elif(currentCount > 0):
			clues.append(currentCount)
			currentCount = 0
	
	if(currentCount > 0 || clues.is_empty()):
		clues.append(currentCount)
	
	return clues
