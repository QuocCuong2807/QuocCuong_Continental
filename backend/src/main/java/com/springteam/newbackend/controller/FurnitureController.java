package com.springteam.newbackend.controller;

import com.springteam.newbackend.dto.FurnitureDto;
import com.springteam.newbackend.dto.FurnitureResponse;
import com.springteam.newbackend.service.IFurnitureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api-furniture")
public class FurnitureController {
    private IFurnitureService furnitureService;

    @Autowired
    public FurnitureController(IFurnitureService furnitureService) {
        this.furnitureService = furnitureService;
    }

    @GetMapping("/v1/furnitures")
    public ResponseEntity<FurnitureResponse> getAllFurniture(@RequestParam Optional<Integer> p){
        Pageable pageable = PageRequest.of(p.orElse(0), 3);
        FurnitureResponse furnitureResponse = furnitureService.getAllFurniture(pageable);

        return new ResponseEntity<>(furnitureResponse, HttpStatus.OK);
    }
    @GetMapping("/v2/furnitures")
    public ResponseEntity<List<FurnitureDto>> getAllFurniture(){
        List<FurnitureDto> furnitureList = furnitureService.getAllFurniture();
        return new ResponseEntity<>(furnitureList, HttpStatus.OK);
    }

    @PostMapping("/furnitures")
    public ResponseEntity<String> addNewFurniture(@RequestBody FurnitureDto furnitureDto) {
        furnitureService.insertFurniture(furnitureDto.getFurnitureName());
        return new ResponseEntity<>("Add success", HttpStatus.CREATED);
    }

    @PutMapping("/furnitures")
    public ResponseEntity<String> updateFurniture(@RequestBody FurnitureDto furnitureDto){
        furnitureService.updateFurniture(furnitureDto);
        return new ResponseEntity<>("Update success", HttpStatus.OK);
    }
}
