package com.springteam.newbackend.service;

import com.springteam.newbackend.dto.RoomDto;
import com.springteam.newbackend.dto.RoomResponse;
import com.springteam.newbackend.entity.Furniture;
import com.springteam.newbackend.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface IRoomService {
    RoomResponse getAllRooms(Pageable pageable);
    List<RoomDto> getAllRooms();

    RoomDto getRoomById(Long id);

    Room insertNewRoom(Room room, MultipartFile mainImage, List<MultipartFile> imageDescription, List<String> furnitureIds);
    Room updateRoom(Long id, String name, int price, String description,
                           Optional<MultipartFile> mainImage, Optional<List<MultipartFile>> imageDescription,
                           Optional<List<String>> furnitureSet);
    void deleteRoomById(Long id);
}
