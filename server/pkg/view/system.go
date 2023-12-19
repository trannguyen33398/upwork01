package view

import (
	"time"

	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

type CreateSystemResponse struct {
	Data *System `json:"data"`
}

type System struct {
	Id          string     `json:"id"`
	Name        string     `json:"name"`
	ParentId    string     `json:"parentId"`
	Category    string     `json:"category"`
	Description string     `json:"description"`
	ToolName    string     `json:"toolName"`
	Active      bool       `json:"active"`
	ParentName  string     `json:"parentName"`
	CreatedAt   *time.Time `json:"createdAt"`
	UpdatedAt   *time.Time `json:"updatedAt"`
}

func ToSystem(system *model.Systems) *System {
	systemParentName := ""
	if system.SystemParent != nil {
		systemParentName = system.SystemParent.Name
	}
	return &System{
		Id:          system.ID.String(),
		CreatedAt:   system.CreatedAt,
		UpdatedAt:   system.UpdatedAt,
		Name:        system.Name,
		Description: system.Description,
		ParentId:    system.ParentId.String(),
		Active:      system.Active,
		Category:    system.Category,
		ToolName:    system.ToolName,
		ParentName:  systemParentName,
	}
}

func ToSystems(systems []*model.Systems) []System {
	rs := make([]System, 0, len(systems))
	for _, system := range systems {
		c := ToSystem(system)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
