package com.springteam.newbackend.service;

import com.springteam.newbackend.dto.AvailableRoomsResponse;
import com.springteam.newbackend.dto.BookingDto;
import com.springteam.newbackend.dto.BookingRequest;

import com.springteam.newbackend.dto.BookingResponse;
import com.springteam.newbackend.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
public interface IBookingService {
    AvailableRoomsResponse getAvailableRooms(String checkInDate, String checkOutDate, Pageable pageable);
    BookingResponse getAllBookings(Pageable pageable);
    BookingResponse getBookingByConfirmationCode(String confirmationCode, Pageable pageable);
    String addNewBooking(BookingRequest bookingRequest);
    void deleteBooking(Long id);
}
