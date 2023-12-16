package useCaseCluster

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.UseCaseCluster) (err error)
	All(db *gorm.DB, name string) ([]*model.UseCaseCluster, error)
	Detail(db *gorm.DB, id string) (*model.UseCaseCluster, error)
	Update(db *gorm.DB, id string, e *model.UseCaseCluster) error
	Delete(db *gorm.DB, id string) error
}
