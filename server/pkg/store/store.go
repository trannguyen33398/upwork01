package store

import "github.com/trannguyen33398/upwork01/server/pkg/store/machine"

type Store struct {
	Machine machine.IStore
}
func New() *Store {
	return &Store{
		Machine: machine.New() ,
	}}