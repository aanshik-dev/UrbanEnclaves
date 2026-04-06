package com.RealState.Project.Strategy;

import com.RealState.Project.Entity.Type.UserType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PropertyStrategyFactory {

    private final UserPropertyStrategy userStrategy;
    private final AgentPropertyStrategy agentStrategy;
    private final OfficePropertyStrategy officeStrategy;
    private final AdminPropertyStrategy adminStrategy;

    public PropertyAccessStrategy getStrategy(UserType type){

        return switch (type){

            case USER -> userStrategy;
            case AGENT -> agentStrategy;
            case OFFICE -> officeStrategy;
            case ADMIN -> adminStrategy;
        };
    }
}