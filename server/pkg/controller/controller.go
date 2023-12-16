package controller

import (
	"github.com/trannguyen33398/upwork01/server/pkg/config"
	"github.com/trannguyen33398/upwork01/server/pkg/controller/machine"
	"github.com/trannguyen33398/upwork01/server/pkg/controller/plant"
	"github.com/trannguyen33398/upwork01/server/pkg/logger"
	"github.com/trannguyen33398/upwork01/server/pkg/store"
)

type Controller struct {
	Machine machine.IController
	Plant   plant.IController
}

func New(store *store.Store, repo store.DBRepo, logger logger.Logger, cfg *config.Config) *Controller {
	return &Controller{
		Machine: machine.New(store, repo, logger, cfg),
		Plant:   plant.New(store, repo, logger, cfg),
	}
}
