Relazione del Progetto HackHub-AWMC
1. Panoramica del Progetto

Il progetto HackHub è un'applicazione web full-stack progettata per la gestione e la partecipazione a hackathon.
Il progetto mira a fornire una piattaforma per la gestione di hackathon costruita su tecnologie moderne e scalabili. L'architettura è divisa in due componenti principali:
HackhubBack: Il server backend che espone le API, gestisce la logica di business e comunica con il database.
HackhubFront: Il frontend dell'applicazione che gestisce l'esperienza utente e si interfaccia dinamicamente con la logica di business del server tramite chiamate API.


2.1 Backend (HackhubBack)  
Il backend è sviluppato in Java e si basa sul framework Spring Boot, offrendo una struttura robusta, è responsabile della gestione dei dati, della logica di business e della sicurezza delle API.
Stack Tecnologico:
Linguaggio: Java 21.
Framework: Spring Boot 4.0.2 
Gestione Dati (ORM): Spring Data JPA (Hibernate) per l'astrazione delle interazioni con il database.
Database: PostgreSQL (utilizzato tramite Docker).
Sicurezza:
Spring Security: Per la gestione dell'autenticazione e autorizzazione.
JWT (JSON Web Token): Implementato tramite la libreria jjwt (version 0.11.5) per gestire sessioni stateless sicure.
Containerizzazione: Docker e Docker Compose sono utilizzati per orchestrare il servizio backend e il database PostgreSQL, facilitando il setup dell'ambiente di sviluppo.
Architettura
Il backend segue un’architettura a livelli(Layered):
Config: Contiene le classi di configurazione Spring.


Controller: Contiene i controller che espongono le API REST ai client (il frontend Angular).


DTO (Data Transfer Object): Contiene oggetti usati per trasferire dati tra client e server, disaccoppiandoli dalle entità.


Entity:Contiene le classi che mappano le tabelle del database (tramite JPA/Hibernate con l'annotazione @Entity).


Repository: Contiene le interfacce che estendono JpaRepository per le operazioni CRUD sul database.


service: Contiene i servizi con la logica applicativa, che fanno da intermediari tra controller e repository.


securitiJWT: Contiene la logica per l'autenticazione tramite JSON Web Token.


Configurazione e Build:
Il progetto utilizza Maven come strumento di build e gestione delle dipendenze (pom.xml).
La configurazione dell'ambiente è gestita tramite variabili d'ambiente (file .env), una best practice per la sicurezza (es. per segreti JWT e credenziali DB).


Sicurezza:
La sicurezza è configurata in SecurityConfig.java con le seguenti politiche:
Sessione: Stateless (senza stato), ideale per architetture RESTful con JWT.
Hashing Password: Utilizzo di BCryptPasswordEncoder per la cifratura delle password.


Endpoint Accessibili:
L'endpoint /api/login è pubblico (permittedAll).
Gli endpoint GET sotto /api/hackathons/** sono accessibili a tutti (lettura pubblica degli eventi).
Tutte le altre richieste richiedono autenticazione tramite il filtro JWT (JwtAuthTokenFilter).


2.2 Frontend (HackhubFront)

Il frontend è una Single Page Application (SPA) moderna costruita con Angular.
Stack Tecnologico:
Framework: Angular (versione 20.3.0) (in linea con gli standard di sviluppo web più attuali) framework completo con TypeScript come linguaggio primario
Linguaggi: TypeScript che garantisce tipizzazione statica e manutenibilità del codice, HTML è usato per strutturare i componenti visivi e struttura, viene arricchito con SCSS con stili modulari e riutilizzabili, ottenendo un’interfaccia utente reattiva e scalabile.
Stili: SCSS (Sass) per la gestione avanzata dei fogli di stile.
Libreria UI: Bootstrap 5.3.8 è integrato per fornire componenti responsive.
Configurazione e Build:
Il progetto è generato e gestito tramite Angular CLI.
È presente una configurazione di proxy (proxy.conf.json) per reindirizzare le chiamate API verso http://localhost:8080 durante lo sviluppo, evitando problemi di CORS tra frontend (porta 4200) e backend.
Architettura
Il codice è suddiviso in tre macro-aree logiche:
Core: rappresenta il "cervello" dell'applicazione. Qui risiede tutta la logica non visiva, come i Services per la comunicazione con il backend, i Models per definire la struttura dei dati, le Guards per la protezione delle rotte e gli Interceptors per la gestione automatica dei token di sicurezza.


Features: contiene le pagine vere e proprie della piattaforma, organizzate per funzionalità. Qui troviamo i componenti specifici per la Home, l'Autenticazione (Login/Registrazione), la gestione degli Hackathon e la Dashboard utente.


Shared: raccoglie tutti gli elementi riutilizzabili dell'interfaccia. In questa sezione sono definiti i componenti grafici comuni (come Navbar, Footer).


Gestione sicurezza 
Per garantire la sicurezza e la scalabilità della piattaforma, è stato implementato un sistema di autenticazione stateless basato sullo standard JWT (JSON Web Token). Questa architettura permette di gestire le sessioni utente in modo sicuro e disaccoppiato, utilizzando il token come chiave d'accesso per le risorse protette. Lato frontend, la gestione del token e la protezione delle rotte sono state orchestrate attraverso i seguenti componenti Angular:

1.Service: Gestisce il login chiamando l'API /api/login e il logout rimuovendo il token dal localStorage.

2.Guards: Protegge le rotte private (es. dashboard). Se non trova il token nel localStorage, blocca l'accesso e reindirizza al login.

3.Interceptors: Intercetta automaticamente tutte le chiamate HTTP (eccetto il login) e inserisce l'header Authorization: Bearer <token>, garantendo comunicazioni autenticate senza codice ripetitivo.

4.Models: Le interfacce (es. Hackathon) tipizzano i dati. I service trasformano i dati grezzi del backend in modelli frontend.

3. Comunicazione Frontend - Backend

La comunicazione tra frontend e backend è basata su API RESTful. Il frontend invia richieste HTTP (GET, POST, PUT, DELETE) al backend, il quale elabora i dati e restituisce JSON .

4. Conclusioni

Il progetto presenta una struttura solida e moderna. L'uso di Spring Boot con JWT per il backend garantisce scalabilità e sicurezza, mentre l'uso di Angular con rotte protette per il frontend offre un'esperienza utente fluida e sicura.

