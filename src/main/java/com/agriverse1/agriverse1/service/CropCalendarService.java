package com.agriverse1.agriverse1.service;

import com.agriverse1.agriverse1.entity.CropCalendar;
import com.agriverse1.agriverse1.repository.CropCalendarRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CropCalendarService {

    private final CropCalendarRepository repository;

    public CropCalendarService(CropCalendarRepository repository) {
        this.repository = repository;
    }

    public List<CropCalendar> getAllCrops() {
        return repository.findAll();
    }

    public Optional<CropCalendar> getCropById(String id) {
        return repository.findById(id);
    }

    public CropCalendar addCrop(CropCalendar cropCalendar) {
        return repository.save(cropCalendar);
    }

    public CropCalendar updateCrop(String id, CropCalendar cropCalendar) {
        Optional<CropCalendar> existingCrop = repository.findById(id);

        if (existingCrop.isPresent()) {
            cropCalendar.setId(id);
            return repository.save(cropCalendar);
        }

        return null;
    }

    public CropCalendar updateCropStatus(String id, String status) {
        Optional<CropCalendar> existingCrop = repository.findById(id);
        if (existingCrop.isPresent()) {
            CropCalendar crop = existingCrop.get();
            crop.setStatus(status);
            return repository.save(crop);
        }
        return null;
    }

    public void deleteCrop(String id) {
        repository.deleteById(id);
    }
}