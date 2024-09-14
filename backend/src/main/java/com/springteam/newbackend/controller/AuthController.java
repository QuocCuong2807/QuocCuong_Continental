package com.springteam.newbackend.controller;

import com.springteam.newbackend.dto.AuthDto;
import com.springteam.newbackend.dto.AuthResponseDto;
import com.springteam.newbackend.dto.RefreshTokenRequestDto;
import com.springteam.newbackend.entity.Role;
import com.springteam.newbackend.entity.UserEntity;
import com.springteam.newbackend.exception.InvalidAuthInfo;
import com.springteam.newbackend.security.JwtGenerator;
import com.springteam.newbackend.service.IRoleService;
import com.springteam.newbackend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;
    private IUserService userService;
    private IRoleService roleService;
    private JwtGenerator jwtGenerator;
    private UserDetailsService userDetailsService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder,
                          IUserService userService, IRoleService roleService, JwtGenerator jwtGenerator,
                          UserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.roleService = roleService;
        this.jwtGenerator = jwtGenerator;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthDto loginDto) {

        if (loginDto.getUserName().trim().equals("") || loginDto.getUserName() == null
                || loginDto.getPassword().trim().equals("") || loginDto.getPassword() == null)
            throw new InvalidAuthInfo("Invalid register information");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getUserName(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        AuthResponseDto authResponse = AuthResponseDto.builder()
                .accessToken(jwtGenerator.generateToken(authentication))
                .refreshToken("")
                .build();
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthDto registerDto) {

        if (registerDto.getUserName().trim().equals("") || registerDto.getUserName() == null
                || registerDto.getPassword().trim().equals("") || registerDto.getPassword() == null)
            throw new InvalidAuthInfo("Invalid register information");

        if (userService.isUserExisting(registerDto.getUserName()))
            return new ResponseEntity<>("User name is taken", HttpStatus.BAD_REQUEST);

        Set<Role> role = new HashSet<>();
        role.add(roleService.getRoleByName("USER"));
        UserEntity user = UserEntity.builder()
                .userName(registerDto.getUserName())
                .password(passwordEncoder.encode(registerDto.getPassword()))
                .roles(role)
                .build();
        userService.addNewUser(user);
        return new ResponseEntity<>("register successfully", HttpStatus.CREATED);
    }


}
