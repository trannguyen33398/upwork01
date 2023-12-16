package machine

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/machine/request"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)
func (r *controller) Create(c *gin.Context, input request.CreateMachineRequest) ( error) {
	tx, done := r.repo.NewTransaction()

	// Create client
	err := r.store.Machine.Create(tx.DB(), &model.Machine{
		Name:               input.Name,
		Description:        input.Description,
		ParentId: 			input.ParentId,
		Priority:           input.Priority,
		Status:           	input.Status,
		Active:            	input.Active,
	})

	if err != nil {
		return  done(err)
	}
	return  done(nil)
}