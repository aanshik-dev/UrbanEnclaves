package com.RealState.Project.Controller;

import com.RealState.Project.DTO.Admin.QueryRequestDTO;
import com.RealState.Project.Service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class PublicController {

    private final AdminService adminService;

    @GetMapping("/query")
    public ResponseEntity<?> runQuery(
            @RequestBody QueryRequestDTO dto){

        return ResponseEntity.ok(
                adminService.runQuery(dto.getQuery())
        );
    }
}
