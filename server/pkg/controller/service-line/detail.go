package serviceLine

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

func (r *controller) Detail(c *gin.Context) (*model.ServiceLines, error) {
	plant, err := r.store.ServiceLine.Detail(r.repo.DB(), c.Param("serviceLineId"))
	if err != nil {
		return nil, err
	}

	return plant, nil
}
