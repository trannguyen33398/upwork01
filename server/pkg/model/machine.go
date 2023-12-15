package model

type Machine struct {
	BaseModel

	Name         	 string         `json:"name"`
	ParentId     	 UUID         	`json:"parentId"`
	Priority         int         	`json:"priority"`
	Description      string         `json:"description"`
	Status         	 string         `json:"status"`
	Active   		 bool        `json:"active"`

	MachineParent  *Machine  `json:"machineParent" gorm:"foreignkey:ParentId"`
}