package models

import "time"

type User struct {
	ID        int       `json:"id" gorm:"primary_key:auto_increment"`
	Name      string    `json:"name" gorm:"varchar(255)" validation:"required"`
	Email     string    `json:"email" gorm:"varchar(255) " validation:"required"`
	Password  string    `json:"password" gorm:"varchar(255)" validation:"required"`
	Phone     string    `json:"phone" gorm:"varchar(255)" validation:"required"`
	Address   string    `json:"address" gorm:"varchar(255)" validation:"required"`
	CreatedAt time.Time `json:"created_at"`
	UpdateAt  time.Time `json:"update_at"`
}

type UsersProfileResponse struct {
	Id       int    `json:"id" form:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Phone    string `json:"phone"`
	Address  string `json:"address"`
}

func (UsersProfileResponse) TableName() string {
	return "users"
}
