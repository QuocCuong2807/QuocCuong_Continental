package com.springteam.newbackend.repository;

import com.springteam.newbackend.entity.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBookingRepository extends JpaRepository<Booking, Long> {
    Page<Booking> findBookingByBookingConfirmCode(String confirmationCode, Pageable pageable);
}
