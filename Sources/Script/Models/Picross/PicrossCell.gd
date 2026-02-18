extends Node2D
class_name PicrossCell

@onready var picrossCellTexture: Node2D = get_node("PicrossCell")
@onready var picrossCellHoverTexture: Node2D = get_node("PicrossCellHover")
@onready var picrossCellMark: Node2D = get_node("XMark")

var mouseEntered: bool = false
var cellStatus:= PicrossEnums.ECellStatus.EMPTY
var picrossGrid: PicrossGrid
var picrossIndex: Vector2
var onCellUpdate: Callable

func _process(delta: float) -> void:
	if(mouseEntered && Input.is_action_pressed("LeftMouseClick")):
		
		if(cellStatus == PicrossEnums.ECellStatus.MARK):
			return
			
		if(picrossGrid.selectionMode == PicrossEnums.ECellStatus.NONE):
			
			if(cellStatus == PicrossEnums.ECellStatus.BLACK):
				picrossGrid.selectionMode = PicrossEnums.ECellStatus.EMPTY
				change_status(PicrossEnums.ECellStatus.EMPTY)
			else:
				picrossGrid.selectionMode = PicrossEnums.ECellStatus.BLACK
				change_status(PicrossEnums.ECellStatus.BLACK)
				
		elif(picrossGrid.selectionMode == PicrossEnums.ECellStatus.BLACK):
			change_status(PicrossEnums.ECellStatus.BLACK)
		elif(picrossGrid.selectionMode == PicrossEnums.ECellStatus.EMPTY):
			change_status(PicrossEnums.ECellStatus.EMPTY)
			
	elif(mouseEntered && Input.is_action_pressed("RightMouseClick")):
		
		if(cellStatus == PicrossEnums.ECellStatus.BLACK):
			return
			
		if(picrossGrid.selectionMode == PicrossEnums.ECellStatus.NONE):
			
			if(cellStatus == PicrossEnums.ECellStatus.MARK):
				picrossGrid.selectionMode = PicrossEnums.ECellStatus.EMPTY
				change_status(PicrossEnums.ECellStatus.EMPTY)
			else:
				picrossGrid.selectionMode = PicrossEnums.ECellStatus.MARK
				change_status(PicrossEnums.ECellStatus.MARK)
				
		elif(picrossGrid.selectionMode == PicrossEnums.ECellStatus.MARK):
			change_status(PicrossEnums.ECellStatus.MARK)
		elif(picrossGrid.selectionMode == PicrossEnums.ECellStatus.EMPTY):
			change_status(PicrossEnums.ECellStatus.EMPTY)
		

func change_status(status: PicrossEnums.ECellStatus):
	cellStatus = status
	picrossCellMark.visible = false
	
	if(cellStatus == PicrossEnums.ECellStatus.BLACK):
		picrossCellTexture.modulate = Color.BLACK
	elif(cellStatus == PicrossEnums.ECellStatus.EMPTY):
		picrossCellTexture.modulate = Color.WHITE
	elif(cellStatus == PicrossEnums.ECellStatus.MARK):
		picrossCellMark.visible = true
	
	if(cellStatus == PicrossEnums.ECellStatus.BLACK):
		onCellUpdate.call(picrossIndex, 1)
	else:
		onCellUpdate.call(picrossIndex, 0)
	

func _on_area_2d_mouse_entered() -> void:
	picrossCellHoverTexture.visible = true
	mouseEntered = true

func _on_area_2d_mouse_exited() -> void:
	picrossCellHoverTexture.visible = false
	mouseEntered = false
