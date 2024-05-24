package com.springteam.newbackend.dto;

import com.springteam.newbackend.entity.Furniture;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class FurnitureResponse {

    private List<FurnitureDto> data;

    private int pageNumber;

    private int pageSize;

    private long totalElement;

    private int totalPage;

    private boolean isFirstPage;

    private boolean isLastPage;
}
