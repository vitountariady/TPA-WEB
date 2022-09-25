package model

type Job struct {
	ID       string `json:"id"`
	Position string `json:"position"`
	Company  string `json:"company"`
	Location string `json:"location"`
}
