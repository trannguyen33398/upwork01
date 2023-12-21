package system

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/system/request"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)
func (r *controller) Update(c *gin.Context, input request.CreateSystemRequest) ( error) {
	tx, done := r.repo.NewTransaction()

	// Create client
	 err := r.store.System.Update(tx.DB(),c.Param("systemId") , &model.Systems{
		Name:               input.Name,
		Description:        input.Description,
		ParentId: 			input.ParentId,
		Category:           input.Category,
		ToolName:           input.ToolName,
		Active:            	input.Active,
	})

	if err != nil {
		return done(err)
	}
	return done(nil)
}