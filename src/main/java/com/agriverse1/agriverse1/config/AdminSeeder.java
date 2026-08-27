package com.agriverse1.agriverse1.config;

import com.agriverse1.agriverse1.entity.User;
import com.agriverse1.agriverse1.repository.CropCalendarRepository;
import com.agriverse1.agriverse1.repository.DisputeRepository;
import com.agriverse1.agriverse1.repository.MarketplaceListingRepository;
import com.agriverse1.agriverse1.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Seeds essential data into MongoDB on every startup.
 * Wrapped in try-catch so a transient MongoDB connection blip
 * does NOT crash the whole application — the server stays up.
 */
@Configuration
public class AdminSeeder {

    private static final Logger log = LoggerFactory.getLogger(AdminSeeder.class);

    @Bean
    public CommandLineRunner seedAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            MarketplaceListingRepository listingRepository,
            DisputeRepository disputeRepository,
            CropCalendarRepository cropCalendarRepository) {

        return args -> {
            try {
                seedAdminUser(userRepository, passwordEncoder);
            } catch (Exception e) {
                log.warn("[AgriVerse] Could not seed admin user (MongoDB may be slow to connect): {}", e.getMessage());
            }

            try {
                seedMarketplace(listingRepository);
            } catch (Exception e) {
                log.warn("[AgriVerse] Could not seed marketplace listings: {}", e.getMessage());
            }

            try {
                seedDisputes(disputeRepository);
            } catch (Exception e) {
                log.warn("[AgriVerse] Could not seed disputes: {}", e.getMessage());
            }

            try {
                seedCropCalendar(cropCalendarRepository);
            } catch (Exception e) {
                log.warn("[AgriVerse] Could not seed crop calendar: {}", e.getMessage());
            }
        };
    }

    // ─────────────────────────────────────────────────────────────
    //  ADMIN USER
    // ─────────────────────────────────────────────────────────────
    private void seedAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        String adminEmail = "admin@agriverse.in";
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            User admin = User.builder()
                    .name("Administrator")
                    .email(adminEmail)
                    .password(passwordEncoder.encode("admin123"))
                    .role("ADMIN")
                    .build();
            userRepository.save(admin);
            log.info("[AgriVerse] Default admin created: {}", adminEmail);
        }
    }

    // ─────────────────────────────────────────────────────────────
    //  MARKETPLACE LISTINGS
    // ─────────────────────────────────────────────────────────────
    private void seedMarketplace(MarketplaceListingRepository repo) {
        boolean hasApproved = !repo.findByStatus("APPROVED").isEmpty();
        if (hasApproved) return;

        repo.deleteAll(); // clear stale data

        repo.save(com.agriverse1.agriverse1.entity.MarketplaceListing.builder()
                .farmerId("f1").farmerName("Ravi Kumar")
                .title("Organic Tomatoes")
                .description("[Organic] Freshly harvested organic tomatoes from North Plot.")
                .price(30.0).quantity(500.0).unit("kg").category("Vegetable").status("APPROVED").build());

        repo.save(com.agriverse1.agriverse1.entity.MarketplaceListing.builder()
                .farmerId("f2").farmerName("Sneha Rao")
                .title("Wheat (Lokwan)")
                .description("[Organic] Premium quality Lokwan wheat, 2025 harvest batch.")
                .price(2800.0).quantity(100.0).unit("quintal").category("Grain").status("APPROVED").build());

        repo.save(com.agriverse1.agriverse1.entity.MarketplaceListing.builder()
                .farmerId("f3").farmerName("Lakshmi Narayana")
                .title("Alphonso Mangoes")
                .description("[Organic] Sweet GI-tagged Alphonso mangoes from Ratnagiri.")
                .price(800.0).quantity(50.0).unit("dozen").category("Fruit").status("APPROVED").build());

        repo.save(com.agriverse1.agriverse1.entity.MarketplaceListing.builder()
                .farmerId("f4").farmerName("Murugan Traders")
                .title("Turmeric (Raw)")
                .description("High curcumin raw turmeric rhizomes from Erode, Tamil Nadu.")
                .price(7500.0).quantity(15.0).unit("quintal").category("Spice").status("APPROVED").build());

        repo.save(com.agriverse1.agriverse1.entity.MarketplaceListing.builder()
                .farmerId("f5").farmerName("Gurpreet Farms")
                .title("Basmati Rice")
                .description("[Organic] Long-grain aromatic Basmati from Amritsar region.")
                .price(6000.0).quantity(50.0).unit("quintal").category("Grain").status("APPROVED").build());

        repo.save(com.agriverse1.agriverse1.entity.MarketplaceListing.builder()
                .farmerId("f6").farmerName("K Traders")
                .title("Toor Dal")
                .description("Premium quality Toor Dal directly from Gulbarga farms.")
                .price(9500.0).quantity(40.0).unit("quintal").category("Pulse").status("APPROVED").build());

        log.info("[AgriVerse] Seeded 6 APPROVED marketplace listings.");
    }

    // ─────────────────────────────────────────────────────────────
    //  DISPUTES
    // ─────────────────────────────────────────────────────────────
    private void seedDisputes(DisputeRepository repo) {
        if (repo.count() != 0) return;

        repo.save(com.agriverse1.agriverse1.entity.Dispute.builder()
                .listingId("L-101").buyerId("b1").buyerName("Amit Singh")
                .sellerId("f1").sellerName("Ravi Kumar")
                .reason("Tomatoes arrived spoiled due to poor packaging.")
                .status("OPEN").build());

        repo.save(com.agriverse1.agriverse1.entity.Dispute.builder()
                .listingId("L-102").buyerId("b2").buyerName("Priya Sharma")
                .sellerId("f2").sellerName("Sneha Rao")
                .reason("Item was not as described.")
                .status("RESOLVED").build());

        log.info("[AgriVerse] Seeded 2 disputes.");
    }

    // ─────────────────────────────────────────────────────────────
    //  CROP CALENDAR
    // ─────────────────────────────────────────────────────────────
    private void seedCropCalendar(CropCalendarRepository repo) {
        if (repo.count() != 0) return;

        repo.save(com.agriverse1.agriverse1.entity.CropCalendar.builder()
                .cropName("Paddy (Rice)").season("Kharif")
                .sowingStartMonth("June").sowingEndMonth("July")
                .harvestStartMonth("November").harvestEndMonth("December")
                .waterRequirement("High").soilType("Clay / Loam")
                .description("Paddy requires standing water for most of its growing period.")
                .build());

        repo.save(com.agriverse1.agriverse1.entity.CropCalendar.builder()
                .cropName("Wheat").season("Rabi")
                .sowingStartMonth("October").sowingEndMonth("November")
                .harvestStartMonth("March").harvestEndMonth("April")
                .waterRequirement("Medium").soilType("Loam / Clay Loam")
                .description("Wheat is a staple winter crop needing cool weather during early growth.")
                .build());

        repo.save(com.agriverse1.agriverse1.entity.CropCalendar.builder()
                .cropName("Tomato").season("Zaid / All-Season")
                .sowingStartMonth("January").sowingEndMonth("February")
                .harvestStartMonth("April").harvestEndMonth("June")
                .waterRequirement("Medium").soilType("Sandy Loam")
                .description("Tomatoes need well-drained soil and regular irrigation without waterlogging.")
                .build());

        repo.save(com.agriverse1.agriverse1.entity.CropCalendar.builder()
                .cropName("Pearl Millet (Bajra)").season("Kharif")
                .sowingStartMonth("June").sowingEndMonth("July")
                .harvestStartMonth("September").harvestEndMonth("October")
                .waterRequirement("Low").soilType("Sandy")
                .description("Bajra is a hardy crop that tolerates drought and poor soil conditions well.")
                .build());

        log.info("[AgriVerse] Seeded 4 crop calendar entries.");
    }
}
