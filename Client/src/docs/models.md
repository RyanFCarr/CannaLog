# Models
This document details the various conventions used within the client-side models and how those conventions support the development process.

## File location
Each model is contained within the */Client/src/models* folder. Each file contains multiple versions of the model to be used for the different purposes listed below.

## View models
Most models will have at least a View model and they should be exported by default. These models are used for displaying data to the screen and should be seen as independant of any server-side model or database implementation. They should be structured in such a way as to best serve the needs of the client-side code.

## DTO models
Domain Transfer Object models are the primary way data is sent to and received from the server. They act as a data contract and should be changed sparingly with the understanding that any changes could be far reaching with a major impact.

### Mapping DTOs
Because of their differing roles, it may often be useful to transform DTOs into View models and vice versa. Each model, if necessary, should include a static function which is able to create an instance of itself from the other model. For example, a `PlantDTO` would contain a function: 
```typescript
fromModel(model: Plant): PlantDTO
```
The `Plant` model could also contain a mirror function:
```typescript
fromDTO(dto: PlantDTO): Plant
```