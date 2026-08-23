package com.agriverse1.agriverse1.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "crop_calendar")
public class CropCalendar {

    @Id
    private String id;

    private String cropName;
    private String season;
    private String sowingStartMonth;
    private String sowingEndMonth;
    private String harvestStartMonth;
    private String harvestEndMonth;
    private String waterRequirement;
    private String soilType;
    private String description;
    private String status;
}