package request
import (
	"github.com/trannguyen33398/upwork01/server/pkg/model"
)
type CreateMachineRequest struct  {
	Name         	 string         `json:"name"`
	ParentId     	 model.UUID        	`json:"parentId"`
	Priority         int         	`json:"priority"`
	Description      string         `json:"description"`
	Status         	 string         `json:"status"`
	Active   		 bool        `json:"active"`
}


