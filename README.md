# Advanced Architecture Learning

This repository serves as a practical exploration of advanced architectural patterns in NestJS applications, inspired by the official NestJS advanced design and architecture course. It delves into concepts such as Domain-Driven Design (DDD), Hexagonal Architecture, CQRS, and Event-Driven Design, providing hands-on examples and implementations.

## 🚀 Overview

The project is structured to incrementally introduce and implement various architectural patterns, aiming to enhance the scalability, maintainability, and testability of backend applications.

## 🧱 Architectural Patterns Covered

- **Layered (N-Tier) Architecture** – Separation of concerns across different layers.
- **Hexagonal Architecture (Ports and Adapters)** – Decoupling the core logic from external systems.
- **Onion Architecture** – Emphasis on the core domain and its interactions.
- **Domain-Driven Design (DDD)** – Modeling the domain with rich domain models.
- **Command Query Responsibility Segregation (CQRS)** – Separating read and write operations.
- **Event-Driven Architecture** – Reacting to events for better scalability.
- **Event Sourcing** – Persisting state changes as a sequence of events.

## 📁 Project Structure

```bash
advanced-architecture-learning/
├── src/                 # Application source code
│   ├── domain/          # Domain models and interfaces
│   ├── application/     # Application services and use cases
│   ├── infrastructure/  # External services and data access
│   └── main.ts          # Application entry point
├── test/                # Test cases
├── scripts/             # Utility scripts
├── docker-compose.yml   # Docker configuration
├── package.json         # Project metadata and dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

## 💥Installation
```bash
# Clone the repository
git clone https://github.com/mohammadrezaNedaei/advanced-architecture-learning.git
cd advanced-architecture-learning
```
# Install dependencies
```bash
npm install
```
# Running the Application
```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```
# Running with Docker
```bash
# Build and run the containers
docker-compose up --build
```
# 🤝 Contributing
I wrote some notes that might be useful for learning about the architectural concepts implemented in this project.

# 📄notes
i wrote some notes that could be useful to learn about these concepts of architectures that i code here<br />
[notes file on Google Docs](https://docs.google.com/document/d/1x8Q8GXKEGW9rbth2NsJgMH3P-zQM5T8Rp_fekFnPv24/edit?usp=sharing)


This project is licensed under the MIT License.
