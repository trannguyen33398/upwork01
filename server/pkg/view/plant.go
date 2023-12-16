package view

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"time"
)

type CreatePlantResponse struct {
	Data *Plant `json:"data"`
}

type Plant struct {
	Id                string     `json:"id"`
	Name              string     `json:"name"`
	ParentId          string     `json:"parentId"`
	OperationsCluster string     `json:"operationsCluster"`
	Type              string     `json:"type"`
	NameAbbreviation  string     `json:"nameAbbreviation"`
	Segment           string     `json:"segment"`
	Zebra             bool       `json:"zebra"`
	Active            bool       `json:"active"`
	PlantParentName   string     `json:"plantParentName"`
	CreatedAt         *time.Time `json:"createdAt"`
	UpdatedAt         *time.Time `json:"updatedAt"`
}

func ToPlant(plant *model.Plants) *Plant {
	plantParentName := ""
	if plant.PlantParent != nil {
		plantParentName = plant.PlantParent.Name
	}
	return &Plant{
		Id:                plant.ID.String(),
		CreatedAt:         plant.CreatedAt,
		UpdatedAt:         plant.UpdatedAt,
		Name:              plant.Name,
		OperationsCluster: plant.OperationsCluster,
		ParentId:          plant.ParentId.String(),
		Type:              plant.Type,
		Active:            plant.Active,
		NameAbbreviation:  plant.NameAbbreviation,
		Segment:           plant.Segment,
		Zebra:             plant.Zebra,
		PlantParentName:   plantParentName,
	}
}

func ToPlants(plants []*model.Plants) []Plant {
	rs := make([]Plant, 0, len(plants))
	for _, plant := range plants {
		c := ToPlant(plant)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
