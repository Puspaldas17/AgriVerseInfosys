package com.agriverse1.agriverse1.entity;

import org.springframework.data.annotation.Id;
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

    private String email;

    private String password;

    /** Allowed values: USER, VET, ADMIN */
    private String role;

    // Gamification and progress fields
    @Builder.Default
    private int xp = 40;

    @Builder.Default
    private int level = 1;

    // State of the 8 daily missions (true = completed, false = not completed)
    private java.util.List<Boolean> missionsState;
}