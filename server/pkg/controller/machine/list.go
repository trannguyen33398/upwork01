package machine

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"github.com/trannguyen33398/upwork01/server/pkg/view"
)

func (r *controller) List(c *gin.Context) ([]*model.Machines, error) {

	page, limit, err := view.GetPaginationFromRequest(c.Query("page"), c.Query("limit"))

	if err != nil {
		return nil, err
	}
	machines, err := r.store.Machine.All(r.repo.DB(), c.Query("name"), page, limit)
	if err != nil {
		return nil, err
	}

	return machines, nil
}
