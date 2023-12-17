package useCaseCluster

import (
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/config"
	"github.com/trannguyen33398/upwork01/server/pkg/controller"
	"github.com/trannguyen33398/upwork01/server/pkg/handler/use-case-cluster/request"
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
	input := request.CreateUseCaseClusterRequest{}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}
	validateError :=view.ValidateRequest(input)
	
	if validateError != nil {
	
		c.JSON(http.StatusBadRequest, validateError)
		return
	}

	l := h.logger.Fields(logger.Fields{
		"handler": "useCaseCluster",
		"method":  "Create",
		"request": input,
	})

	err := h.controller.UseCaseCluster.Create(c, input)

	if err != nil {
		l.Error(err, "failed to create useCaseCluster")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}

	c.Status(http.StatusCreated)
	return
}

func (h *handler) List(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "useCaseCluster",
		"method":  "List",
	})

	useCaseClusters, err := h.controller.UseCaseCluster.List(c)
	if err != nil {
		l.Error(err, "failed to get useCaseCluster list")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.JSON(http.StatusOK, view.CreateResponse[any](view.ToUseCaseClusters(useCaseClusters), nil, nil, nil, ""))
}

func (h *handler) Detail(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "useCaseCluster",
		"method":  "Detail",
	})

	useCaseCluster, err := h.controller.UseCaseCluster.Detail(c)
	if err != nil {
		l.Error(err, "failed to get useCaseCluster detail")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.JSON(http.StatusOK, view.CreateResponse[any](view.ToUseCaseCluster(useCaseCluster), nil, nil, nil, ""))
}

func (h *handler) Update(c *gin.Context) {
	input := request.CreateUseCaseClusterRequest{}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, view.CreateResponse[any](nil, nil, err, input, ""))
		return
	}
	l := h.logger.Fields(logger.Fields{
		"handler": "useCaseCluster",
		"method":  "Update",
	})

	err := h.controller.UseCaseCluster.Update(c, input)
	if err != nil {
		l.Error(err, "failed to update useCaseCluster")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.Status(http.StatusAccepted)
	return
}

func (h *handler) Delete(c *gin.Context) {
	l := h.logger.Fields(logger.Fields{
		"handler": "useCaseCluster",
		"method":  "Delete",
	})

	err := h.controller.UseCaseCluster.Delete(c)
	if err != nil {
		l.Error(err, "failed to delete useCaseCluster")
		c.JSON(http.StatusInternalServerError, view.CreateResponse[any](nil, nil, err, nil, ""))
		return
	}

	c.Status(http.StatusAccepted)
	return
}
