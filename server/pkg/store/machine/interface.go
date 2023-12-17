package machine

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.Machines) (err error)
	All(db *gorm.DB, name string, page int, limit int) ([]*model.Machines, error)
	Detail(db *gorm.DB, id string) (*model.Machines, error)
	Update(db *gorm.DB, id string, e *model.Machines) error
	Delete(db *gorm.DB, id string) error
}
