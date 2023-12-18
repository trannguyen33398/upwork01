package system

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"github.com/trannguyen33398/upwork01/server/pkg/view"
)

func (r *controller) List(c *gin.Context) ([]*model.Systems, error) {
	page, limit, err := view.GetPaginationFromRequest(c.Query("_page"), c.Query("_limit"))
	if err != nil {
		return nil, err
	}
	systems, err := r.store.System.All(r.repo.DB(), c.Query("name"), page, limit)
	if err != nil {
		return nil, err
	}

	return systems, nil
}
