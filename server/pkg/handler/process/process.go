package process

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/config"
	"github.com/trannguyen33398/upwork01/server/pkg/controller"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/process/request"
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
	input := request.CreateProcessRequest{}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}

	l := h.logger.Fields(logger.Fields{
		"handler": "process",
		"method":  "Create",
		"request": input,
	})

	err := h.controller.Process.Create(c, input)

	if err != nil {
		l.Error(err, "failed to create process")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}

	c.Status(http.StatusCreated)
	return
}

func (h *handler) List(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "process",
		"method":  "List",
	})

	processes, err := h.controller.Process.List(c)
	if err != nil {
		l.Error(err, "failed to get process list")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.JSON(http.StatusOK, view.CreateResponse[any](view.ToProcesses(processes), nil, nil, nil, ""))
}

func (h *handler) Detail(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "process",
		"method":  "Detail",
	})

	process, err := h.controller.Process.Detail(c)
	if err != nil {
		l.Error(err, "failed to get process detail")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.JSON(http.StatusOK, view.CreateResponse[any](view.ToProcess(process), nil, nil, nil, ""))
}

func (h *handler) Update(c *gin.Context) {
	input := request.CreateProcessRequest{}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}
	l := h.logger.Fields(logger.Fields{
		"handler": "process",
		"method":  "Update",
	})

	err := h.controller.Process.Update(c, input)
	if err != nil {
		l.Error(err, "failed to update process")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.Status(http.StatusAccepted)
	return
}

func (h *handler) Delete(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "process",
		"method":  "Delete",
	})

	err := h.controller.Process.Delete(c)
	if err != nil {
		l.Error(err, "failed to delete process")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.Status(http.StatusAccepted)
	return
}