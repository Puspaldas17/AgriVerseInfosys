package com.agriverse1.agriverse1.dto;

import lombok.Data;
import java.util.List;

@Data
public class UserSyncDto {
    private int xp;
    private int level;
    private List<Boolean> missionsState;
}
