package model

type Plants struct {
	BaseModel
	Name              string `json:"name"`
	ParentId          *UUID   `json:"parentId"`
	OperationsCluster string `json:"operations_cluster"`
	Type              string `json:"type"`
	NameAbbreviation  string `json:"name_abbreviation"`
	Segment           string `json:"segment"`
	Zebra             *bool   `json:"zebra"`
	Active            *bool   `json:"active"`

	PlantParent *Plants `json:"plantParent" gorm:"foreignkey:ParentId"`
}
