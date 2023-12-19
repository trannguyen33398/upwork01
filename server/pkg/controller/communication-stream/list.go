package risk

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"github.com/trannguyen33398/upwork01/server/pkg/view"
)

func (r *controller) List(c *gin.Context) (int64, []*model.CommunicationStreams, error) {
	page, limit, err := view.GetPaginationFromRequest(c.Query("page"), c.Query("limit"))
	if err != nil {
		return 0, nil, err
	}
	total, communicationStream, err := r.store.CommunicationStream.All(r.repo.DB(), c.Query("name"), page, limit)
	if err != nil {
		return 0, nil, err
	}

	return total, communicationStream, nil
}
