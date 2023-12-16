package process

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/process/request"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

func (r *controller) Create(c *gin.Context, input request.CreateProcessRequest) error {
	tx, done := r.repo.NewTransaction()

	// Create client
	err := r.store.Process.Create(tx.DB(), &model.Processes{
		Name:       input.Name,
		ParentId:   input.ParentId,
		Type:       input.Type,
		FocusField: *input.FocusField,
		Active:     *input.Active,
	})

	if err != nil {
		return done(err)
	}
	return done(nil)
}
