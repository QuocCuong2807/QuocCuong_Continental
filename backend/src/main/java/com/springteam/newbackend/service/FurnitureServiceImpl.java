package com.springteam.newbackend.service;

import com.springteam.newbackend.dto.FurnitureDto;
import com.springteam.newbackend.dto.FurnitureResponse;
import com.springteam.newbackend.entity.Furniture;
import com.springteam.newbackend.exception.EmptyFurnitureNameException;
import com.springteam.newbackend.repository.IFurnitureRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FurnitureServiceImpl implements IFurnitureService {
    IFurnitureRepository furnitureRepository;

    @Autowired
    public FurnitureServiceImpl(IFurnitureRepository furnitureRepository) {
        this.furnitureRepository = furnitureRepository;
    }

    @Override
    public FurnitureResponse getAllFurniture(Pageable pageable) {
        Page<Furniture> page = furnitureRepository.findAll(pageable);
        List<FurnitureDto> furnitureDtos = page.get().toList()
                .stream()
                .map(furniture -> FurnitureDto.builder()
                        .id(furniture.getId())
                        .furnitureName(furniture.getFurnitureName())
                        .build())
                .collect(Collectors.toList());

        FurnitureResponse furnitureResponse = FurnitureResponse.builder()
                .data(furnitureDtos)
                .isFirstPage(page.isFirst())
                .isLastPage(page.isLast())
                .pageNumber(page.getNumber())
                .pageSize(page.getSize())
                .totalElement(page.getTotalElements())
                .totalPage(page.getTotalPages())
                .build();

        return furnitureResponse;
    }

    @Override
    public List<FurnitureDto> getAllFurniture() {

        //map Furniture to FurnitureDto
        return furnitureRepository.findAll()
                .stream().map(furniture ->
                        FurnitureDto.builder()
                                .id(furniture.getId())
                                .furnitureName(furniture.getFurnitureName())
                                .build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Furniture insertFurniture(String furnitureName) {

        if (furnitureName.trim().equals("") || furnitureName == null)
            throw new EmptyFurnitureNameException("furniture name is empty");

        Furniture furniture = Furniture.builder().furnitureName(furnitureName).build();
        return furnitureRepository.save(furniture);
    }

    @Override
    @Transactional
    public Furniture updateFurniture(FurnitureDto furnitureDto) {

        if (furnitureDto.getFurnitureName().trim().equals("") || furnitureDto.getFurnitureName() == null)
            throw new EmptyFurnitureNameException("furniture name is empty");

        Furniture furniture = Furniture.builder()
                .id(furnitureDto.getId())
                .furnitureName(furnitureDto.getFurnitureName())
                .build();

        return furnitureRepository.save(furniture);
    }
}
