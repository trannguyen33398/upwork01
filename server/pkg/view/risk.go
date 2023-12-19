package view

import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)

type CreateRiskResponse struct {
	Data *Risk `json:"data"`
}

type Risk struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	ParentId    string `json:"parentId"`
	Priority    int    `json:"priority"`
	Description string `json:"description"`
	Status      string `json:"status"`
	Active      bool   `json:"active"`
	parentName  string `json:"parentName"`
	CreatedAt   string `json:"createdAt"`
	UpdatedAt   string `json:"updatedAt"`
}

func ToRisk(risk *model.Risks) *Risk {
	riskParentName := ""
	if risk.RiskParent != nil {
		riskParentName = risk.RiskParent.Name
	}
	return &Risk{
		Id:          risk.ID.String(),
		CreatedAt:   risk.CreatedAt.Format("02-01-2006"),
		UpdatedAt:   risk.UpdatedAt.Format("02-01-2006"),
		Name:        risk.Name,
		Description: risk.Description,
		ParentId:    risk.ParentId.String(),
		Active:      risk.Active,
		Priority:    risk.Priority,
		parentName:  riskParentName,
	}
}

func ToRisks(risks []*model.Risks) []Risk {
	rs := make([]Risk, 0, len(risks))
	for _, risk := range risks {
		c := ToRisk(risk)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
