package handler

import(
	"github.com/trannguyen33398/upwork01/server/pkg/handler/machine"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/risk"
	"github.com/trannguyen33398/upwork01/server/pkg/store"
	"github.com/trannguyen33398/upwork01/server/pkg/controller"
	"github.com/trannguyen33398/upwork01/server/pkg/logger"
	"github.com/trannguyen33398/upwork01/server/pkg/config"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/plant"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/process"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/system"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/communication-stream"
	serviceLine "github.com/trannguyen33398/upwork01/server/pkg/handler/service-line"
	useCaseCluster "github.com/trannguyen33398/upwork01/server/pkg/handler/use-case-cluster"
)

type Handler struct {
	Plant          plant.IHandler
	Process        process.IHandler
	ServiceLine    serviceLine.IHandler
	UseCaseCLuster useCaseCluster.IHandler
	Machine     machine.IHandler
	Risk     risk.IHandler
	System system.IHandler
	CommunicationStream communicationStream.IHandler
}

func New(store *store.Store, repo store.DBRepo, ctrl *controller.Controller, logger logger.Logger, cfg *config.Config) *Handler {
	return &Handler{
		Machine:        machine.New(ctrl, store, repo, logger, cfg),
		Plant:          plant.New(ctrl, store, repo, logger, cfg),
		Process:        process.New(ctrl, store, repo, logger, cfg),
		ServiceLine:    serviceLine.New(ctrl, store, repo, logger, cfg),
		UseCaseCLuster: useCaseCluster.New(ctrl, store, repo, logger, cfg),
		Risk:     risk.New(ctrl, store, repo, logger, cfg),
		System:     system.New(ctrl, store, repo, logger, cfg),
		CommunicationStream: communicationStream.New(ctrl, store, repo, logger, cfg),
	}
}
