package com.RealState.Project.DTO;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AgentDTO {

    private Long id;

    private String name;

    private String licence;

    private String status;

}

