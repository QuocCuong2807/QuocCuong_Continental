package com.springteam.newbackend.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class BookingRequest {
    private String customerFullName;
    private String customerEmail;
    private String checkInDate;
    private String checkOutDate;
    private int totalCustomer;
    private Long roomId;
}
