package com.springteam.newbackend.security;

import com.springteam.newbackend.entity.Role;
import com.springteam.newbackend.entity.UserEntity;
import com.springteam.newbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailService implements UserDetailsService {
    private UserRepository userRepository;

    @Autowired
    public CustomUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository
                .findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("cannot find user for username: " + username));
        return new User(userEntity.getUserName(), userEntity.getPassword(), mapRolesToAuthorities(userEntity.getRoles()));
    }

        public Collection<GrantedAuthority> mapRolesToAuthorities(Set<Role> roles) {
            return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toSet());
        }
}
