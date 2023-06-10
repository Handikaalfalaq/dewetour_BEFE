package transactiondto

import "dumbmerch/models"

type TransactionResponse struct {
	Id             int `json:"id_trans" form:"id_trans" gorm:"primary_key:auto_increment"`
	IdUser         int `json:"idUser" form:"idUser"`
	User           models.UsersProfileResponse
	IdTrip         int `json:"idTrip" form:"idTrip"`
	Trip           models.TripResponse
	Amount         int    `json:"amount" form:"amount"`
	Total          int    `json:"total" form:"total"`
	Date           string `json:"date" form:"date"`
	CustomerName   string `json:"customerName" form:"customerName"`
	CustomerGender string `json:"customerGender" form:"customerGender"`
	CustomerPhone  string `json:"customerPhone" form:"customerPhone"`
}
