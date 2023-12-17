package communicationStream

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.CommunicationStreams) (err error)
	All(db *gorm.DB, name string, page int, limit int) ([]*model.CommunicationStreams, error)
	Detail(db *gorm.DB, id string) (*model.CommunicationStreams, error)
	Update(db *gorm.DB, id string, e *model.CommunicationStreams) error
	Delete(db *gorm.DB, id string) error
}
