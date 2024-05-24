package com.springteam.newbackend.service;

import com.springteam.newbackend.dto.*;
import com.springteam.newbackend.entity.Booking;
import com.springteam.newbackend.entity.Room;
import com.springteam.newbackend.exception.InvalidBookingException;
import com.springteam.newbackend.repository.IBookingRepository;
import com.springteam.newbackend.repository.IRoomRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Random;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class BookingServiceImpl implements IBookingService {

    private IRoomRepository roomRepository;
    private IBookingRepository bookingRepository;

    @Autowired
    public BookingServiceImpl(IRoomRepository roomRepository, IBookingRepository bookingRepository) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public AvailableRoomsResponse getAvailableRooms(String checkInDate, String checkOutDate, Pageable pageable) {

        try {
            LocalDate checkOut = LocalDate.parse(checkOutDate);
            LocalDate checkIn = LocalDate.parse(checkInDate);

            Page<Room> page = roomRepository.findAllAvailableRoomsByBookingDate(checkIn, checkOut, pageable);

            List<RoomDto> availableRooms = page.get().toList()
                    .stream()
                    .map(room -> RoomDto.builder()
                            .id(room.getId())
                            .name(room.getName())
                            .mainImage(room.getMain_image())
                            .price(room.getPrice())
                            .description(room.getDescription())
                            .build())
                    .collect(Collectors.toList());

            AvailableRoomsResponse availableRoomsResponse = AvailableRoomsResponse.builder()
                    .data(availableRooms)
                    .isFirstPage(page.isFirst())
                    .isLastPage(page.isLast())
                    .pageNumber(page.getNumber())
                    .pageSize(page.getSize())
                    .totalElement(page.getTotalElements())
                    .totalPage(page.getTotalPages())
                    .build();
            return availableRoomsResponse;

        } catch (RuntimeException e) {
            throw new InvalidBookingException("Thông tin Booking không chính xác");
        }
    }

    @Override
    public BookingResponse getAllBookings(Pageable pageable) {
        Page page = bookingRepository.findAll(pageable);
        List<Booking> bookings = page.get().toList();

        List<BookingDto> bookingDtos = bookings.stream()
                .map(booking -> BookingDto.builder()
                        .id(booking.getBookingId())
                        .bookingConfirmCode(booking.getBookingConfirmCode())
                        .customerFullName(booking.getCustomerFullName())
                        .customerEmail(booking.getCustomerEmail())
                        .totalCustomer(booking.getTotalCustomer())
                        .checkInDate(booking.getCheckInDate().toString())
                        .checkOutDate(booking.getCheckOutDate().toString())
                        .build())
                .collect(Collectors.toList());
        BookingResponse bookingResponse = BookingResponse.builder()
                .data(bookingDtos)
                .isFirstPage(page.isFirst())
                .isLastPage(page.isLast())
                .pageNumber(page.getNumber())
                .pageSize(page.getSize())
                .totalElement(page.getTotalElements())
                .totalPage(page.getTotalPages())
                .build();

        return bookingResponse;
    }

    @Override
    public BookingResponse getBookingByConfirmationCode(String confirmationCode, Pageable pageable) {

        Page<Booking> page = bookingRepository.findBookingByBookingConfirmCode(confirmationCode, pageable);

        List<BookingDto> bookingDtos = page.get().toList()
                .stream().map(booking -> BookingDto.builder()
                        .id(booking.getBookingId())
                        .bookingConfirmCode(booking.getBookingConfirmCode())
                        .customerFullName(booking.getCustomerFullName())
                        .customerEmail(booking.getCustomerEmail())
                        .checkInDate(booking.getCheckInDate().toString())
                        .checkOutDate(booking.getCheckOutDate().toString())
                        .totalCustomer(booking.getTotalCustomer())
                        .build())
                .collect(Collectors.toList());

        BookingResponse bookingResponse = BookingResponse.builder()
                .data(bookingDtos)
                .isFirstPage(page.isFirst())
                .isLastPage(page.isLast())
                .pageNumber(page.getNumber())
                .pageSize(page.getSize())
                .totalElement(page.getTotalElements())
                .totalPage(page.getTotalPages())
                .build();
        return bookingResponse;
    }

    @Override
    public String addNewBooking(BookingRequest bookingRequest) {
        Room room = roomRepository.findById(bookingRequest.getRoomId()).get();
        String confirmationCode = generateRandomString(10);

        if (bookingRequest.getTotalCustomer() <= 0) throw new InvalidBookingException("Số người ở tối thiểu là 1");

        try {
            LocalDate checkInDate = LocalDate.parse(bookingRequest.getCheckInDate());
            LocalDate checkOutDate = LocalDate.parse(bookingRequest.getCheckOutDate());
            Booking booking = Booking.builder()
                    .customerFullName(bookingRequest.getCustomerFullName())
                    .customerEmail(bookingRequest.getCustomerEmail())
                    .totalCustomer(bookingRequest.getTotalCustomer())
                    .bookingConfirmCode(confirmationCode)
                    .room(room)
                    .checkInDate(checkInDate)
                    .checkOutDate(checkOutDate)
                    .build();

            bookingRepository.save(booking);
        } catch (RuntimeException e) {
            throw new InvalidBookingException("Ngày booking không hợp lệ");
        }


        return confirmationCode;
    }

    @Override
    @Transactional
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    private String generateRandomString(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(chars.length());
            sb.append(chars.charAt(index));
        }
        return sb.toString();
    }
}
