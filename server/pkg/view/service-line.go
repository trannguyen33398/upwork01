package view

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
	"time"
)

type CreateServiceLineResponse struct {
	Data *ServiceLine `json:"data"`
}

type ServiceLine struct {
	Id                    string     `json:"id"`
	Name                  string     `json:"name"`
	ParentId              string     `json:"parentId"`
	Description           string     `json:"description"`
	ResponsiblePerson     string     `json:"responsiblePerson"`
	Active                bool       `json:"active"`
	ServiceLineParentName string     `json:"serviceLineParentName"`
	CreatedAt             *time.Time `json:"createdAt"`
	UpdatedAt             *time.Time `json:"updatedAt"`
}

func ToServiceLine(serviceLine *model.ServiceLines) *ServiceLine {
	serviceLineParentName := ""
	if serviceLine.ServiceLineParent != nil {
		serviceLineParentName = serviceLine.ServiceLineParent.Name
	}

	return &ServiceLine{
		Id:                    serviceLine.ID.String(),
		CreatedAt:             serviceLine.CreatedAt,
		UpdatedAt:             serviceLine.UpdatedAt,
		Name:                  serviceLine.Name,
		Description:           serviceLine.Description,
		ParentId:              serviceLine.ParentId.String(),
		ResponsiblePerson:     serviceLine.ResponsiblePerson,
		Active:                serviceLine.Active,
		ServiceLineParentName: serviceLineParentName,
	}
}

func ToServiceLines(serviceLines []*model.ServiceLines) []ServiceLine {
	rs := make([]ServiceLine, 0, len(serviceLines))
	for _, serviceLine := range serviceLines {
		c := ToServiceLine(serviceLine)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
