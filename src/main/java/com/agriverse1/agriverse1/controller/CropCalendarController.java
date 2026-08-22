package com.agriverse1.agriverse1.controller;

import com.agriverse1.agriverse1.entity.CropCalendar;
import com.agriverse1.agriverse1.service.CropCalendarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crop-calendar")
@CrossOrigin
public class CropCalendarController {

    private final CropCalendarService service;

    public CropCalendarController(CropCalendarService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<CropCalendar>> getAllCrops() {
        return ResponseEntity.ok(service.getAllCrops());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CropCalendar> getCropById(@PathVariable String id) {
        return service.getCropById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CropCalendar> addCrop(
            @RequestBody CropCalendar cropCalendar) {
        return ResponseEntity.ok(service.addCrop(cropCalendar));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CropCalendar> updateCrop(
            @PathVariable String id,
            @RequestBody CropCalendar cropCalendar) {

        CropCalendar updated = service.updateCrop(id, cropCalendar);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCrop(@PathVariable String id) {
        service.deleteCrop(id);
        return ResponseEntity.noContent().build();
    }
}