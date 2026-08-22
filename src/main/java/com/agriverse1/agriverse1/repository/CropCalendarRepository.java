package com.agriverse1.agriverse1.repository;

import com.agriverse1.agriverse1.entity.CropCalendar;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CropCalendarRepository extends MongoRepository<CropCalendar, String> {
}