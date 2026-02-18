extends Node2D
class_name PicrossClue

@onready var label: Label = get_node("Label")

func change_text(text: int):
	label.set_text(str(text))
