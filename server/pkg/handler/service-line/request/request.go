package request

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

type CreateServiceLineRequest struct {
	Name              string     `json:"name"`
	ParentId          model.UUID `json:"parentId"`
	Description       string     `json:"description"`
	ResponsiblePerson string     `json:"responsiblePerson"`
	Active            bool       `json:"active"`
}
