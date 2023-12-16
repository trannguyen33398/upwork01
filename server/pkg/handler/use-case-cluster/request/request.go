package request

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

type CreateUseCaseClusterRequest struct {
	Name        string     `json:"name"`
	ParentId    model.UUID `json:"parentId"`
	Description string     `json:"description"`
	Active      bool       `json:"active"`
}
