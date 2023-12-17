package controller

import (
	"github.com/trannguyen33398/upwork01/server/pkg/config"
	"github.com/trannguyen33398/upwork01/server/pkg/controller/machine"
	"github.com/trannguyen33398/upwork01/server/pkg/controller/plant"
	"github.com/trannguyen33398/upwork01/server/pkg/controller/process"
	"github.com/trannguyen33398/upwork01/server/pkg/controller/risk"
	serviceLine "github.com/trannguyen33398/upwork01/server/pkg/controller/service-line"
	"github.com/trannguyen33398/upwork01/server/pkg/controller/system"
	useCaseCluster "github.com/trannguyen33398/upwork01/server/pkg/controller/use-case-cluster"
	communicationStream "github.com/trannguyen33398/upwork01/server/pkg/controller/communication-stream"
	"github.com/trannguyen33398/upwork01/server/pkg/logger"
	"github.com/trannguyen33398/upwork01/server/pkg/store"
)

type Controller struct {
	Machine        machine.IController
	Plant          plant.IController
	Process        process.IController
	ServiceLine    serviceLine.IController
	UseCaseCluster useCaseCluster.IController
	Risk           risk.IController
	System         system.IController
	CommunicationStream communicationStream.IController
}

func New(store *store.Store, repo store.DBRepo, logger logger.Logger, cfg *config.Config) *Controller {
	return &Controller{
		Machine:        machine.New(store, repo, logger, cfg),
		Plant:          plant.New(store, repo, logger, cfg),
		Process:        process.New(store, repo, logger, cfg),
		ServiceLine:    serviceLine.New(store, repo, logger, cfg),
		UseCaseCluster: useCaseCluster.New(store, repo, logger, cfg),
		Risk:           risk.New(store, repo, logger, cfg),
		System:         system.New(store, repo, logger, cfg),
		CommunicationStream:         communicationStream.New(store, repo, logger, cfg),
	}
}
