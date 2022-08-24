package model

type Education struct {
	ID           string  `json:"ID"`
	UserID       string  `json:"UserID"`
	School       string  `json:"School"`
	Degree       string  `json:"Degree"`
	FieldOfStudy string  `json:"FieldOfStudy"`
	StartDate    string  `json:"StartDate"`
	EndDate      string  `json:"EndDate"`
	Grade        float64 `json:"Grade"`
	Activities   string  `json:"Activities"`
	Description  string  `json:"Description"`
}
