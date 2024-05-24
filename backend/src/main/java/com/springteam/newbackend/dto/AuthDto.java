package com.springteam.newbackend.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AuthDto {
    private String userName;
    private String password;
}
