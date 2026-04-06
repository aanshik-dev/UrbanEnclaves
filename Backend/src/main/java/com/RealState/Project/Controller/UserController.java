package com.RealState.Project.Controller;


import com.RealState.Project.DTO.UserProfileResponseDTO;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping("/{id}")
    public ResponseEntity<UserProfileResponseDTO> getUserById(
            @PathVariable Long id){

        return ResponseEntity.ok(
                userService.getUserById(id)
        );
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable Long userId){

        userService.deleteUser(userId);

        return ResponseEntity.noContent().build();
    }
}
