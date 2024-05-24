package com.springteam.newbackend.service;

import com.springteam.newbackend.entity.UserEntity;

public interface IUserService {
    UserEntity getUserByUserName(String userName);
    Boolean isUserExisting(String userName);
    void addNewUser(UserEntity user);
}
