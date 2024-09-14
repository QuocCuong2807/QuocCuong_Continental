package com.springteam.newbackend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import com.springteam.newbackend.dto.FurnitureDto;
import com.springteam.newbackend.dto.RoomDto;
import com.springteam.newbackend.dto.RoomResponse;
import com.springteam.newbackend.entity.Furniture;
import com.springteam.newbackend.entity.Room;
import com.springteam.newbackend.entity.RoomImage;
import com.springteam.newbackend.exception.ImageNotFoundException;
import com.springteam.newbackend.exception.RoomNotFoundException;
import com.springteam.newbackend.repository.IFurnitureRepository;
import com.springteam.newbackend.repository.IRoomRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements IRoomService {

    private IRoomRepository roomRepository;
    private IFurnitureRepository furnitureRepository;
    private Cloudinary cloudinary;

    @Autowired
    public RoomServiceImpl(IRoomRepository roomRepository, IFurnitureRepository furnitureRepository, Cloudinary cloudinary) {
        this.roomRepository = roomRepository;
        this.furnitureRepository = furnitureRepository;
        this.cloudinary = cloudinary;
    }

    @Override
    public RoomResponse getAllRooms(Pageable pageable) {
        Page<Room> page= roomRepository.findAll(pageable);


        List<RoomDto> roomDtos = page.get().toList()
                .stream()
                .map(room -> RoomDto.builder()
                        .id(room.getId())
                        .name(room.getName())
                        .price(room.getPrice())
                        .mainImage(room.getMain_image())
                        .description(room.getDescription())
                        .build())
                .collect(Collectors.toList());

        RoomResponse roomResponse = RoomResponse.builder()
                .data(roomDtos)
                .isFirstPage(page.isFirst())
                .isLastPage(page.isLast())
                .pageNumber(page.getNumber())
                .pageSize(page.getSize())
                .totalElement(page.getTotalElements())
                .totalPage(page.getTotalPages())
                .build();
        return roomResponse;
    }

    @Override
    public List<RoomDto> getAllRooms() {

        List<Room> rooms = roomRepository.findAll();

        List<RoomDto> roomDtoList = rooms.stream()
                .map(room -> RoomDto.builder()
                        .id(room.getId())
                        .name(room.getName())
                        .mainImage(room.getMain_image())
                        .build())
                .collect(Collectors.toList());

        return roomDtoList;
    }

    @Override
    public RoomDto getRoomById(Long id) {

        Room room = roomRepository.findById(id).orElseThrow(() ->
                new RoomNotFoundException("Room cannot be found for id: " + id));

        return RoomDto.builder()
                .id(room.getId())
                .name(room.getName())
                .price(room.getPrice())
                .description(room.getDescription())
                .imageDescription(room.getImage_description().stream()
                        .map(img -> img.getImage()).collect(Collectors.toList()))
                .furnitureSet(room.getFurnitureSet().stream()
                        .map(furniture -> FurnitureDto.builder()
                                .id(furniture.getId())
                                .furnitureName(furniture.getFurnitureName())
                                .build())
                        .collect(Collectors.toSet()))
                .build();
    }

    @Override
    @Transactional
    public Room insertNewRoom(Room room, MultipartFile mainImage, List<MultipartFile> imageDescription,
                              List<String> furnitureIds) {

        if (imageDescription.isEmpty() || mainImage == null) throw new ImageNotFoundException("Không tìm thấy ảnh");

        //set furniture for room
        List<Long> ids = furnitureIds.stream()
                .map(id -> Long.parseLong(id)).collect(Collectors.toList());
        List<Furniture> furnitureList = furnitureRepository.findAllById(ids);
        Set<Furniture> furnitureSet = furnitureList.stream().collect(Collectors.toSet());
        room.setFurnitureSet(furnitureSet);

        //save image to cloudinary and set image url for room
        //Main Image
        room.setMain_image(cloudinaryUploadImage(mainImage).get("secure_url").toString());

        //Image Description
        List<RoomImage> roomImages = imageDescription.stream().
                map(file -> RoomImage.builder()
                        .image(cloudinaryUploadImage(file).get("secure_url").toString())
                        .room(room) 
                        .build())
                .collect(Collectors.toList());


        room.setImage_description(roomImages);
        //save room to db
        roomRepository.save(room);
        return roomRepository.save(room);
    }

    @Override
    @Transactional
    public Room updateRoom(Long id, String name, int price, String description,
                           Optional<MultipartFile> optionalMainImage, Optional<List<MultipartFile>> optionalImageDescription,
                           Optional<List<String>> furnitureList) {

        Room room = roomRepository.findById(id).get();
        MultipartFile mainImage = optionalMainImage.orElse(null);
        List<MultipartFile> imageDescription = optionalImageDescription.orElse(null);
        if (!name.trim().equals("") || name != null)
            room.setName(name);
        if (price >= 0)
            room.setPrice(price);
        if (!description.trim().equals("") || description != null)
            room.setDescription(description);
        if (mainImage != null)
            room.setMain_image(cloudinaryUploadImage(mainImage).get("secure_url").toString());
        if (imageDescription != null) {
            List<RoomImage> roomImages = imageDescription.stream().map(file -> RoomImage.builder()
                    .image(cloudinaryUploadImage(file).get("secure_url").toString())
                    .room(room).build()).collect(Collectors.toList());
            room.setImage_description(roomImages);
        }
        if (furnitureList.isPresent()) {
            List<Long> furnitureIds = furnitureList.get().stream()
                    .map(furnitureId -> Long.parseLong(furnitureId)).collect(Collectors.toList());

            Set<Furniture> furnitureSet = furnitureRepository.findAllById(furnitureIds).stream().collect(Collectors.toSet());
            room.setFurnitureSet(furnitureSet);
        }

        return roomRepository.save(room);
    }

    @Override
    public void deleteRoomById(Long id) {

        //delete room image in cloudinary
        Room room = roomRepository.findById(id).get();
        String mainImageUrl = room.getMain_image();
        List<String> imageDescriptionUrls = room.getImage_description().stream().map(img -> img.getImage()).collect(Collectors.toList());

        roomRepository.deleteById(room.getId());

        deleteCloudinaryImages(mainImageUrl, imageDescriptionUrls);

    }

    private void deleteCloudinaryImages(String mainImageUrl, List<String> imageDescriptionUrls) {
        String[] mainImageUrlItems = mainImageUrl.split("/"); //split img url into [...,..., 'publicId' .jpg]
        //split urlItem into ['publicId' , .jpg]
        String[] mainImageFileNameItems = mainImageUrlItems[mainImageUrlItems.length - 1].split("\\.");
        //get main image public id
        String mainImagePublicId = mainImageFileNameItems[0];

        //get image description's public id list
        List<String> imageDescriptionPublicIds = imageDescriptionUrls.stream()
                .map(imgUrl -> {
                    String[] imgUrlItems = imgUrl.split("/");
                    String[] imgFileNameItems = imgUrlItems[imgUrlItems.length - 1].split("\\.");
                    return imgFileNameItems[0];
                }).collect(Collectors.toList());

        //delete main image on cloudinary
        try {
            cloudinary.api()
                    .deleteResources(Arrays.asList(mainImagePublicId), ObjectUtils.asMap("type", "upload", "resource_type", "image"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        //delete image description list on cloudinary
        imageDescriptionPublicIds.stream().forEach(publicId -> {
            try {
                cloudinary.api()
                        .deleteResources(Arrays.asList(publicId), ObjectUtils.asMap("type", "upload", "resource_type", "image"));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }

    private Map cloudinaryUploadImage(MultipartFile file) {

        Map data;
        try {
            data = this.cloudinary.uploader().upload(file.getBytes(), Map.of());
        } catch (IOException e) {
            throw new RuntimeException("file not found");
        }

        return data;
    }

}
