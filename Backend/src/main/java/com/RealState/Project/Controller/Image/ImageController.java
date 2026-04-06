//package com.RealState.Project.Controller.Image;
//
//import com.RealState.Project.DTO.ImageDTO;
//import com.RealState.Project.Entity.Images;
//import com.RealState.Project.Service.ImageServices;
//import lombok.AllArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/v1/properties")
//@AllArgsConstructor
//public class ImageController {
//
//    private final ImageServices imageServices;
//
//    @GetMapping("/{propertyId}/images")
//    public List<Images> getImages(@PathVariable Long propertyId){
//        return imageServices.getImage(propertyId);
//    }
//
//    @PostMapping("/{propertyId}/images")
//    public Images createImage(@PathVariable Long propertyId,@RequestBody ImageDTO imageDTO){
//        return imageServices.addNewImage(propertyId,imageDTO);
//    }
//
//    @DeleteMapping("/{propertyId}/images")
//    public Void  deleteImageByPropertyId(@PathVariable Long propertyId){
//        imageServices.deleteImageByPropertyId(propertyId);
//        return null;
//    }
//
//    @DeleteMapping("/images/{imageId}")
//    public Void  deleteImage(@PathVariable Long imageId){
//        imageServices.deleteImageByImageId(imageId);
//        return null;
//    }
//}
