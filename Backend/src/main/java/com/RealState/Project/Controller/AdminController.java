package com.RealState.Project.Controller;


import com.RealState.Project.DTO.Admin.AdminDashboardDTO;
import com.RealState.Project.DTO.Admin.QueryRequestDTO;
import com.RealState.Project.Service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;


    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardDTO> dashboard(){

        return ResponseEntity.ok(
                adminService.getDashboard()
        );
    }


    @PutMapping("/agents/{agentId}/activate")
    public ResponseEntity<?> activateAgent(
            @PathVariable Long agentId){

        adminService.activateAgent(agentId);

        return ResponseEntity.ok("Agent Activated");
    }


    @PutMapping("/agents/{agentId}/deactivate")
    public ResponseEntity<?> deactivateAgent(
            @PathVariable Long agentId){

        adminService.deactivateAgent(agentId);

        return ResponseEntity.ok("Agent Deactivated");
    }


    @GetMapping("/query")
    public ResponseEntity<?> runQuery(
            @RequestBody QueryRequestDTO dto){

        return ResponseEntity.ok(
                adminService.runQuery(dto.getQuery())
        );
    }


    @GetMapping("/analytics/revenue")
    public ResponseEntity<?> revenue(){

        return ResponseEntity.ok(
                adminService.getRevenueAnalytics()
        );
    }


    @GetMapping("/analytics/deals")
    public ResponseEntity<?> deals(){

        return ResponseEntity.ok(
                adminService.getDealsAnalytics()
        );
    }


    @GetMapping("/analytics/top-agents")
    public ResponseEntity<?> topAgents(){

        return ResponseEntity.ok(
                adminService.getTopAgents()
        );
    }

}