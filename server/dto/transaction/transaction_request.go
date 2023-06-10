package transactiondto

type CreateTransaction struct {
	IdTrip         int    `json:"idTrip" form:"idTrip"`
	Total          int    `json:"total" form:"total" validate:"required"`
	Amount         int    `json:"amount" form:"amount" validate:"required"`
	Date           string `json:"date" form:"date" validate:"required"`
	CustomerName   string `json:"customerName" form:"customerName" validate:"required"`
	CustomerGender string `json:"customerGender" form:"customerGender" validate:"required"`
	CustomerPhone  string `json:"customerPhone" form:"customerPhone" validate:"required"`
}

type UpdateTransaction struct {
	IdTrip         int    `json:"idTrip" form:"idTrip" `
	Total          int    `json:"total" form:"total" `
	Amount         int    `json:"amount" form:"amount" `
	Date           string `json:"date" form:"date" `
	CustomerName   string `json:"customerName" form:"customerName" `
	CustomerGender string `json:"customerGender" form:"customerGender" `
	CustomerPhone  string `json:"customerPhone" form:"customerPhone" `
}
