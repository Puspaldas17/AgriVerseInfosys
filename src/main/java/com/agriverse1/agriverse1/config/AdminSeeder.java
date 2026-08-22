package com.agriverse1.agriverse1.config;

import com.agriverse1.agriverse1.entity.User;
import com.agriverse1.agriverse1.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminSeeder {

    @Bean
    public CommandLineRunner seedAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            com.agriverse1.agriverse1.repository.MarketplaceListingRepository listingRepository,
            com.agriverse1.agriverse1.repository.DisputeRepository disputeRepository) {
        return args -> {
            String adminEmail = "admin@agriverse.in";
            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                User admin = User.builder()
                        .name("Administrator")
                        .email(adminEmail)
                        .password(passwordEncoder.encode("admin123")) // Default password
                        .role("ADMIN")
                        .build();
                userRepository.save(admin);
                System.out.println("[AgriVerse] Default admin created: " + adminEmail);
            }

            // Seed Mock Listings if empty
            if (listingRepository.count() == 0) {
                listingRepository.save(com.agriverse1.agriverse1.entity.MarketplaceListing.builder()
                        .farmerId("f1")
                        .farmerName("Ravi Kumar")
                        .title("Organic Tomatoes (100kg)")
                        .description("Freshly harvested organic tomatoes from North Plot.")
                        .price(2500.0)
                        .quantity(100.0)
                        .unit("kg")
                        .category("Crop")
                        .status("PENDING")
                        .build());
                
                listingRepository.save(com.agriverse1.agriverse1.entity.MarketplaceListing.builder()
                        .farmerId("f2")
                        .farmerName("Sneha Rao")
                        .title("Used Tractor - Massey Ferguson")
                        .description("2018 model, good condition.")
                        .price(350000.0)
                        .quantity(1.0)
                        .unit("piece")
                        .category("Equipment")
                        .status("APPROVED")
                        .build());

                listingRepository.save(com.agriverse1.agriverse1.entity.MarketplaceListing.builder()
                        .farmerId("f3")
                        .farmerName("Lakshmi Narayana")
                        .title("Premium Urea Fertilizer")
                        .description("Surplus from last season. Sealed bags.")
                        .price(800.0)
                        .quantity(5.0)
                        .unit("bags")
                        .category("Fertilizer")
                        .status("REJECTED")
                        .build());
                System.out.println("[AgriVerse] Seeded mock marketplace listings.");
            }

            // Seed Mock Disputes if empty
            if (disputeRepository.count() == 0) {
                disputeRepository.save(com.agriverse1.agriverse1.entity.Dispute.builder()
                        .listingId("L-101")
                        .buyerId("b1")
                        .buyerName("Amit Singh")
                        .sellerId("f1")
                        .sellerName("Ravi Kumar")
                        .reason("Tomatoes arrived spoiled due to poor packaging.")
                        .status("OPEN")
                        .build());
                
                disputeRepository.save(com.agriverse1.agriverse1.entity.Dispute.builder()
                        .listingId("L-102")
                        .buyerId("b2")
                        .buyerName("Priya Sharma")
                        .sellerId("f2")
                        .sellerName("Sneha Rao")
                        .reason("Tractor battery was completely dead on delivery.")
                        .status("RESOLVED")
                        .build());

                System.out.println("[AgriVerse] Seeded mock disputes.");
            }
        };
    }
}
