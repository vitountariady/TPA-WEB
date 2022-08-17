package config

import (
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB *gorm.DB
)

func GetDB() *gorm.DB {
	return DB
}

func init() {
	godotenv.Load()
	connectDatabase()
}

func connectDatabase() {
	dsn := "host=localhost user=postgres password=vito335000 dbname=TPA_WEB port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	var Err error
	DB, Err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if Err != nil {
		panic("Gabisa connect")
	}
}
