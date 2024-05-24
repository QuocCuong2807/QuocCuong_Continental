package com.springteam.newbackend.service;

import com.springteam.newbackend.dto.FurnitureDto;
import com.springteam.newbackend.dto.FurnitureResponse;
import com.springteam.newbackend.entity.Furniture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface IFurnitureService {
    Furniture insertFurniture(String furnitureName);
    Furniture updateFurniture(FurnitureDto furnitureDto);
    FurnitureResponse getAllFurniture(Pageable pageable);
    List<FurnitureDto> getAllFurniture();
}
