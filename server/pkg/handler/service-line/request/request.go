package request

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

type CreateServiceLineRequest struct {
	Name              string     `json:"name" validate:"required"`
	ParentId          model.UUID `json:"parentId"`
	Description       string     `json:"description" validate:"required"`
	ResponsiblePerson string     `json:"responsiblePerson" validate:"required"`
	Active            *bool       `json:"active" validate:"required"`
}
