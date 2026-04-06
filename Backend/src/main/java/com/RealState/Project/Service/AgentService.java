package com.RealState.Project.Service;

import com.RealState.Project.DTO.AgentDashboardDTO;
import com.RealState.Project.DTO.AgentPerformanceDTO;

import java.util.List;

public interface AgentService {

    AgentDashboardDTO getMyDashboard();

    AgentPerformanceDTO getMyPerformance();

    AgentPerformanceDTO getAgentPerformance(Long agentId);

    List<AgentPerformanceDTO> getAllPerformance();
}