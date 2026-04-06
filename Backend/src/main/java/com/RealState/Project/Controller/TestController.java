package com.RealState.Project.Controller;

import com.RealState.Project.Repository.E1Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/private")
public class TestController {

    private  final E1Repository e1Repository;

    @GetMapping("/e1")
    public List testApi1(){
        return e1Repository.findAll();
    }

}
