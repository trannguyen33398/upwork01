package request

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

type CreatePlantRequest struct {
	Name              string     `json:"name"`
	ParentId          model.UUID `json:"parentId"`
	OperationsCluster string     `json:"operationsCluster"`
	Type              string     `json:"type"`
	NameAbbreviation  string     `json:"nameAbbreviation"`
	Segment           string     `json:"segment"`
	Zebra             bool       `json:"zebra"`
	Active            bool       `json:"active"`
}
