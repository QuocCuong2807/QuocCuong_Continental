package com.springteam.newbackend.service;

import com.springteam.newbackend.entity.UserEntity;
import com.springteam.newbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService{
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserEntity getUserByUserName(String userName) {

        return userRepository
                .findByUserName(userName)
                .orElseThrow(() -> new UsernameNotFoundException("cannot find user for: " + userName));
    }

    @Override
    public Boolean isUserExisting(String userName) {
        return userRepository.existsByUserName(userName);
    }

    @Override
    public void addNewUser(UserEntity user) {
        userRepository.save(user);
    }
}
