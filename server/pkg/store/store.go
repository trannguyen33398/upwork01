package store

import (
	"github.com/trannguyen33398/upwork01/server/pkg/store/machine"
	"github.com/trannguyen33398/upwork01/server/pkg/store/plant"
	"github.com/trannguyen33398/upwork01/server/pkg/store/process"
)

type Store struct {
	Machine machine.IStore
	Plant   plant.IStore
	Process process.IStore
}

func New() *Store {
	return &Store{
		Machine: machine.New(),
		Plant:   plant.New(),
		Process: process.New(),
	}
}
