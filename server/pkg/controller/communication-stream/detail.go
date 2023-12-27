package communicationStream

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

func (r *controller) Detail(c *gin.Context) (*model.CommunicationStreams, error) {
	communicationStream, err := r.store.CommunicationStream.Detail(r.repo.DB(),c.Param("communicationStreamId") )
	if err != nil {
		return nil, err
	}
	
	return communicationStream, nil
}
