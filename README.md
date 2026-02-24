# **Relazione progetto HackHub-AWMC** # 

HackHub è una piattaforma full-stack progettata per la gestione e la partecipazione agli hackathon. L'applicazione permette agli utenti di iscriversi e gestire le competizioni in modo centralizzato.


**Funzionalità Principali**


• **Gestione Hackathon**: visualizzazione e partecipazione agli eventi.

• **Autenticazione Utenti**: Sistema sicuro basato su JWT (JSON Web Token).

• **Partecipazione**: Gli utenti possono iscriversi agli hackathon disponibili.

• **Architettura Moderna**: Separazione netta tra Frontend (SPA) e Backend (API REST).



**Architettura del Sistema**


Il progetto adotta un approccio Cloud-Native, containerizzato e orchestrato, pronto per il deployment su AWS. Il sistema segue un'architettura stateless a microservizi containerizzati gestita tramite Docker:

• **Frontend**: Angular (Single Page Application) servito tramite Nginx (presenti Typescript, SCSS, Bootstrap 5)

• **Backend**: Spring Boot (Java 21) che espone API REST, Spring Security, JPA, JWT Authentication.

• **Database**: PostgreSQL 15, Relazionale, persistenza dati affidabile.

• **Container**: Docker per Containerizzazione di tutti i servizi (è stato realizzato un container per Frontend, Backend, Database ).

• **Orchestratore**: Kubernetes (K8s) / ECS per la gestione dei pod e scaling (orizzontale)

• **Cloud Provider**: AWS, Hosting tramite EC2

• **Pipeline CI/CD**: GitHub Actions,  Pipeline automatizzata di Build, Test e Push su Docker Hub.


**Scelte Progettuali**

• **BACKEND LAYERED ARCHITECTURE**: 

Il codice Java è strutturato in livelli logici per garantire manutenibilità, separazione delle responsabilità e testabilità.

➢ **Controller**: Gestione delle richieste HTTP.

➢ **Service**: Logica di business.

➢ **Repository**: Accesso ai dati (Spring Data JPA).

➢ **Entity**: Mappatura ORM del database.

➢ **Security**: Configurazione Spring Security e filtri JWT.


• **STATELESS AUTHENTICATION: SICUREZZA (JWT)**

Per garantire la sicurezza e la scalabilità della piattaforma, è stato implementato un sistema di autenticazione stateless basato sullo standard JWT (JSON Web Token). Questa architettura permette di gestire le sessioni utente in modo sicuro e disaccoppiato, utilizzando il token come chiave d'accesso per le risorse protette. 


• **FRONTEND: ANGULAR & NGINX**


➢ **Angular**: Framework frontend utilizzato per sviluppare l’interfaccia utente come Single Page Application (SPA), con gestione delle rotte, componenti e servizi.

➢ **Nginx**: Web server utilizzato in produzione per servire i file statici generati dalla build Angular (cartella dist/), garantendo alte performance e gestione efficiente delle richieste HTTP.

La struttura logica del frontend è organizzata nel seguente modo:

➢ **Service**: Servizi Angular che gestiscono la comunicazione HTTP con il backend Spring Boot.

➢ **Guards**: Protegge le rotte private

➢ **Interceptors**: Gestiscono automaticamente l’autenticazione delle richieste HTTP, aggiungendo il token a ogni chiamata in modo centralizzato e trasparente.

➢ **Models**: Definiscono la struttura e la tipizzazione dei dati utilizzati nel frontend.



• **CONTAINERIZZAZIONE (DOCKER)**


L'intera applicazione è containerizzata per garantire la portabilità tra sviluppo (locale) e produzione (AWS Cloud). Abbiamo adottato le seguenti strategie:

• **Immagini Leggere (Alpine Linux)**: Utilizziamo immagini base alpine (sia per JDK che per Nginx) per ridurre drasticamente la dimensione dei container e la superficie di attacco.

• **Multi-stage Build**: Per il Frontend il Dockerfile utilizza due stadi:

  ➢ Build Stage: Un'immagine Node.js compila l'applicazione Angular.
  
  ➢ Run Stage: I soli file compilati (dist/) vengono copiati in un'immagine Nginx pura, scartando tutto il codice sorgente e le dipendenze di sviluppo (node_modules).
  
• **Isolamento**: Ogni microservizio (Frontend, Backend, Database) gira nel proprio ambiente isolato, con le proprie dipendenze specifiche, eliminando i conflitti di versione.



• **ORCHESTRAZIONE (KUBERNETES)**


Per la gestione dei container abbiamo scelto K3s, una distribuzione certificata di Kubernetes leggera e ottimizzata per il risparmio di risorse. L'infrastruttura è ospitata su un'istanza AWS EC2 e gestita tramite:


➢ **Configurazione dichiarativa**: L'infrastruttura è definita tramite manifest YAML (cartella k8s/), garantendo riproducibilità (Infrastructure as Code).

➢ **Service Discovery**: Il Frontend comunica con il Backend tramite nomi di servizio interni (es. http://backend:8080), astraendo gli indirizzi IP dei pod.

➢ **Automazione (GitOps)**: Il deploy è automatizzato tramite GitHub Actions, che installa e aggiorna K3s e pod a ogni push.

➢ **Gestione Secrets**: Le credenziali (DB password, JWT secret) sono gestite tramite oggetti Secret di Kubernetes, evitando di scriverle nel codice sorgente.



• **PIPELINE CI/CD**


Il ciclo di vita del software è automatizzato tramite una pipeline di Continuous Integration e Continuous Deployment, articolata in quattro fasi principali:

➢ **Build & Test Backend**: Compilazione del codice Java con Maven ed esecuzione dei test unitari e di integrazione. Per i test, la pipeline solleva un'istanza dedicata di PostgreSQL in un container temporaneo.

➢ **Build & Test Frontend**: Installazione delle dipendenze Node.js, esecuzione dei test unitari Angular (Karma/Jasmine) e generazione della build di produzione.

➢ **Dockerizzazione**: Costruzione delle immagini Docker per frontend e backend e pubblicazione su GitHub Container Registry (GHCR). Le immagini vengono taggate con l'ID univoco del commit per garantire la tracciabilità.

➢ **Continuous Deployment (CD)**: In caso di push sul branch main, la pipeline si connette via SSH al server AWS EC2, aggiorna i manifest Kubernetes e attiva un rollout restart del cluster K3s, garantendo che l'ultima versione dell'app sia immediatamente online senza interventi manuali.


• **CONFIGURAZIONE AWS EC2**


L'applicazione è ospitata su un'istanza Amazon EC2, configurata come nodo singolo per il cluster K3s.

1. **Specifiche Hardware e OS**
 - Tipo di Istanza: t3.small
 - Risorse: 2 vCPU e 2 GiB di RAM, una configurazione scelta per garantire stabilità sia al cluster Kubernetes (K3s)
 - Sistema Operativo: Ubuntu

2. **Networking e Security Group (Firewall)**
L'istanza è protetta da un Security Group che implementa il principio del "minimo privilegio", aprendo solo le porte necessarie:
 - Porta 22 (SSH): Accesso limitato tramite chiave RSA per il deploy automatizzato da GitHub Actions.
 - Porta 80 (HTTP): Esposizione pubblica gestita dall'Ingress Controller (Traefik).
 - Porta 8080 (custom TCP):Aperta per permettere l'accesso diretto alle API del Backend durante le fasi di testing e integrazione, facilitando il debugging senza l'interposizione dei livelli di routing del cluster.

3. **Stack Software e Orchestrazione**
 - K3s (Lightweight Kubernetes): Installato come orchestratore principale, lasciando più spazio alle applicazioni utente.
 - Traefik Ingress: Gestisce il routing del traffico in ingresso, agendo come punto di ingresso unico per le richieste HTTP.
 - PostgreSQL: Eseguito come Pod all'interno del cluster con storage persistente (PersistentVolumeClaim) per garantire la durabilità dei dati.

4. **Ottimizzazione e Gestione della Memoria**
Nonostante i 2GB di RAM della t3.small, il progetto adotta strategie di ottimizzazione avanzate per evitare saturazioni:
 - JVM Tuning: Il backend Spring Boot è configurato con limiti espliciti sulla memoria heap (-Xmx512m -Xms256m).
 - Pipeline "Chirurgica": Il workflow di CD include uno step di Emergency Cleanup prima di ogni deploy. Questo comando SSH pulisce preventivamente i residui di build precedenti e le immagini Docker orfane, assicurando che il rollout dei nuovi Pod avvenga sempre in un ambiente pulito e con RAM disponibile.


**Istruzioni di Build e Run (From Scratch)**


Istruzioni per avviare il progetto HackHub in due modalità:
1.  Locale con Docker (Test rapidi).
2.  Cloud AWS (Deployment in produzione con Kubernetes).

**Prerequisiti**

Installare gli strumenti necessari:

• **Git**: Per il versionamento e copiare il repository.
• **Docker Desktop**: Per eseguire i container con Docker Compose v2 abilitato.

**Configurazione Iniziale (Obbligatoria)**
Esegui questi passaggi una sola volta appena scaricato il progetto.

**Setup iniziale**

Apri il terminale e per clonare il repository lancia: 
➢ git clone https://github.com/Paxel0/HackHub-AWMC.git
➢ cd HackHub-AWMC

**Configurazione variabili d’ambiente**
Crea il file .env partendo dall'esempio fornito. Questo file conterrà le credenziali del database e i secret JWT. 
Incolla:
DB_NAME=nome_db
DB_USERNAME=username
DB_PASSWORD=password
HACKHUB_APP_JWTSECRETBASE64=’Stringa accettabile’
SPRING_PROFILE=prod

**Avvio con Docker Compose**

Il metodo più rapido per avviare l'intera applicazione è utilizzare Docker Compose, questo metodo avvia l'intero stack (Frontend + Backend + Database) in container isolati.
➢ docker-compose up --build -d
Controlla che i tre container siano attivi (Status: Up) scrivendo sul terminale
➢ docker-compose ps
Una volta terminato il processo di build:
    Frontend: http://localhost
Per spegnere tutto e rimuovere i container:
➢ docker-compose down

**Deployment AWS (Automatizzato via Pipeline)**
Il progetto è configurato con Continuous Deployment (CD). Non è necessario eseguire comandi manuali per il deploy: ogni modifica inviata al branch main viene automaticamente costruita, testata e rilasciata sul cluster AWS.
• Come accedere da Online
Una volta che la pipeline di GitHub ha finito il deploy (segno di spunta verde su "Actions"), l'applicazione è accessibile da chiunque su internet.
**L'indirizzo IP/DNS**: *http://3.93.185.107*
➢ Apri il Browser→ Incolla l'indirizzo nella barra degli indirizzi del browser. 
     L’app  è funzionante nel browser
     
   
• **Diagramma di Architettura & Deployment**

Il diagramma mostra il funzionamento di un’applicazione web containerizzata composta da frontend, backend e database.

<img width="300" height="600" alt="Kubernetes Container-2026-02-24-104409" src="https://github.com/user-attachments/assets/efbfc2f9-3c35-47b3-ac16-ad754002d71d" />

**Flusso principale:**
1. Utente → Frontend
L’utente accede tramite browser e invia una    richiesta HTTP.
La richiesta arriva a un container frontend con Nginx, che serve i file statici dell’applicazione Angular (SPA).

2. Frontend → Backend
L’app Angular, eseguita nel browser, invia richieste REST API (JSON) al backend quando servono dati o operazioni.

3. Sicurezza
Le richieste passano attraverso Spring Security, che verifica l’autenticazione tramite JWT.

4. Backend → Database
Se la richiesta è valida, la Spring Boot application elabora la logica.
Usa JPA/Hibernate per leggere o scrivere dati nel database PostgreSQL 15.

5. Risposta
Il database restituisce i dati al backend.
Il backend invia la risposta al frontend.
Il frontend aggiorna l’interfaccia utente.








Il diagramma mostra il funzionamento della pipeline CI/CD e del deployment su AWS EKS di un’applicazione containerizzata composta da frontend, backend e database.
<img width="8192" height="2056" alt="CI_CD Pipeline for AWS EKS-2026-02-24-103649" src="https://github.com/user-attachments/assets/18c5746d-eae4-4cd4-9d30-bdf413a3734d" />

**Flusso principale:**
1. Developer → GitHub
Lo sviluppatore scrive il codice e lo invia (push) al repository GitHub.
Questo aggiornamento attiva automaticamente la pipeline CI/CD.

2. CI/CD Pipeline → Build e pubblicazione immagini
GitHub Actions esegue il processo di build e test dell’applicazione.
Vengono create le immagini Docker del frontend e del backend.
Le immagini vengono poi pubblicate su un registry, come Docker Hub o Amazon ECR.

3. Registry → Cluster AWS EKS
Il cluster Kubernetes su AWS (Amazon EKS) scarica (pull) le immagini Docker dal registry.
Vengono creati i pod per eseguire l’applicazione:
Frontend Pods (repliche multiple per scalabilità)
Backend Pods (repliche multiple per scalabilità)

4. Utente → Load Balancer → Pod
L’utente accede all’applicazione tramite Internet.
La richiesta arriva all’AWS Load Balancer.
Il Load Balancer instrada il traffico:  verso i pod frontend per l’interfaccia utente o verso i pod backend per le richieste API (/api)

5. Backend → Database
I pod backend elaborano la logica applicativa.
Quando necessario, accedono al database PostgreSQL ospitato su Amazon RDS per leggere o salvare i dati.

6. Risposta
Il database restituisce i dati al backend.
Il backend invia la risposta al frontend.
Il frontend restituisce il risultato all’utente tramite il browser.






• **Conclusioni**
HackHub-AWMC è un’applicazione full-stack moderna e scalabile, sviluppata con Java Spring Boot per il backend e Angular per il frontend.

➢ **Architettura**: Il codice presenta una struttura chiara e modulare, con una netta separazione tra frontend e backend. Questa organizzazione facilita la manutenzione, garantisce sicurezza e integra l’autenticazione tramite JWT.

➢ **Cloud e Kubernetes**: Il progetto è progettato per il cloud e pronto per il deployment in produzione, incluso il deploy tramite Kubernetes. L’applicazione è suddivisa in microservizi indipendenti — Frontend, Backend e Database — orchestrati tramite container, semplificando scalabilità e gestione in ambienti distribuiti.

➢ **Affidabilità e sicurezza**: L’utilizzo di volumi persistenti per il database e di Secret per la gestione delle credenziali offre un approccio solido per la sicurezza e la gestione dei dati in contesti distribuiti.
