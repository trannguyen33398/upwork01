package risk

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/config"
	"github.com/trannguyen33398/upwork01/server/pkg/controller"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/risk/request"
	"github.com/trannguyen33398/upwork01/server/pkg/logger"
	"github.com/trannguyen33398/upwork01/server/pkg/store"
	"github.com/trannguyen33398/upwork01/server/pkg/view"
)

type handler struct {
	store      *store.Store
	logger     logger.Logger
	repo       store.DBRepo
	config     *config.Config
	controller *controller.Controller
}

// New returns a handler
func New(controller *controller.Controller, store *store.Store, repo store.DBRepo, logger logger.Logger, cfg *config.Config) IHandler {
	return &handler{
		store:      store,
		repo:       repo,
		logger:     logger,
		config:     cfg,
		controller: controller,
	}
}

type SuccessResult struct {
	message string
}

func (h *handler) Create(c *gin.Context) {
	input := request.CreateRiskRequest{}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}

	validateError :=view.ValidateRequest(input)
	
	if len(validateError) > 0  {
	
		c.JSON(http.StatusBadRequest, validateError)
		return
	}

	l := h.logger.Fields(logger.Fields{
		"handler": "risk",
		"method":  "Create",
		"request": input,
	})



	err := h.controller.Risk.Create(c, input)

	if err != nil {
		l.Error(err, "failed to create risk")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}

	c.Status(http.StatusCreated)
	return
}

func (h *handler) List(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "risk",
		"method":  "List",
	})

	risks, err := h.controller.Risk.List(c)
	if err != nil {
		l.Error(err, "failed to get risk list")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.JSON(http.StatusOK, view.CreateResponse[any](view.ToRisks(risks), nil, nil, nil, ""))
}

func (h *handler) Detail(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "risk",
		"method":  "Detail",
	})

	risk, err := h.controller.Risk.Detail(c)
	if err != nil {
		l.Error(err, "failed to get risk detail")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.JSON(http.StatusOK, view.CreateResponse[any](view.ToRisk(risk), nil, nil, nil, ""))
}

func (h *handler) Update(c *gin.Context) {
	input := request.CreateRiskRequest{}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}
	l := h.logger.Fields(logger.Fields{
		"handler": "risk",
		"method":  "Update",
	})

	validateError :=view.ValidateRequest(input)
	
	if len(validateError) > 0  {
	
		c.JSON(http.StatusBadRequest, validateError)
		return
	}
	
	err := h.controller.Risk.Update(c, input)
	if err != nil {
		l.Error(err, "failed to update risk")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.Status(http.StatusAccepted)
	return
}

func (h *handler) Delete(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "risk",
		"method":  "Delete",
	})

	err := h.controller.Risk.Delete(c)
	if err != nil {
		l.Error(err, "failed to delete risk")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.Status(http.StatusAccepted)
	return
}
