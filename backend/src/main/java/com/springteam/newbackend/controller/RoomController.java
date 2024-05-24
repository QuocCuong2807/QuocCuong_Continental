package com.springteam.newbackend.controller;

import java.util.List;
import java.util.Optional;


import com.springteam.newbackend.dto.RoomDto;
import com.springteam.newbackend.dto.RoomResponse;
import com.springteam.newbackend.entity.Room;
import com.springteam.newbackend.exception.InvalidPriceException;
import com.springteam.newbackend.service.IRoomService;
import org.springframework.beans.TypeMismatchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api-room")
public class RoomController {
    private IRoomService roomService;

    @Autowired
    public RoomController(IRoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/rooms")
    public ResponseEntity<RoomResponse> getAllRooms(@RequestParam Optional<Integer> p) {

        //limit page size
        Pageable pageable = PageRequest.of(p.orElse(0), 3);
        RoomResponse roomResponse = roomService.getAllRooms(pageable);

        return new ResponseEntity<>(roomResponse, HttpStatus.OK);
    }

    @GetMapping("/v2/rooms")
    public ResponseEntity<List<RoomDto>> getAllRooms() {

        List<RoomDto> roomDtoList = roomService.getAllRooms();
        return new ResponseEntity<>(roomDtoList, HttpStatus.OK);
    }

    @GetMapping("/room/{id}")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable("id") String roomId) {

        Long id = Long.valueOf(roomId);
        RoomDto roomDto = roomService.getRoomById(id);
        return new ResponseEntity<>(roomDto, HttpStatus.OK);
    }

    @PostMapping(value = "/rooms", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> insertNewRoom(@RequestParam(value = "name") String name,
                                                @RequestParam(value = "price") String price,
                                                @RequestParam(value = "description") String description,
                                                @RequestParam(value = "main_image") MultipartFile main_image,
                                                @RequestParam(value = "image_description") List<MultipartFile> image_description,
                                                @RequestParam(value = "furnitureSet") List<String> furnitureSet
    ) {
        int newPrice = 0;
        try {
            newPrice = Integer.valueOf(price);
        } catch (TypeMismatchException e) {
            throw new InvalidPriceException("Giá tiền không hợp lệ");
        }

        Room room = Room.builder()
                .name(name)
                .price(newPrice)
                .description(description)
                .build();

        roomService.insertNewRoom(room, main_image, image_description, furnitureSet);

        return new ResponseEntity<>("Thêm phòng mới thành công", HttpStatus.CREATED);
    }

    @PutMapping(value = "/room", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateRoom(@RequestParam String id,
                                             @RequestParam(value = "name") String name,
                                             @RequestParam(value = "price") String price,
                                             @RequestParam(value = "description") String description,
                                             @RequestParam(value = "main_image") Optional<MultipartFile> main_image,
                                             @RequestParam(value = "image_description") Optional<List<MultipartFile>> image_description,
                                             @RequestParam(value = "furnitureSet") Optional<List<String>> furnitureSet
    ) {

        Long roomId = Long.valueOf(id);
        int newPrice;

        //handle price exception
        try {
            newPrice = Integer.valueOf(price);
        } catch (Exception e) {
            throw new InvalidPriceException("Giá không hợp lệ");
        }
        if (newPrice <= 0) throw new InvalidPriceException("Giá không hợp lệ");


        roomService.updateRoom(roomId, name, newPrice, description, main_image, image_description, furnitureSet);

        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @DeleteMapping("/room/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable("id") String roomId) {

        Long id = Long.valueOf(roomId);
        roomService.deleteRoomById(id);
        return new ResponseEntity<>("delete success", HttpStatus.OK);
    }

}
