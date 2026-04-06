package com.RealState.Project.Controller;

import com.RealState.Project.DTO.*;
import com.RealState.Project.Service.OfficeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offices")
@RequiredArgsConstructor
public class OfficeController {

    private final OfficeService officeService;


    @GetMapping("/me/dashboard")
    public OfficeDashboardDTO dashboard(){

        return officeService.getDashboard();
    }


    @GetMapping("/me/agents")
    public List<AgentSummaryDTO> agents(){

        return officeService.getAgents();
    }


    @GetMapping("/me/properties")
    public List<PropertyDTO> properties(){

        return officeService.getProperties();
    }


    @GetMapping("/me/listings")
    public List<ListingDTO> listings(){

        return officeService.getListings();
    }
}