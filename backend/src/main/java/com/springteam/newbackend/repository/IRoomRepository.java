package com.springteam.newbackend.repository;

import com.springteam.newbackend.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IRoomRepository extends JpaRepository<Room, Long> {


    @Query("SELECT r from  Room r " +
            "WHERE r.id NOT IN ( " +
            " SELECT b.room.id from Booking b " +
            " where ((b.checkInDate <= :checkOutDate) and (b.checkOutDate >= :checkInDate)) " +
            ")")
    Page<Room> findAllAvailableRoomsByBookingDate(LocalDate checkInDate, LocalDate checkOutDate, Pageable pageable);
}
