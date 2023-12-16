package plant

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new plant
func (s *store) Create(db *gorm.DB, e *model.Plants) (err error) {
	return db.Create(e).Error
}

// Get list plant
func (s *store) All(db *gorm.DB, name string) ([]*model.Plants, error) {
	var plant []*model.Plants

	query := db.Preload("PlantParent").
		Where(`plants.name like ?`, "%"+name+"%")

	return plant, query.Find(&plant).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.Plants, error) {
	var plant *model.Plants

	query := db.Preload("PlantParent").Where(`plants.id = ?`, id)

	return plant, query.First(&plant).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData *model.Plants) error {
	var plant *model.Plants

	query := db.Where(`plants.id = ?`, id).UpdateColumns(updateData)

	return query.UpdateColumns(&plant).Error
}

func (s *store) Delete(db *gorm.DB, id string) error {
	var plant *model.Plants

	query := db.Where(`plants.id = ?`, id)

	return query.Delete(&plant).Error
}