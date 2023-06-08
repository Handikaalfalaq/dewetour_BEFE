package handlers

import (
	resultdto "dumbmerch/dto/result"
	tripdto "dumbmerch/dto/trip"
	"dumbmerch/models"
	"dumbmerch/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

var path_file = "http://localhost:5000/uploads/"

type handlerTrip struct {
	TripRepository repositories.TripRepository
}

func HandlerTrip(TripRepository repositories.TripRepository) *handlerTrip {
	return &handlerTrip{TripRepository}
}

func (h *handlerTrip) GetAllTrip(c echo.Context) error {
	trips, err := h.TripRepository.FindTrips()
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	for i, p := range trips {
		trips[i].Image = path_file + p.Image
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: trips})
}

func (h *handlerTrip) GetTripById(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	trip, err := h.TripRepository.GetTrip(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: trip})
}

func (h *handlerTrip) CreateNewTrip(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	request := new(tripdto.CreateTripRequest)

	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error()})
	}
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	// countries, err := h.TripRepository.GetCountryId(request.CountryId)

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	day, _ := strconv.Atoi(c.FormValue("day"))
	night, _ := strconv.Atoi(c.FormValue("night"))
	price, _ := strconv.Atoi(c.FormValue("price"))
	quotaMax, _ := strconv.Atoi(c.FormValue("quotaMax"))
	// quotaFilled, _ := strconv.Atoi(c.FormValue("quotaFilled"))
	countryId, _ := strconv.Atoi(c.FormValue("country_id"))

	trip := models.Trip{
		Title:          c.FormValue("title"),
		CountryId:      countryId,
		Accomodation:   c.FormValue("accomodation"),
		Transportation: c.FormValue("transportation"),
		Eat:            c.FormValue("eat"),
		Day:            day,
		Night:          night,
		DateTrip:       c.FormValue("dateTrip"),
		Price:          price,
		QuotaMax:       quotaMax,
		QuotaFilled:    0,
		Description:    c.FormValue("description"),
		Image:          dataFile,
	}

	data, err := h.TripRepository.CreateTrip(trip)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponseTrip(data)})
}

func (h *handlerTrip) UpdateDataTrip(c echo.Context) error {
	request := new(tripdto.UpdateTripRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))
	trip, err := h.TripRepository.GetUpdateId(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	countries, err := h.TripRepository.GetCountryId(request.CountryId)

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	if request.Title != "" {
		trip.Title = request.Title
	}

	if request.CountryId != 0 {
		trip.CountryId = request.CountryId
	}

	if request.Accomodation != "" {
		trip.Accomodation = request.Accomodation
	}

	trip.Country = countries

	if request.Transportation != "" {
		trip.Transportation = request.Transportation
	}

	if request.Eat != "" {
		trip.Eat = request.Eat
	}

	if request.Day != 0 {
		trip.Day = request.Day
	}

	if request.Night != 0 {
		trip.Night = request.Night
	}

	if request.DateTrip != "" {
		trip.DateTrip = request.DateTrip
	}
	if request.Price != 0 {
		trip.Price = request.Price
	}

	if request.QuotaMax != 0 {
		trip.QuotaMax = request.QuotaMax
	}

	if request.QuotaFilled != 0 {
		trip.QuotaFilled = request.QuotaFilled
	}

	if request.Description != "" {
		trip.Description = request.Description
	}

	if request.Image != "" {
		trip.Image = request.Image
	}

	data, err := h.TripRepository.UpdateTrip(trip)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponseTrip(data)})
}

func (h *handlerTrip) DeleteDataTrip(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	trip, err := h.TripRepository.GetTrip(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.TripRepository.DeleteTrip(trip, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponseTrip(data)})
}

func convertResponseTrip(u models.Trip) tripdto.TripResponse {
	return tripdto.TripResponse{
		Id:    u.Id,
		Title: u.Title,
		// CountryId:      u.CountryId,
		// Country:        u.Country,
		Accomodation:   u.Accomodation,
		Transportation: u.Transportation,
		Eat:            u.Eat,
		Day:            u.Day,
		Night:          u.Night,
		DateTrip:       u.DateTrip,
		Price:          u.Price,
		QuotaMax:       u.QuotaMax,
		QuotaFilled:    u.QuotaFilled,
		Description:    u.Description,
		Image:          u.Image,
	}
}
