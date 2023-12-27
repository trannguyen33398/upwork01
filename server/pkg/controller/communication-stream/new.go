package communicationStream

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/config"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/communication-stream/request"
	"github.com/trannguyen33398/upwork01/server/pkg/logger"
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"github.com/trannguyen33398/upwork01/server/pkg/store"
)

type controller struct {
	store  *store.Store
	logger logger.Logger
	repo   store.DBRepo
	config *config.Config
}

func New(store *store.Store, repo store.DBRepo, logger logger.Logger, cfg *config.Config) IController {
	return &controller{
		store:  store,
		repo:   repo,
		logger: logger,
		config: cfg,
	}
}

type IController interface {
	Create(c *gin.Context, input request.CreateCommunicationStreamRequest) (err error)
	List(c *gin.Context) (total int64, communicationStream []*model.CommunicationStreams, err error)
	Detail(c *gin.Context) (communicationStream *model.CommunicationStreams, err error)
	Update(c *gin.Context, input request.CreateCommunicationStreamRequest) (err error)
	Delete(c *gin.Context) (err error)
}
