package machine

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new machine
func (s *store) Create(db *gorm.DB, e *model.Machine) (err error) {
	return db.Create(e).Error
}

// Get list machine
func (s *store) All(db *gorm.DB, name string) ([]*model.Machine, error) {
	var machine []*model.Machine

	query := db.Preload("MachineParent").
		Where(`machines.name like ?`, "%"+name+"%")

	return machine, query.Find(&machine).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.Machine, error) {
	var machine *model.Machine

	query := db.Preload("MachineParent").Where(`machines.id = ?`, id)

	return machine, query.First(&machine).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData  *model.Machine) ( error) {
	var machine *model.Machine

	query := db.Where(`machines.id = ?`, id).UpdateColumns(updateData)

	return query.UpdateColumns(&machine).Error
}

func (s *store) Delete(db *gorm.DB, id string) ( error) {
	var machine *model.Machine

	query := db.Where(`machines.id = ?`, id)

	return query.Delete(&machine).Error
}