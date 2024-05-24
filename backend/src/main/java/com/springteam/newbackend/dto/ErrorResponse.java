package com.springteam.newbackend.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ErrorResponse {
    private int status;
    private String message;
    private long timeStamp;
}
