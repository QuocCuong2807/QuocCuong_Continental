package com.springteam.newbackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "Furniture")
public class Furniture {
    @Id
    @Column(name = "furniture_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "furniture_name",length = 50)
    private String furnitureName;

    @ManyToMany(mappedBy = "furnitureSet")
    private Set<Room> rooms;
}
