package com.RealState.Project.Controller;

import com.RealState.Project.DTO.AgentDashboardDTO;
import com.RealState.Project.DTO.AgentPerformanceDTO;
import com.RealState.Project.Service.AgentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agents")
@RequiredArgsConstructor
public class AgentController {

    private final AgentService agentService;


    @GetMapping("/me/dashboard")
    public AgentDashboardDTO getDashboard(){

        return agentService.getMyDashboard();
    }


    @GetMapping("/me/performance")
    public AgentPerformanceDTO getMyPerformance(){

        return agentService.getMyPerformance();
    }


    @GetMapping("/{agentId}/performance")
    public AgentPerformanceDTO getAgentPerformance(
            @PathVariable Long agentId){

        return agentService.getAgentPerformance(agentId);
    }


    @GetMapping("/performance")
    public List<AgentPerformanceDTO> getAllPerformance(){

        return agentService.getAllPerformance();
    }

}