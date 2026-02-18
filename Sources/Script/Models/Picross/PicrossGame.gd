extends Node2D

var solution = [
	[1, 0, 0, 0, 1],
	[1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0],
	[1, 0, 1, 0, 0],
	[0, 1, 0, 1, 1],
	[0, 1, 0, 1, 1],
	[0, 1, 0, 1, 1],
	[0, 1, 0, 1, 1],
]

var game = solution.map(func(x): return x.map(func(y): return 0))

var mousePosition: Vector2
@onready var camera: Camera2D = get_node("Camera2D")
@onready var picrossGrid: PicrossGrid = get_node("PicrossGrid")

func _ready():
	picrossGrid.GenerateGrid(solution, on_cell_update)

func _process(delta: float) -> void:
	if(Input.is_action_pressed("MouseScrollPress")):
		var diff = mousePosition - get_global_mouse_position()
		picrossGrid.position -= diff
		
	mousePosition = get_global_mouse_position()

func _input(event: InputEvent) -> void:
	if event is InputEventMouseButton:
		var mouseScrollSpeed = Vector2(0.1, 0.1)
		if event.button_index == MouseButton.MOUSE_BUTTON_WHEEL_UP:
			camera.zoom += mouseScrollSpeed
		elif event.button_index == MouseButton.MOUSE_BUTTON_WHEEL_DOWN:
			camera.zoom -= mouseScrollSpeed

func on_cell_update(cellIndex: Vector2, value: int):
	game[cellIndex.x][cellIndex.y] = value
	print(game)
	verify_solution()

func verify_solution():
	for i in game.size():
		for j in game[0].size():
			var expectedValue = solution[i][j]
			var currentValue = game[i][j]
			
			if(expectedValue != currentValue):
				return
	
	print("parabens")
