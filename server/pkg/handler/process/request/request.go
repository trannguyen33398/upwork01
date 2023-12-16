package request

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

type CreateProcessRequest struct {
	Name       string     `json:"name"`
	ParentId   model.UUID `json:"parentId"`
	Type       string     `json:"type"`
	FocusField bool       `json:"focusField"`
	Active     bool       `json:"active"`
}
