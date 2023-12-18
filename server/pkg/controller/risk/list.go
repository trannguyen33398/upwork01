package risk

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"github.com/trannguyen33398/upwork01/server/pkg/view"
)

func (r *controller) List(c *gin.Context) ([]*model.Risks, error) {
	page, limit, err := view.GetPaginationFromRequest(c.Query("_page"), c.Query("_limit"))
	if err != nil {
		return nil, err
	}
	risks, err := r.store.Risk.All(r.repo.DB(), c.Query("name"), page, limit)
	if err != nil {
		return nil, err
	}

	return risks, nil
}
