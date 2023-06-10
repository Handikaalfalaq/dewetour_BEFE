package models

import "time"

type Transaction struct {
	Id             int                  `json:"id_trans" form:"id_trans" gorm:"primary_key:auto_increment"`
	IdUser         int                  `json:"id_user" form:"id_user" validation:"required"`
	User           UsersProfileResponse `json:"user" form:"user" gorm:"foreignKey:IdUser"`
	IdTrip         int                  `json:"idTrip" form:"idTrip"`
	Trip           TripResponse         `json:"trip" form:"trip" gorm:"foreignKey:IdTrip" validation:"required"`
	Amount         int                  `json:"amount" form:"amount" validation:"required"`
	Total          int                  `json:"total" form:"total" validation:"required"`
	Date           string               `json:"date" form:"date" validation:"required"`
	CustomerName   string               `json:"customerName" form:"customerName" validation:"required"`
	CustomerGender string               `json:"customerGender" form:"customerGender" validation:"required"`
	CustomerPhone  string               `json:"customerPhone" form:"customerPhone" validation:"required"`
	Status         string               `json:"status" form:"status" validation:"required"`
	CreatedAt      time.Time            `json:"-"`
	UpdatedAt      time.Time            `json:"-"`
}

type TransactionResponse struct {
	Id             int                  `json:"id_trans" form:"id_trans" gorm:"primary_key:auto_increment"`
	IdUser         int                  `json:"id_user" form:"id_user" validation:"required"`
	User           UsersProfileResponse `json:"user" form:"user"`
	IdTrip         int                  `json:"idTrip" form:"idTrip"`
	Trip           TripResponse         `json:"trip" form:"trip"  validation:"required"`
	Amount         int                  `json:"amount" form:"amount" validation:"required"`
	Total          int                  `json:"total" form:"total" validation:"required"`
	Date           string               `json:"date" form:"date" validation:"required"`
	CustomerName   string               `json:"customerName" form:"customerName" validation:"required"`
	CustomerGender string               `json:"customerGender" form:"customerGender" validation:"required"`
	CustomerPhone  string               `json:"customerPhone" form:"customerPhone" validation:"required"`
	Status         string               `json:"status" form:"status" validation:"required"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}
