package com.springteam.newbackend.dto;

import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class BookingDto {
    private Long id;
    private String customerFullName;
    private String customerEmail;
    private String bookingConfirmCode;
    private String checkInDate;
    private String checkOutDate;
    private int totalCustomer;

}
