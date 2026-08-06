package com.agriverse1.agriverse1.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * JPA entity representing a platform user (Farmer / Vet / Admin).
 * Lombok @Data generates all getters, setters, equals, hashCode & toString.
 * @Builder enables clean object construction in UserService.
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    /** Allowed values: USER, VET, ADMIN */
    @Column(nullable = false)
    private String role;
}