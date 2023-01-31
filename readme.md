# REST API for my Portfolio !

## Stack

- Bun (JS Runtime)
- Typescript
- Hono ("Ultrafast web framework", it is)
- PostgreSQL

## Routes

### Get all projects
```
GET /projects/
```

### Create a project
```
POST /projects/
```

- /!\ With body :

```json
{
    "name": "Stocknet",
    "type": "dev",
    "desc": "Projet de test",
    "year": "2023",
    "role": "ouais",
    "image": "https://picsum.photos/500/600",
    "isFreelance": false,
    "isFeatured": true,
    "url": "https://github.com/evanosm"
}
```

### Delete a project
```
DELETE /projects/:id
```

### Update a project
```
PUT /projects/:id
```
> NB : no need to include all fields in this update request as we fetch the project to update and fill missing fields with its current values ! 🥳
