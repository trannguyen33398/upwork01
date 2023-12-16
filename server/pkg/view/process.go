package view

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"time"
)

type CreateProcessResponse struct {
	Data *Process `json:"data"`
}

type Process struct {
	Id                string     `json:"id"`
	Name              string     `json:"name"`
	ParentId          string     `json:"parentId"`
	Type              string     `json:"type"`
	FocusField        bool       `json:"focusField"`
	Active            bool       `json:"active"`
	ProcessParentName string     `json:"processParentName"`
	CreatedAt         *time.Time `json:"createdAt"`
	UpdatedAt         *time.Time `json:"updatedAt"`
}

func ToProcess(process *model.Processes) *Process {
	processParentName := ""
	if process.ProcessParent != nil {
		processParentName = process.ProcessParent.Name
	}
	return &Process{
		Id:                process.ID.String(),
		CreatedAt:         process.CreatedAt,
		UpdatedAt:         process.UpdatedAt,
		Name:              process.Name,
		ParentId:          process.ParentId.String(),
		Type:              process.Type,
		Active:            process.Active,
		FocusField:        process.FocusField,
		ProcessParentName: processParentName,
	}
}

func ToProcesses(processes []*model.Processes) []Process {
	rs := make([]Process, 0, len(processes))
	for _, process := range processes {
		c := ToProcess(process)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
