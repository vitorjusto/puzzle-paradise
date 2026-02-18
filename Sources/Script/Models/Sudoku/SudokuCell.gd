extends Node2D
class_name SudokuCell

@export var Index: Vector2 
@export var Quadrant: Vector2 

@onready var pnHover : Panel = get_node("pnHover")
@onready var pnSelected : Panel = get_node("pnSelected")
@onready var pnSameLineHover : Panel = get_node("pnSameLineHover")
@onready var pnSameQuadrantHover : Panel = get_node("pnSameQuadrantHover")
@onready var label : Label = get_node("Label")

signal hoverChanged(Index: Vector2, Quadrant: Vector2 )
signal cellSelected()
signal valueChanged()

var IsHovering: bool
var IsHoveringSameLine: bool
var IsHoveringSameQuadrant: bool
var isClueCell: bool
var isSelected: bool
var value: int = 0

func _process(delta: float) -> void:
	if !IsHovering:
		return
	
	if Input.is_action_just_pressed("LeftMouseClick"):
		emit_signal("cellSelected")
		if isClueCell:
			return
		
		SetSelected(true)
	

func _on_area_2d_mouse_entered() -> void:
	pnHover.visible = true
	IsHovering = true
	emit_signal("hoverChanged", Index, Quadrant)

func _on_area_2d_mouse_exited() -> void:
	pnHover.visible = false
	IsHovering = false

func HoverSameLine(isHovering: bool) -> void:
	pnSameLineHover.visible = isHovering
	IsHoveringSameLine = isHovering

func HoverSameQuadrant(isHovering: bool) -> void:
	pnSameQuadrantHover.visible = isHovering
	IsHoveringSameQuadrant = isHovering

func AddCellClueText(number: int):
	value = number
	label.set_text(str(number))
	isClueCell = true

func SetSelected(selected: bool):
	isSelected = selected
	pnSelected.visible = selected

func _input(event: InputEvent) -> void:
	if !isSelected || isClueCell:
		return
	
	if event is InputEventKey:
		if event.keycode == KEY_1:
			label.set_text("1")
			value = 1
		elif event.keycode == KEY_2:
			label.set_text("2")
			value = 2
		elif event.keycode == KEY_3:
			label.set_text("3")
			value = 3
		elif event.keycode == KEY_4:
			label.set_text("4")
			value = 4
		elif event.keycode == KEY_5:
			label.set_text("5")
			value = 5
		elif event.keycode == KEY_6:
			label.set_text("6")
			value = 6
		elif event.keycode == KEY_7:
			label.set_text("7")
			value = 7
		elif event.keycode == KEY_8:
			label.set_text("8")
			value = 8
		elif event.keycode == KEY_9:
			label.set_text("9")
			value = 9
		elif event.keycode == KEY_BACKSPACE || event.keycode == KEY_DELETE || event.keycode == KEY_0:
			label.set_text("")
			value = 1
		else:
			return
		
		emit_signal("valueChanged")
	
