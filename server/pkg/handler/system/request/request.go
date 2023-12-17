package request

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

type CreateSystemRequest struct {
	Name        string     `json:"name" validate:"required"`
	ParentId    model.UUID `json:"parentId"`
	Category    string        `json:"category" validate:"required"`
	ToolName    string        `json:"toolName" validate:"required"`
	Description string     `json:"description" validate:"required"`
	Active      *bool       `json:"active" validate:"required"`
}

