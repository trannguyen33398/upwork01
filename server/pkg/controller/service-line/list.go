package serviceLine

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

func (r *controller) List(c *gin.Context) ([]*model.ServiceLines, error) {
	serviceLines, err := r.store.ServiceLine.All(r.repo.DB(), c.Query("name"))
	if err != nil {
		return nil, err
	}

	return serviceLines, nil
}
