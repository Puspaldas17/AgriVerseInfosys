package com.agriverse1.agriverse1.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * MongoDB document representing a platform user (Farmer / Vet / Admin).
 * Lombok @Data generates all getters, setters, equals, hashCode & toString.
 * @Builder enables clean object construction in UserService.
 */
@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String email;

    private String password;

    /** Allowed values: USER, VET, ADMIN */
    private String role;

    // ── Gamification ─────────────────────────────
    @Builder.Default
    private int xp = 40;

    @Builder.Default
    private int level = 1;

    private java.util.List<Boolean> missionsState;

    // ── Farmer Profile Details ────────────────────
    private String phone;

    /** e.g. "Black Soil", "Red Soil", "Alluvial Soil", "Clay Soil", "Sandy Soil" */
    private String soilType;

    /** Land size in acres */
    private Double landSize;

    /** Preferred UI language: "English", "Telugu", "Hindi" */
    @Builder.Default
    private String language = "English";
}