package useCaseCluster

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new useCaseCluster
func (s *store) Create(db *gorm.DB, e *model.UseCaseCluster) (err error) {
	return db.Create(e).Error
}

// Get list useCaseCluster
func (s *store) All(db *gorm.DB, name string) ([]*model.UseCaseCluster, error) {
	var useCaseCluster []*model.UseCaseCluster

	query := db.Preload("UseCaseClusterParent").
		Where(`use_case_cluster.name like ?`, "%"+name+"%")

	return useCaseCluster, query.Find(&useCaseCluster).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.UseCaseCluster, error) {
	var useCaseCluster *model.UseCaseCluster

	query := db.Preload("UseCaseClusterParent").Where(`use_case_cluster.id = ?`, id)

	return useCaseCluster, query.First(&useCaseCluster).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData *model.UseCaseCluster) error {
	var useCaseCluster *model.UseCaseCluster

	query := db.Where(`use_case_cluster.id = ?`, id).UpdateColumns(updateData)

	return query.UpdateColumns(&useCaseCluster).Error
}

func (s *store) Delete(db *gorm.DB, id string) error {
	var useCaseCluster *model.UseCaseCluster

	query := db.Where(`use_case_cluster.id = ?`, id)

	return query.Delete(&useCaseCluster).Error
}
