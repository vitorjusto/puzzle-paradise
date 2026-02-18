extends Node2D
class_name SudokuGrid

var grid = []
var ansers = [
		[1, 2, 3, 4, 5, 6, 7, 8, 9],
		[9, 1, 2, 3, 4, 5, 6, 7, 8],
		[8, 9, 1, 2, 3, 4, 5, 6, 7],
		[7, 8, 9, 1, 2, 3, 4, 5, 6],
		[6, 7, 8, 9, 1, 2, 3, 4, 5],
		[5, 6, 7, 8, 9, 1, 2, 3, 4],
		[4, 5, 6, 7, 8, 9, 1, 2, 3],
		[3, 4, 5, 6, 7, 8, 9, 1, 2],
		[2, 3, 4, 5, 6, 7, 8, 9, 1]]
		
var clues = [
		[true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, false],
		]
		
func _ready() -> void:
	grid = get_tree().get_nodes_in_group("SudokuCell")
	
	for row in clues.size():
		for column in clues[0].size():
			var cell: SudokuCell = grid.filter(func(x : SudokuCell): return x.Index == Vector2(column, row))[0]
			cell.connect("valueChanged", onValueChanged)
			if !clues[row][column]:
				continue
			cell.AddCellClueText(ansers[row][column])

func onHoverChanged(Index: Vector2, Quadrant: Vector2):
	
	RemoveSameLineHover()
	
	var sameLineNodes = grid.filter(func(x : SudokuCell): return x.Index.x == Index.x || x.Index.y == Index.y)
	
	for cell: SudokuCell in sameLineNodes:
		cell.HoverSameLine(true)
	
	RemoveSameQuadrantHover()
	
	var sameQuadrantNodes = grid.filter(func(x : SudokuCell): return x.Quadrant == Quadrant)
	
	for cell: SudokuCell in sameQuadrantNodes:
		cell.HoverSameQuadrant(true)

func RemoveSameLineHover():
	for cell: SudokuCell in grid.filter(func(x: SudokuCell): return x.IsHoveringSameLine):
		cell.HoverSameLine(false)
		
func RemoveSameQuadrantHover():
	for cell: SudokuCell in grid.filter(func(x: SudokuCell): return x.IsHoveringSameQuadrant):
		cell.HoverSameQuadrant(false)

func onCellSelected():
	for cell: SudokuCell in grid.filter(func(x: SudokuCell): return x.isSelected):
		cell.SetSelected(false)

func onValueChanged():
	if !ValidateAnyZero():
		return
	
	if !ValidateAnsers():
		return
	
	PlayerWon()

func ValidateAnyZero() -> bool:
	return grid.all(func(x: SudokuCell): return x.value != 0)
	
func ValidateAnsers() -> bool:
	for i in clues.size():
		for j in clues[0].size():
			var cell: SudokuCell = grid.filter(func(x : SudokuCell): return x.Index == Vector2(j, i))[0]
			
			if cell.value != ansers[i][j]:
				return false
	
	return true

func _on_area_2d_mouse_exited() -> void:
	RemoveSameLineHover()
	RemoveSameQuadrantHover()

func PlayerWon():
	if OS.has_feature('web'):
		JavaScriptBridge.eval("console.log('JavaScript funcionando!')")
		
		var event_name = "onPlayerWin"
		var js_code = """
		window.dispatchEvent(new CustomEvent('%s', {
			detail: { source: 'godot_game' },
			bubbles: true,
			cancelable: true
		}));
		""" % event_name
		JavaScriptBridge.eval(js_code, false)
		
