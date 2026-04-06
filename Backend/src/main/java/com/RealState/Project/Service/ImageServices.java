package com.RealState.Project.Service;

import com.RealState.Project.DTO.ImageDTO;
import com.RealState.Project.Entity.Images;

import java.util.List;

public interface ImageServices {
    Images addNewImage(Long propertyID, ImageDTO imageDTO);
    List<Images> getImage(Long id);
    void deleteImageByPropertyId(Long propertyID);
    void deleteImageByImageId(Long imageId);
}
