package system

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.Systems) (err error)
	All(db *gorm.DB, name string, page int, limit int) ([]*model.Systems, error)
	Detail(db *gorm.DB, id string) (*model.Systems, error)
	Update(db *gorm.DB, id string, e *model.Systems) error
	Delete(db *gorm.DB, id string) error
}
