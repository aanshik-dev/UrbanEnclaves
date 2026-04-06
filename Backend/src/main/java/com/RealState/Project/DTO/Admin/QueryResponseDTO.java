package com.RealState.Project.DTO.Admin;

import lombok.*;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QueryResponseDTO {

    private boolean success;
    private String message;
    private List<String> columns;
    private List<Map<String, Object>> data;
}