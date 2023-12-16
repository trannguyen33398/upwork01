package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/pprof"
	"github.com/gin-gonic/gin"
	"github.com/trannguyen33398/upwork01/server/pkg/config"
	"github.com/trannguyen33398/upwork01/server/pkg/controller"
	"github.com/trannguyen33398/upwork01/server/pkg/handler"
	"github.com/trannguyen33398/upwork01/server/pkg/logger"
	"github.com/trannguyen33398/upwork01/server/pkg/store"
	"strings"
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
	setupCORS(r, cfg)

	// load API here
	v1 := r.Group("/api/v1")
	authRoute := v1.Group("/machine")
	{
		authRoute.POST("/", h.Machine.Create)
		authRoute.GET("/", h.Machine.List)
		authRoute.GET("/:machineId", h.Machine.Detail)
		authRoute.PATCH("/:machineId", h.Machine.Update)
		authRoute.DELETE("/:machineId", h.Machine.Delete)
	}

	authRoutePlant := v1.Group("/plant")
	{
		authRoutePlant.POST("/", h.Plant.Create)
		authRoutePlant.GET("/", h.Plant.List)
		authRoutePlant.GET("/:plantId", h.Plant.Detail)
		authRoutePlant.PATCH("/:plaintId", h.Plant.Update)
		authRoutePlant.DELETE("/:plantId", h.Plant.Delete)
	}

	authRouteProcess := v1.Group("/process")
	{
		authRouteProcess.POST("/", h.Process.Create)
		authRouteProcess.GET("/", h.Process.List)
		authRouteProcess.GET("/:processId", h.Process.Detail)
		authRouteProcess.PATCH("/:processId", h.Process.Update)
		authRouteProcess.DELETE("/:processId", h.Process.Delete)
	}

	return r
}
