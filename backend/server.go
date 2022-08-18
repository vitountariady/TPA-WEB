package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/mux"
	"github.com/vitountariady/TPA-WEB/config"
	"github.com/vitountariady/TPA-WEB/directives"
	"github.com/vitountariady/TPA-WEB/graph"
	"github.com/vitountariady/TPA-WEB/graph/generated"
	"github.com/vitountariady/TPA-WEB/graph/model"
	"github.com/vitountariady/TPA-WEB/middleware"
)

const defaultPort = "8080"

func MyCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token")
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("content-type", "application/json;charset=UTF-8")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	//Auto Migrations
	db := config.GetDB()
	db.AutoMigrate(&model.User{})

	c := generated.Config{Resolvers: &graph.Resolver{
		DB: db,
	}}
	c.Directives.Auth = directives.Auth

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(c))

	router := mux.NewRouter()
	router.Use(MyCors)
	router.Use(middleware.AuthMiddleware)
	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
