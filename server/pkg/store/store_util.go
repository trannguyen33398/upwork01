package store

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq" 
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
	"github.com/trannguyen33398/upwork01/server/pkg/config"
	"github.com/trannguyen33398/upwork01/server/pkg/logger"
	gormlogger "gorm.io/gorm/logger"
)

// NewPostgresStore postgres init by gorm
func NewPostgresStore(cfg *config.Config) DBRepo {
	ds := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		cfg.Postgres.User, cfg.Postgres.Pass,
		cfg.Postgres.Host, cfg.Postgres.Port, cfg.Postgres.Name,
	)
	fmt.Println(fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		// cfg.Postgres.User, cfg.Postgres.Pass,
		// cfg.Postgres.Host, cfg.Postgres.Port, cfg.Postgres.Name,
	))
	conn, err := sql.Open("postgres", ds)
	if err != nil {
		logger.L.Fatalf(err, "failed to open database connection")
	}

	db, err := gorm.Open(postgres.New(
		postgres.Config{Conn: conn}),
		&gorm.Config{
			NamingStrategy: schema.NamingStrategy{
				SingularTable: false,
			},
		})
	if err != nil {
		logger.L.Fatalf(err, "failed to open database connection")
	}

	logger.L.Info("database connected")

	if cfg.Debug {
		db.Logger = gormlogger.Default.LogMode(gormlogger.Info)
	}

	return &repo{Database: db}
}