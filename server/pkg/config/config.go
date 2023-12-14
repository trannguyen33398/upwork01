package config
type DBConnection struct {
	Host string
	Port string
	User string
	Name string
	Pass string

	SSLMode string
}
type Config struct {
	// db
	Postgres DBConnection
	Debug        bool
}

type ENV interface {
	GetBool(string) bool
	GetString(string) string
}
func Generate(v ENV) *Config {
	return &Config{
		Debug:        v.GetBool("DEBUG"),
		Postgres: DBConnection{
			Host:    v.GetString("DB_HOST"),
			Port:    v.GetString("DB_PORT"),
			User:    v.GetString("DB_USER"),
			Name:    v.GetString("DB_NAME"),
			Pass:    v.GetString("DB_PASS"),
			SSLMode: v.GetString("DB_SSL_MODE"),
		},
	}}