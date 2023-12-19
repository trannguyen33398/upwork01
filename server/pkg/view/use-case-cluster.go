package view

import (
	"time"

	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

type CreateUseCaseClusterResponse struct {
	Data *Plant `json:"data"`
}

type UseCaseCluster struct {
	Id          string     `json:"id"`
	Name        string     `json:"name"`
	ParentId    string     `json:"parentId"`
	Description string     `json:"description"`
	Active      bool       `json:"active"`
	ParentName  string     `json:"parentName"`
	CreatedAt   *time.Time `json:"createdAt"`
	UpdatedAt   *time.Time `json:"updatedAt"`
}

func ToUseCaseCluster(useCaseCluster *model.UseCaseCluster) *UseCaseCluster {
	useCaseClusterParentName := ""
	if useCaseCluster.UseCaseClusterParent != nil {
		useCaseClusterParentName = useCaseCluster.UseCaseClusterParent.Name
	}
	return &UseCaseCluster{
		Id:          useCaseCluster.ID.String(),
		CreatedAt:   useCaseCluster.CreatedAt,
		UpdatedAt:   useCaseCluster.UpdatedAt,
		Name:        useCaseCluster.Name,
		Description: useCaseCluster.Description,
		ParentId:    useCaseCluster.ParentId.String(),
		Active:      useCaseCluster.Active,
		ParentName:  useCaseClusterParentName,
	}
}

func ToUseCaseClusters(useCaseClusters []*model.UseCaseCluster) []UseCaseCluster {
	rs := make([]UseCaseCluster, 0, len(useCaseClusters))
	for _, useCaseCluster := range useCaseClusters {
		c := ToUseCaseCluster(useCaseCluster)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
