package com.springteam.newbackend.service;

import com.springteam.newbackend.entity.Role;
import com.springteam.newbackend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements IRoleService{
    private RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Set<Role> getAllRole() {
        return roleRepository.findAll().stream().collect(Collectors.toSet());
    }

    @Override
    public Role getRoleByName(String roleName) {
        return roleRepository.findByName(roleName).orElseThrow(() -> new RuntimeException("cannot find role: " + roleName));
    }
}
