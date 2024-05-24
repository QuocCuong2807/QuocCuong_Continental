package com.springteam.newbackend.repository;

import com.springteam.newbackend.entity.Furniture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFurnitureRepository extends JpaRepository<Furniture, Long> {
}
