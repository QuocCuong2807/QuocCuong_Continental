package com.springteam.newbackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "Room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;
    @Column(name = "room_name", length = 100)
    private String name;
    @Column(name = "main_image")
    private String main_image;
    @Column(name = "room_price")
    private int price;
    @Column(name = "room_description")
    private String description;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RoomImage> image_description;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(name = "Room_Furniture",
                joinColumns = {@JoinColumn(name = "room_id")},
                inverseJoinColumns = {@JoinColumn(name = "furniture_id")})
    private Set<Furniture> furnitureSet;
}
