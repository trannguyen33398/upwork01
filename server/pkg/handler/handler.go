package handler

import (
	"github.com/trannguyen33398/upwork01/server/pkg/config"
	"github.com/trannguyen33398/upwork01/server/pkg/controller"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/machine"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/plant"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/process"
	serviceLine "github.com/trannguyen33398/upwork01/server/pkg/handler/service-line"
	useCaseCluster "github.com/trannguyen33398/upwork01/server/pkg/handler/use-case-cluster"
	"github.com/trannguyen33398/upwork01/server/pkg/logger"
	"github.com/trannguyen33398/upwork01/server/pkg/store"
)

type Handler struct {
	Machine        machine.IHandler
	Plant          plant.IHandler
	Process        process.IHandler
	ServiceLine    serviceLine.IHandler
	UseCaseCLuster useCaseCluster.IHandler
}

func New(store *store.Store, repo store.DBRepo, ctrl *controller.Controller, logger logger.Logger, cfg *config.Config) *Handler {
	return &Handler{
		Machine:        machine.New(ctrl, store, repo, logger, cfg),
		Plant:          plant.New(ctrl, store, repo, logger, cfg),
		Process:        process.New(ctrl, store, repo, logger, cfg),
		ServiceLine:    serviceLine.New(ctrl, store, repo, logger, cfg),
		UseCaseCLuster: useCaseCluster.New(ctrl, store, repo, logger, cfg),
	}
}
