package com.springteam.newbackend;

import com.springteam.newbackend.entity.Furniture;
import com.springteam.newbackend.repository.IFurnitureRepository;
import com.springteam.newbackend.service.IFurnitureService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootApplication
public class NewbackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(NewbackendApplication.class, args);
    }

//    @Bean
//    public CommandLineRunner commandLineRunner(IFurnitureRepository furnitureRepository) {
//        return runner -> {
//            List<Long> ids = Arrays.asList(4, 3).stream().mapToLong(i -> (long) i).boxed().collect(Collectors.toList());
//
//            List<Furniture> furnitureList = furnitureRepository.findAllById(ids);
//
//            furnitureList.stream().forEach(furniture -> System.out.println(furniture.getFurnitureName()));
//
//
//        };
//    }
}
