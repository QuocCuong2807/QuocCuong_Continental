package com.springteam.newbackend.controller;

import com.springteam.newbackend.dto.*;
import com.springteam.newbackend.service.IBookingService;
import com.springteam.newbackend.service.MailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api-booking")
public class BookingController {
    private final String SUBJECT = "QUỐC CƯỜNG CONTINENTAL XIN TRÂN TRỌNG CẢM ƠN";
    private final String BODY = "Mã xác nhận đặt phòng của bạn là: ";
    private final String LENGTH_OF_STAY = "Khoảng thời gian lưu trú của bạn là từ: ";
    private final String NOTICE = "LƯU Ý: Yêu cầu đặt phòng của bạn sẽ tự động bị huỷ nếu bạn không đến địa điểm Check-In trong 24h";
    private IBookingService bookingService;
    private MailSenderService mailSenderService;

    @Autowired
    public BookingController(IBookingService bookingService, MailSenderService mailSenderService) {
        this.bookingService = bookingService;
        this.mailSenderService = mailSenderService;
    }

    @GetMapping("/availableRooms")
    public ResponseEntity<AvailableRoomsResponse> getAvailableRooms(@RequestParam String checkInDate,
                                                                    @RequestParam String checkOutDate,
                                                                    @RequestParam Optional<Integer> p,
                                                                    @RequestParam Optional<String> sortParam) {


        //implement sorting and pagination logic
        Sort sort = Sort.by(Sort.Direction.ASC, "price");
        if (sortParam.get().equals("desc"))
            sort = Sort.by(Sort.Direction.DESC, "price");
        Pageable pageable = PageRequest.of(p.orElse(0), 3, sort);

        AvailableRoomsResponse availableRoomsResponse = bookingService.getAvailableRooms(checkInDate, checkOutDate, pageable);


        return new ResponseEntity<>(availableRoomsResponse, HttpStatus.OK);
    }

    @GetMapping("/booking")
    public ResponseEntity<BookingResponse> getAllBookings(@RequestParam Optional<Integer> p) {

        Pageable pageable = PageRequest.of(p.orElse(0), 3);

        BookingResponse bookingResponse = bookingService.getAllBookings(pageable);

        return new ResponseEntity<>(bookingResponse, HttpStatus.OK);
    }

    @GetMapping("/booking/confirm-code")
    public ResponseEntity<BookingResponse> getBookingByConfirmationCode(@RequestParam String confirmationCode,
                                                                        @RequestParam Optional<Integer> p) {
        Pageable pageable = PageRequest.of(p.orElse(0), 1);
        BookingResponse bookingResponse = bookingService.getBookingByConfirmationCode(confirmationCode, pageable);
        return new ResponseEntity<>(bookingResponse, HttpStatus.OK);
    }

    @PostMapping("/booking")
    public ResponseEntity<String> bookingRoom(@RequestBody BookingRequest bookingRequest) {
        StringBuilder emailContentBuilder = new StringBuilder("");
        //generating booking confirmation code
        String confirmCode = bookingService.addNewBooking(bookingRequest);

        //combine email content + send email
        emailContentBuilder.append(BODY).append(confirmCode).append("\n")
                .append(LENGTH_OF_STAY).append(bookingRequest.getCheckInDate()).append(" - ")
                .append(bookingRequest.getCheckOutDate()).append("\n")
                .append(NOTICE);

        //sending email
        mailSenderService.sendEmail(bookingRequest.getCustomerEmail(), SUBJECT, emailContentBuilder.toString());

        return new ResponseEntity<>(confirmCode, HttpStatus.OK);
    }

    @DeleteMapping("/booking/{id}")
    public ResponseEntity<String> checkOutBooking(@PathVariable String id) {
        Long bookingId = Long.valueOf(id);
        bookingService.deleteBooking(bookingId);
        return new ResponseEntity<>("CheckOut success", HttpStatus.OK);
    }
}
