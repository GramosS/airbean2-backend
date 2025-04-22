
### 1. Hämta menyn
**GET** `http://localhost:3000/menu`

Svar:
```json
{ "menu": [ { "id": 1, "title": "...", "price": 39 }, ... ] }
```

---

### 2. Skapa användare
**POST** `http://localhost:3000/users`

Body:
```json
{
  "username": "airbean",
  "password": "gramos123"
}

Svar:
```json
{ "userId": "xyz123" }
```

---

### 3. Logga in
**POST** `http://localhost:3000/users/login`

Body:
```json
{
  "username": "airbean",
  "password": "gramos123"
}
```

Svar:
```json
{ "userId": "xyz123", "isLoggedIn": true }
```

---

### 4. Skicka en order
**POST** `http://localhost:3000/orders`

Body:
```json
{
  "userId": "xyz123",
  "items": [
    { "id": 1, "price": 39 },
    { "id": 3, "price": 49 }
  ]
}
```

Svar:
```json
{
  "message": "Order bekräftad!",
  "eta": "15 minuter",
  "order": {
    "id": "abc456",
    "total": 88
  }
}
```

---

### 5. Hämta orderhistorik
**GET** `http://localhost:3000/orders/"sjndsjdn"`

Svar:
```json
{
  "userId": "xyz123",
  "totalOrders": 2,
  "orders": [
    {
      "id": "abc456",
      "total": 88,
      "items": [...],
      "createdAt": "..."
    }
  ]
}
```

## Validering
Alla inkommande requests valideras i middleware. Felaktiga `userId`, ogiltiga produkter eller fel priser returnerar 400-fel med tydliga felmeddelanden.

## Databas
- `users.db` – användare
- `orders.db` – beställningar
- `menu.json` – produktmeny

## Starta servern
```bash
npm install
node app.js
```

Servern körs på:  
**http://localhost:3000**
