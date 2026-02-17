# ========== BUILD STAGE ==========
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Copia solo i file necessari per le dipendenze (cache layer)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Rendi eseguibile mvnw e scarica dipendenze (cached se pom.xml non cambia)
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copia il codice sorgente
COPY src src

# Build dell'applicazione (skip test per velocità, li eseguiamo in CI)
RUN ./mvnw package -DskipTests -B

# ========== RUNTIME STAGE ==========
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

# Sicurezza: crea utente non-root
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Copia solo il JAR dalla build stage
COPY --from=builder /app/target/*.jar app.jar

# Cambia ownership
RUN chown -R appuser:appgroup /app
USER appuser

# Health check per verificare che l'app sia attiva
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/hackathons || exit 1

EXPOSE 8080

# Configurazione JVM per container
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
