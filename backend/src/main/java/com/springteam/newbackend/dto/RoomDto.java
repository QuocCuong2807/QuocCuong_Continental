package com.springteam.newbackend.dto;

import lombok.*;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class RoomDto {
    private Long id;
    private String name;
    private String mainImage;
    private String description;
    private int price;
    private List<String> imageDescription;
    private Set<FurnitureDto> furnitureSet;
}
