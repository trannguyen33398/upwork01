package useCaseCluster

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/use-case-cluster/request"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

func (r *controller) Create(c *gin.Context, input request.CreateUseCaseClusterRequest) error {
	tx, done := r.repo.NewTransaction()

	// Create client
	err := r.store.UseCaseCluster.Create(tx.DB(), &model.UseCaseCluster{
		Name:        input.Name,
		ParentId:    input.ParentId,
		Description: input.Description,
		Active:      *input.Active,
	})

	if err != nil {
		return done(err)
	}
	return done(nil)
}
