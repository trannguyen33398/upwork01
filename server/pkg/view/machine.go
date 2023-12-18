package view

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

type CreateMachineResponse struct {
	Data *Machine `json:"data"`
}

type Machine struct {
	Id                string     `json:"id"`
	Name              string     `json:"name"`
	ParentId          string    `json:"parentId"`
	Priority          int        `json:"priority"`
	Description       string     `json:"description"`
	Status            string     `json:"status"`
	Active            bool       `json:"active"`
	ParentName string     `json:"parentName"`
	CreatedAt         string `json:"createdAt"`
	UpdatedAt        string `json:"updatedAt"`
}

func ToMachine(machine *model.Machines) *Machine {
	machineParentName := ""
	if machine.MachineParent != nil {
		machineParentName = machine.MachineParent.Name
	}

	return &Machine{
		Id:                machine.ID.String(),
		CreatedAt:         machine.CreatedAt.Format("02-01-2006"),
		UpdatedAt:         machine.UpdatedAt.Format("02-01-2006"),
		Name:              machine.Name,
		Description:       machine.Description,
		ParentId:          machine.ParentId.String(),
		Status:            machine.Status,
		Active:            *machine.Active,
		Priority:          machine.Priority,
		ParentName: machineParentName,
	}
}

func ToMachines(machines []*model.Machines) []Machine {
	rs := make([]Machine, 0, len(machines))
	for _, machine := range machines {
		c := ToMachine(machine)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
