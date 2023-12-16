package view

type Pagination struct {
	Page int64  `json:"page" form:"page,default=0"`            // page index
	Size int64  `json:"size" form:"size"`                      // page size
	Sort string `json:"sort" form:"sort" swaggerignore:"true"` // sort field
} // @name Pagination