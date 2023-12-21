package request

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

type CreateProcessRequest struct {
	Name       string     `json:"name" validate:"required"`
	ParentId   *model.UUID `json:"parentId"`
	Type       string     `json:"type" validate:"required"`
	FocusField *bool       `json:"focusField"`
	Active     *bool       `json:"active" validate:"required"`
}
