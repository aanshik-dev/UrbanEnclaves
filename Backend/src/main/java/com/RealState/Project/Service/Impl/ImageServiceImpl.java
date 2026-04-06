//package com.RealState.Project.Service.Impl;
//
//import com.RealState.Project.DTO.ImageDTO;
//import com.RealState.Project.Entity.Images;
//import com.RealState.Project.Entity.Property;
//import com.RealState.Project.Repository.ImagesRepository;
//import com.RealState.Project.Repository.PropertyRepository;
//import com.RealState.Project.Service.ImageServices;
//import lombok.AllArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@AllArgsConstructor
//public class ImageServiceImpl implements ImageServices {
//    private final ImagesRepository imagesRepository;
//    private final PropertyRepository propertyRepository;
//
//    // adding a new image with all details
//    @Override
//    public Images addNewImage(Long propertyId, ImageDTO imageDTO){
//        Property property= propertyRepository.findById(propertyId)
//                .orElseThrow(()->new IllegalArgumentException("Property Not Found"));
//
//        Images images = Images.builder()
//                .url(imageDTO.getUrl())
//                .propertyId(property)
//                .build();
//        return imagesRepository.save(images);
//    }
//
//    // get all the images corresponding to a property
//    @Override
//    public List<Images> getImage(Long pid){
//        Property property=propertyRepository.findById(pid)
//                .orElseThrow(()->new IllegalArgumentException("Property Not Found"));
//        return imagesRepository.findByPropertyId(property);
//    }
//
//
//    // deleting all images corresponding to a property
//    @Override
//    public void deleteImageByPropertyId(Long propertyID){
//        Property property=propertyRepository.findById(propertyID)
//                .orElseThrow(()->new IllegalArgumentException("Property Not Found"));
//        imagesRepository.deleteByPropertyId(property);
//    }
//
//    // deleting a particular image corresponding to image id
//    @Override
//    public void deleteImageByImageId(Long imageId){
//        imagesRepository.deleteById(imageId);
//    }
//}
