package system

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new system
func (s *store) Create(db *gorm.DB, e *model.Systems) (err error) {
	return db.Create(e).Error
}

// Get list system
func (s *store) All(db *gorm.DB, name string,page int, limit int) ([]*model.Systems, error) {
	var system []*model.Systems

	query := db.Preload("SystemParent").
		Where(`systems.name like ?`, "%"+name+"%").Offset(limit * (page - 1)).Limit(limit).Order("systems.created_at desc")

	return system, query.Find(&system).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.Systems, error) {
	var system *model.Systems

	query := db.Preload("SystemParent").Where(`systems.id = ?`, id)

	return system, query.First(&system).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData  *model.Systems) ( error) {
	var system *model.Systems

	query := db.Where(`systems.id = ?`, id).UpdateColumns(updateData)

	return query.UpdateColumns(&system).Error
}

func (s *store) Delete(db *gorm.DB, id string) ( error) {
	var system *model.Systems

	query := db.Where(`systems.id = ?`, id)

	return query.Delete(&system).Error
}