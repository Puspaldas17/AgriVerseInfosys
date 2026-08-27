package com.agriverse1.agriverse1.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

import java.util.concurrent.TimeUnit;

/**
 * MongoDB Atlas connection configuration.
 *
 * Key fix: serverSelectionTimeout set to 5s so if Atlas is unreachable
 * at startup, the AdminSeeder fails fast (5s × 4 ops = 20s max) rather
 * than hanging for minutes. Runtime queries also use this timeout.
 *
 * TLS/SSL is handled automatically by the mongodb+srv:// URI — do NOT
 * manually call .applyToSslSettings() as it causes Connection reset errors.
 */
@Configuration
public class MongoConfig {

    @Value("${spring.data.mongodb.uri}")
    private String connectionUri;

    @Bean
    public MongoClient mongoClient() {
        ConnectionString connectionString = new ConnectionString(connectionUri);

        MongoClientSettings settings = MongoClientSettings.builder()
                // Let the mongodb+srv:// URI configure TLS automatically
                .applyConnectionString(connectionString)
                // Fail fast if Atlas unreachable (5s vs default 30s)
                .applyToClusterSettings(builder -> builder
                        .serverSelectionTimeout(5, TimeUnit.SECONDS))
                // Connection pool tuning
                .applyToConnectionPoolSettings(builder -> builder
                        .maxConnectionIdleTime(60, TimeUnit.SECONDS)
                        .minSize(1)
                        .maxSize(20)
                        .maxWaitTime(10, TimeUnit.SECONDS))
                // Socket-level timeouts
                .applyToSocketSettings(builder -> builder
                        .connectTimeout(10, TimeUnit.SECONDS)
                        .readTimeout(30, TimeUnit.SECONDS))
                .build();

        return MongoClients.create(settings);
    }

    @Bean
    public MongoDatabaseFactory mongoDatabaseFactory(MongoClient mongoClient) {
        return new SimpleMongoClientDatabaseFactory(mongoClient, "agriverse1");
    }

    @Bean
    public MongoTemplate mongoTemplate(MongoDatabaseFactory mongoDatabaseFactory) {
        return new MongoTemplate(mongoDatabaseFactory);
    }
}
