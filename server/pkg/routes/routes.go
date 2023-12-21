package routes

import (
	"strings"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/pprof"
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/config"
	"github.com/trannguyen33398/upwork01/server/pkg/controller"
	"github.com/trannguyen33398/upwork01/server/pkg/handler"
	"github.com/trannguyen33398/upwork01/server/pkg/logger"
	"github.com/trannguyen33398/upwork01/server/pkg/store"
)

func setupCORS(r *gin.Engine, cfg *config.Config) {
	corsOrigins := strings.Split(cfg.ApiServer.AllowedOrigins, ";")
	r.Use(func(c *gin.Context) {
		cors.New(
			cors.Config{
				AllowOrigins: corsOrigins,
				AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"},
				AllowHeaders: []string{
					"Origin", "Host", "Content-Type", "Content-Length", "Accept-Encoding", "Accept-Language", "Accept",
					"X-CSRF-Token", "Authorization", "X-Requested-With", "X-Access-Token",
				},
				AllowCredentials: true,
			},
		)(c)
	})
}

func NewRoutes(cfg *config.Config, s *store.Store, repo store.DBRepo, logger logger.Logger) *gin.Engine {
	// programmatically set swagger info

	r := gin.New()

	pprof.Register(r)

	ctrl := controller.New(s, repo, logger, cfg)
	h := handler.New(s, repo, ctrl, logger, cfg)

	r.Use(
		gin.LoggerWithWriter(gin.DefaultWriter, "/healthz"),
		gin.Recovery(),
	)
	// config CORS
	setupCORS(r,cfg)
	

	// load API here
	v1 := r.Group("/api/v1")
	machineRoute := v1.Group("/machine")
	{
		machineRoute.POST("/", h.Machine.Create)
		machineRoute.GET("/", h.Machine.List)
		machineRoute.GET("/:machineId", h.Machine.Detail)
		machineRoute.PUT("/:machineId", h.Machine.Update)
		machineRoute.DELETE("/:machineId", h.Machine.Delete)
	}

	riskRoute := v1.Group("/risk")
	{
		riskRoute.POST("/", h.Risk.Create)
		riskRoute.GET("/", h.Risk.List)
		riskRoute.GET("/:riskId", h.Risk.Detail)
		riskRoute.PUT("/:riskId", h.Risk.Update)
		riskRoute.DELETE("/:riskId", h.Risk.Delete)
	}

	plantRoute := v1.Group("/plant")
	{
		plantRoute.POST("/", h.Plant.Create)
		plantRoute.GET("/", h.Plant.List)
		plantRoute.GET("/:plantId", h.Plant.Detail)
		plantRoute.PUT("/:plantId", h.Plant.Update)
		plantRoute.DELETE("/:plantId", h.Plant.Delete)
	}

	processRoute := v1.Group("/process")
	{
		processRoute.POST("/", h.Process.Create)
		processRoute.GET("/", h.Process.List)
		processRoute.GET("/:processId", h.Process.Detail)
		processRoute.PUT("/:processId", h.Process.Update)
		processRoute.DELETE("/:processId", h.Process.Delete)
	}

	serviceLineRoute := v1.Group("/service-line")
	{
		serviceLineRoute.POST("/", h.ServiceLine.Create)
		serviceLineRoute.GET("/", h.ServiceLine.List)
		serviceLineRoute.GET("/:serviceLineId", h.ServiceLine.Detail)
		serviceLineRoute.PUT("/:serviceLineId", h.ServiceLine.Update)
		serviceLineRoute.DELETE("/:serviceLineId", h.ServiceLine.Delete)
	}

	useCaseClusterRoute := v1.Group("/use-case-cluster")
	{
		useCaseClusterRoute.POST("/", h.UseCaseCLuster.Create)
		useCaseClusterRoute.GET("/", h.UseCaseCLuster.List)
		useCaseClusterRoute.GET("/:useCaseClusterId", h.UseCaseCLuster.Detail)
		useCaseClusterRoute.PUT("/:useCaseClusterId", h.UseCaseCLuster.Update)
		useCaseClusterRoute.DELETE("/:useCaseClusterId", h.UseCaseCLuster.Delete)
	}

	systemRoute := v1.Group("/system")
	{
		systemRoute.POST("/", h.System.Create)
		systemRoute.GET("/", h.System.List)
		systemRoute.GET("/:systemId", h.System.Detail)
		systemRoute.PUT("/:systemId", h.System.Update)
		systemRoute.DELETE("/:systemId", h.System.Delete)
	}

	communicationStreamRoute := v1.Group("/communication-stream")
	{
		communicationStreamRoute.POST("/", h.CommunicationStream.Create)
		communicationStreamRoute.GET("/", h.CommunicationStream.List)
		communicationStreamRoute.GET("/:communicationStreamId", h.CommunicationStream.Detail)
		communicationStreamRoute.PUT("/:communicationStreamId", h.CommunicationStream.Update)
		communicationStreamRoute.DELETE("/:communicationStreamId", h.CommunicationStream.Delete)
	}

	return r
}
