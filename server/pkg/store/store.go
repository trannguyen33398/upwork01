package store

import (
	"github.com/trannguyen33398/upwork01/server/pkg/store/machine"
	"github.com/trannguyen33398/upwork01/server/pkg/store/plant"
	"github.com/trannguyen33398/upwork01/server/pkg/store/process"
	serviceLine "github.com/trannguyen33398/upwork01/server/pkg/store/service-line"
	useCaseCluster "github.com/trannguyen33398/upwork01/server/pkg/store/use-case-cluster"
	"github.com/trannguyen33398/upwork01/server/pkg/store/risk"
)

type Store struct {
	Machine        machine.IStore
	Plant          plant.IStore
	Process        process.IStore
	ServiceLine    serviceLine.IStore
	UseCaseCluster useCaseCluster.IStore
	Risk risk.IStore
}

func New() *Store {
	return &Store{
		Machine:        machine.New(),
		Plant:          plant.New(),
		Process:        process.New(),
		ServiceLine:    serviceLine.New(),
		UseCaseCluster: useCaseCluster.New(),
		Risk: risk.New(),
	}
}
