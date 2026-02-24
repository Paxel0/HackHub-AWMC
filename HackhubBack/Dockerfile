FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Copia solo i file necessari per le dipendenze (cache layer)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Rendi eseguibile mvnw e scarica dipendenze
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copia il codice sorgente
COPY src src

# Build dell'applicazione
RUN ./mvnw package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

# Sicurezza: creazione di un utente non privilegiato per limitare l'accesso a terze parti
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Copia solo il JAR (in /app/target)
COPY --from=builder /app/target/*.jar app.jar

# Sicurezza: assicurarsi che l'app sia di proprietà dell'utente non privilegiato
RUN chown -R appuser:appgroup /app
USER appuser

# Health check per verificare che l'app sia attiva
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/hackathons || exit 1

EXPOSE 8080

# Configurazione JVM per container
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
