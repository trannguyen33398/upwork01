package machine

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.Machine) (err error)
	All(db *gorm.DB, name string) ([]*model.Machine, error)
	Detail(db *gorm.DB, id string) (*model.Machine, error)
	Update(db *gorm.DB, id string, e *model.Machine) error
	Delete(db *gorm.DB, id string) error
}
