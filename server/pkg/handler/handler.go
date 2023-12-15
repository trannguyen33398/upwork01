package handler

import(
	"github.com/trannguyen33398/upwork01/server/pkg/handler/machine"
	"github.com/trannguyen33398/upwork01/server/pkg/store"
	"github.com/trannguyen33398/upwork01/server/pkg/controller"
	"github.com/trannguyen33398/upwork01/server/pkg/logger"
	"github.com/trannguyen33398/upwork01/server/pkg/config"
)

type Handler struct {
	Machine     machine.IHandler
}

func New(store *store.Store, repo store.DBRepo,  ctrl *controller.Controller, logger logger.Logger, cfg *config.Config) *Handler {
	return &Handler{
		Machine:     machine.New(ctrl, store, repo, logger, cfg),
	}
}