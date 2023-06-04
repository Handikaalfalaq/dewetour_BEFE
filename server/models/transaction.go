package models

import "time"

type Transaction struct {
	Id         int                  `json:"id_trans" form:"id_trans" gorm:"primary_key:auto_increment"`
	IdUser     int                  `json:"id_user" form:"id_user" validation:"required"`
	User       UsersProfileResponse `json:"user" form:"user" gorm:"foreignKey:IdUser" validation:"required"`
	CounterQty int                  `json:"counter_qty" form:"counter_qty" validation:"required"`
	Total      int                  `json:"total" form:"total" validation:"required"`
	Status     string               `json:"status" form:"status" validation:"required"`
	Attachment string               `json:"attachment" form:"attachment" validation:"required"`
	IdTrip     int                  `json:"id_trip" form:"id_trip"`
	Trip       TripResponse         `json:"trip" form:"trip" gorm:"foreignKey:IdTrip" validation:"required"`
	CreatedAt  time.Time            `json:"-"`
	UpdatedAt  time.Time            `json:"-"`
}

type TransactionResponse struct {
	Id         int                  `json:"id_trans" form:"id_trans" gorm:"primary_key:auto_increment"`
	IdUser     int                  `json:"id_user" form:"id_user"`
	User       UsersProfileResponse `json:"user" form:"user" gorm:"foreignKey:IdUser"`
	CounterQty int                  `json:"counter_qty" form:"counter_qty"`
	Total      int                  `json:"total" form:"total"`
	Status     string               `json:"status" form:"status"`
	Attachment string               `json:"attachment" form:"attachment"`
	IdTrip     int                  `json:"id_trip" form:"id_trip"`
	Trip       TripResponse         `json:"trip" form:"trip" gorm:"foreignKey:IdTrip"`
}

func (TransactionResponse) TableName() string {
	return "trans"
}


	