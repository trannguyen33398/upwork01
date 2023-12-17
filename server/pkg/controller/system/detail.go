package system

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

func (r *controller) Detail(c *gin.Context) (*model.Systems, error) {
	system, err := r.store.System.Detail(r.repo.DB(),c.Param("systemId") )
	if err != nil {
		return nil, err
	}
	
	return system, nil
}
