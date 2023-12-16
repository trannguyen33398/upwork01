package plant

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

func (r *controller) Detail(c *gin.Context) (*model.Plants, error) {
	plant, err := r.store.Plant.Detail(r.repo.DB(), c.Param("plantId"))
	if err != nil {
		return nil, err
	}

	return plant, nil
}
