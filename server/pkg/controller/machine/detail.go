package machine

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

func (r *controller) Detail(c *gin.Context) (*model.Machines, error) {
	machine, err := r.store.Machine.Detail(r.repo.DB(), c.Param("machineId"))
	if err != nil {
		return nil, err
	}

	return machine, nil
}
