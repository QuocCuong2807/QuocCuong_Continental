package com.springteam.newbackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "Booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "customer_fullName")
    private String customerFullName;

    @Column(name = "customer_email")
    private String customerEmail;

    @Column(name = "confirmation_code")
    private String bookingConfirmCode;

    @Column(name = "checkIn_date")
    private LocalDate checkInDate;

    @Column(name = "checkOut_date")
    private LocalDate checkOutDate;

    @Column(name = "total_customer")
    private int totalCustomer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;
}
