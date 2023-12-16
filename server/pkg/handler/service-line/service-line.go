package serviceLine

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/config"
	"github.com/trannguyen33398/upwork01/server/pkg/controller"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/service-line/request"
	"github.com/trannguyen33398/upwork01/server/pkg/logger"
	"github.com/trannguyen33398/upwork01/server/pkg/store"
	"github.com/trannguyen33398/upwork01/server/pkg/view"
	"net/http"
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
	input := request.CreateServiceLineRequest{}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}

	l := h.logger.Fields(logger.Fields{
		"handler": "serviceLine",
		"method":  "Create",
		"request": input,
	})

	err := h.controller.ServiceLine.Create(c, input)

	if err != nil {
		l.Error(err, "failed to create serviceLine")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}

	c.Status(http.StatusCreated)
	return
}

func (h *handler) List(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "serviceLine",
		"method":  "List",
	})

	serviceLines, err := h.controller.ServiceLine.List(c)
	if err != nil {
		l.Error(err, "failed to get serviceLine list")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.JSON(http.StatusOK, view.CreateResponse[any](view.ToServiceLines(serviceLines), nil, nil, nil, ""))
}

func (h *handler) Detail(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "serviceLine",
		"method":  "Detail",
	})

	serviceLine, err := h.controller.ServiceLine.Detail(c)
	if err != nil {
		l.Error(err, "failed to get serviceLine detail")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.JSON(http.StatusOK, view.CreateResponse[any](view.ToServiceLine(serviceLine), nil, nil, nil, ""))
}

func (h *handler) Update(c *gin.Context) {
	input := request.CreateServiceLineRequest{}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}
	l := h.logger.Fields(logger.Fields{
		"handler": "serviceLine",
		"method":  "Update",
	})

	err := h.controller.ServiceLine.Update(c, input)
	if err != nil {
		l.Error(err, "failed to update serviceLine")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.Status(http.StatusAccepted)
	return
}

func (h *handler) Delete(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "serviceLine",
		"method":  "Delete",
	})

	err := h.controller.ServiceLine.Delete(c)
	if err != nil {
		l.Error(err, "failed to delete serviceLine")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.Status(http.StatusAccepted)
	return
}