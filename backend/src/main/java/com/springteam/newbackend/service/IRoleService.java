package com.springteam.newbackend.service;

import com.springteam.newbackend.entity.Role;

import java.util.Set;

public interface IRoleService {
    Set<Role> getAllRole();
    Role getRoleByName(String roleName);
}
