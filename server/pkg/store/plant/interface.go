package plant

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.Plants) (err error)
	All(db *gorm.DB, name string) ([]*model.Plants, error)
	Detail(db *gorm.DB, id string) (*model.Plants, error)
	Update(db *gorm.DB, id string, e *model.Plants) error
	Delete(db *gorm.DB, id string) error
}
