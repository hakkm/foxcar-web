---
applyTo: '**'
---
# Car Rental Backend API Documentation

## Clients

### List all & search clients
**GET** `/clients`

**Query Parameters:**
- `search` (string, optional): Search in last_name, first_name, phone, email, id_document_number, driver_license_number
- `per_page` (integer, optional): Number of items per page (default: 10)
- `page` (integer, optional): Page number

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "last_name": "Doe",
      "first_name": "John",
      "phone": "+1234567890",
      "email": "john.doe@example.com",
      "address": "123 Main St, City, Country",
      "date_of_birth": "1990-01-15",
      "id_document_type": "passport",
      "id_document_number": "P123456789",
      "id_issue_date": "2020-01-01",
      "id_expiry_date": "2030-01-01",
      "nationality": "French",
      "driver_license_number": "DL123456789",
      "driver_license_issue_date": "2018-05-01",
      "other_driver": false,
      "created_at": "2024-01-01T10:00:00.000000Z",
      "updated_at": "2024-01-01T10:00:00.000000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "from": 1,
    "to": 1
  }
}
```

**Field Types:**
- `id`: integer
- `last_name`: string (required, 1-255 chars, name pattern)
- `first_name`: string (required, 1-255 chars, name pattern)
- `phone`: string (required, max 20 chars, international phone format)
- `email`: string (required, email format, unique)
- `address`: string (required, 3-255 chars)
- `date_of_birth`: string (required, YYYY-MM-DD format, minimum age validation)
- `id_document_type`: string (required, enum: "passport", "residence_permit", "drivers_license", "identity_card")
- `id_document_number`: string (required, max 20 chars, unique)
- `id_issue_date`: string (required, YYYY-MM-DD format)
- `id_expiry_date`: string (required, YYYY-MM-DD format, after issue date)
- `nationality`: string (required, max 50 chars)
- `driver_license_number`: string (required, max 20 chars, unique)
- `driver_license_issue_date`: string (required, YYYY-MM-DD format)
- `other_driver`: boolean (optional)
- `created_at`: string (ISO 8601 datetime)
- `updated_at`: string (ISO 8601 datetime)

### Create a new client
**POST** `/clients`

**Request Body:**
```json
{
  "last_name": "Doe",
  "first_name": "John",
  "phone": "+1234567890",
  "email": "john.doe@example.com",
  "address": "123 Main St, City, Country",
  "date_of_birth": "1990-01-15",
  "id_document_type": "passport",
  "id_document_number": "P123456789",
  "id_issue_date": "2020-01-01",
  "id_expiry_date": "2030-01-01",
  "nationality": "French",
  "driver_license_number": "DL123456789",
  "driver_license_issue_date": "2018-05-01",
  "other_driver": false
}
```

**Response:**
```json
{
  "message": "Client créé avec succès.",
  "client": {
    "id": 1,
    "last_name": "Doe",
    "first_name": "John",
    "phone": "+1234567890",
    "email": "john.doe@example.com",
    "address": "123 Main St, City, Country",
    "date_of_birth": "1990-01-15",
    "id_document_type": "passport",
    "id_document_number": "P123456789",
    "id_issue_date": "2020-01-01",
    "id_expiry_date": "2030-01-01",
    "nationality": "French",
    "driver_license_number": "DL123456789",
    "driver_license_issue_date": "2018-05-01",
    "other_driver": false,
    "created_at": "2024-01-01T10:00:00.000000Z",
    "updated_at": "2024-01-01T10:00:00.000000Z"
  }
}
```

### Get client details
**GET** `/clients/{client}`

**Response:**
```json
{
  "id": 1,
  "last_name": "Doe",
  "first_name": "John",
  "phone": "+1234567890",
  "email": "john.doe@example.com",
  "address": "123 Main St, City, Country",
  "date_of_birth": "1990-01-15",
  "id_document_type": "passport",
  "id_document_number": "P123456789",
  "id_issue_date": "2020-01-01",
  "id_expiry_date": "2030-01-01",
  "nationality": "French",
  "driver_license_number": "DL123456789",
  "driver_license_issue_date": "2018-05-01",
  "other_driver": false,
  "created_at": "2024-01-01T10:00:00.000000Z",
  "updated_at": "2024-01-01T10:00:00.000000Z"
}
```

### Update client
**PUT** `/clients/{client}`

**Request Body:** (Same structure as create, all fields optional)
```json
{
  "last_name": "Smith",
  "first_name": "John",
  "phone": "+1234567891"
}
```

**Response:**
```json
{
  "message": "Client mis à jour avec succès.",
  "client": {
    "id": 1,
    "last_name": "Smith",
    "first_name": "John",
    "phone": "+1234567891",
    "email": "john.doe@example.com",
    "address": "123 Main St, City, Country",
    "date_of_birth": "1990-01-15",
    "id_document_type": "passport",
    "id_document_number": "P123456789",
    "id_issue_date": "2020-01-01",
    "id_expiry_date": "2030-01-01",
    "nationality": "French",
    "driver_license_number": "DL123456789",
    "driver_license_issue_date": "2018-05-01",
    "other_driver": false,
    "created_at": "2024-01-01T10:00:00.000000Z",
    "updated_at": "2024-01-01T12:00:00.000000Z"
  }
}
```

### Delete client
**DELETE** `/clients/{client}`

**Response:**
```json
{
  "message": "Client supprimé avec succès."
}
```

## Vehicles

### List all & search vehicles
**GET** `/vehicles`

**Query Parameters:**
- `search` (string, optional): Search in registration_number, brand, model
- `brand` (string, optional): Filter by brand
- `model` (string, optional): Filter by model
- `per_page` (integer, optional): Number of items per page (default: 10)
- `page` (integer, optional): Page number

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "registration_number": "ABC-123",
      "brand": "TOYOTA",
      "model": "CAMRY",
      "year": 2022,
      "vehicle_release_date": "2022-01-15",
      "mileage": 15000,
      "number_of_seats": 5,
      "fuel_type": "petrol",
      "status": "available",
      "rental_price_per_day": "45.50",
      "gearbox_type": "automatic",
      "air_conditioning": true,
      "vehicle_type": "sedan",
      "is_sub_rental": false,
      "partner_id": null,
      "rental_price_per_day_from_partner": null,
      "created_at": "2024-01-01T10:00:00.000000Z",
      "updated_at": "2024-01-01T10:00:00.000000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "from": 1,
    "to": 1
  }
}
```

**Field Types:**
- `id`: integer
- `registration_number`: string (required, unique)
- `brand`: string (required)
- `model`: string (required)
- `year`: integer (required)
- `vehicle_release_date`: string (required, YYYY-MM-DD format)
- `mileage`: integer (required)
- `number_of_seats`: integer (required)
- `fuel_type`: string (required, enum: "petrol", "diesel", "electric", "hybrid")
- `status`: string (required, enum: "available", "in_maintenance", "reserved", "in_accident")
- `rental_price_per_day`: decimal (required, 2 decimal places)
- `gearbox_type`: string (required, enum: "manual", "automatic")
- `air_conditioning`: boolean (required)
- `vehicle_type`: string (required, enum: "sedan", "hatchback", "wagon", "suv", "crossover", "minivan", "luxury")
- `is_sub_rental`: boolean (auto-set to false for company vehicles)
- `partner_id`: integer|null (nullable, exists in partners table)
- `rental_price_per_day_from_partner`: decimal|null (nullable, 2 decimal places)
- `created_at`: string (ISO 8601 datetime)
- `updated_at`: string (ISO 8601 datetime)

### Create a new vehicle
**POST** `/vehicles`

**Request Body:**
```json
{
  "registration_number": "ABC-123",
  "brand": "TOYOTA",
  "model": "CAMRY",
  "year": 2022,
  "vehicle_release_date": "2022-01-15",
  "mileage": 15000,
  "number_of_seats": 5,
  "fuel_type": "petrol",
  "status": "available",
  "rental_price_per_day": 45.50,
  "gearbox_type": "automatic",
  "air_conditioning": true,
  "vehicle_type": "sedan"
}
```

**Response:**
```json
{
  "message": "Vehicule créé avec succès.",
  "vehicle": {
    "id": 1,
    "registration_number": "ABC-123",
    "brand": "TOYOTA",
    "model": "CAMRY",
    "year": 2022,
    "vehicle_release_date": "2022-01-15",
    "mileage": 15000,
    "number_of_seats": 5,
    "fuel_type": "petrol",
    "status": "available",
    "rental_price_per_day": "45.50",
    "gearbox_type": "automatic",
    "air_conditioning": true,
    "vehicle_type": "sedan",
    "is_sub_rental": false,
    "partner_id": null,
    "rental_price_per_day_from_partner": null,
    "created_at": "2024-01-01T10:00:00.000000Z",
    "updated_at": "2024-01-01T10:00:00.000000Z"
  }
}
```

### Get vehicle details
**GET** `/vehicles/{vehicle}`

**Response:**
```json
{
  "id": 1,
  "registration_number": "ABC-123",
  "brand": "TOYOTA",
  "model": "CAMRY",
  "year": 2022,
  "vehicle_release_date": "2022-01-15",
  "mileage": 15000,
  "number_of_seats": 5,
  "fuel_type": "petrol",
  "status": "available",
  "rental_price_per_day": "45.50",
  "gearbox_type": "automatic",
  "air_conditioning": true,
  "vehicle_type": "sedan",
  "is_sub_rental": false,
  "partner_id": null,
  "rental_price_per_day_from_partner": null,
  "created_at": "2024-01-01T10:00:00.000000Z",
  "updated_at": "2024-01-01T10:00:00.000000Z"
}
```

### Update vehicle
**PUT** `/vehicles/{vehicle}`

**Request Body:** (Same structure as create, all fields optional)
```json
{
  "mileage": 16000,
  "status": "in_maintenance"
}
```

**Response:**
```json
{
  "id": 1,
  "registration_number": "ABC-123",
  "brand": "TOYOTA",
  "model": "CAMRY",
  "year": 2022,
  "vehicle_release_date": "2022-01-15",
  "mileage": 16000,
  "number_of_seats": 5,
  "fuel_type": "petrol",
  "status": "in_maintenance",
  "rental_price_per_day": "45.50",
  "gearbox_type": "automatic",
  "air_conditioning": true,
  "vehicle_type": "sedan",
  "is_sub_rental": false,
  "partner_id": null,
  "rental_price_per_day_from_partner": null,
  "created_at": "2024-01-01T10:00:00.000000Z",
  "updated_at": "2024-01-01T12:00:00.000000Z"
}
```

### Delete vehicle
**DELETE** `/vehicles/{vehicle}`

**Response:**
```json
{
  "message": "Vehicle deleted successfully."
}
```

## Bookings

### List all & search bookings
**GET** `/bookings`

**Query Parameters:**
- `search` (string, optional): Search in booking_number, client details
- `per_page` (integer, optional): Number of items per page (default: 10)
- `page` (integer, optional): Page number

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "booking_number": "BK2024001",
      "client_id": 1,
      "vehicle_id": 1,
      "is_sub_rental": false,
      "franchise_id": 1,
      "pickup_location": "Airport Terminal 1",
      "dropoff_location": "Airport Terminal 1",
      "pickup_timestamp": 1704067200,
      "dropoff_timestamp": 1704326400,
      "number_of_days": 3,
      "status": "confirmed",
      "total_amount": "136.50",
      "additional_amount": "0.00",
      "note": null,
      "deposit_amount": "200.00",
      "flight_number": "AF123",
      "comment": "Customer prefers automatic transmission",
      "payment_type": "credit_card",
      "vehicle_changed": false,
      "old_vehicle_id": null,
      "accident_datetime": null,
      "vehicle_change_datetime": null,
      "maintenance_datetime": null,
      "maintenance_reason": null,
      "created_at": "2024-01-01T10:00:00.000000Z",
      "updated_at": "2024-01-01T10:00:00.000000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "from": 1,
    "to": 1
  }
}
```

**Field Types:**
- `id`: integer
- `booking_number`: string (required, unique, max 30 chars)
- `client_id`: integer (required, exists in clients table)
- `vehicle_id`: integer (required, exists in vehicles table)
- `is_sub_rental`: boolean (required)
- `franchise_id`: integer (required, exists in franchises table)
- `pickup_location`: string (required, max 255 chars)
- `dropoff_location`: string (required, max 255 chars)
- `pickup_timestamp`: integer (required, Unix timestamp)
- `dropoff_timestamp`: integer (required, Unix timestamp, after pickup)
- `number_of_days`: integer (nullable, min 1)
- `status`: string (required, enum: "pending", "confirmed", "cancelled", "completed", "needs_replacement")
- `total_amount`: decimal (required, min 0, 2 decimal places)
- `additional_amount`: decimal (nullable, min 0, 2 decimal places)
- `note`: string (nullable, max 255 chars)
- `deposit_amount`: decimal (required, min 0, 2 decimal places)
- `flight_number`: string (nullable)
- `comment`: string (nullable, max 1000 chars)
- `payment_type`: string (required, enum values from PaymentMethod)
- `vehicle_changed`: boolean
- `old_vehicle_id`: integer (nullable, exists in vehicles table)
- `accident_datetime`: integer (nullable, Unix timestamp)
- `vehicle_change_datetime`: integer (nullable, Unix timestamp)
- `maintenance_datetime`: integer (nullable, Unix timestamp)
- `maintenance_reason`: string (nullable)
- `created_at`: string (ISO 8601 datetime)
- `updated_at`: string (ISO 8601 datetime)

### Create a new booking
**POST** `/bookings`

**Request Body:**
```json
{
  "booking_number": "BK2024001",
  "client_id": 1,
  "vehicle_id": 1,
  "is_sub_rental": false,
  "franchise_id": 1,
  "pickup_location": "Airport Terminal 1",
  "dropoff_location": "Airport Terminal 1",
  "pickup_timestamp": "2024-01-01T10:00",
  "dropoff_timestamp": "2024-01-04T10:00",
  "number_of_days": 3,
  "status": "confirmed",
  "total_amount": 136.50,
  "deposit_amount": 200.00,
  "flight_number": "AF123",
  "comment": "Customer prefers automatic transmission",
  "payment_type": "credit_card"
}
```

**Response:**
```json
{
  "message": "Réservation créée avec succès.",
  "booking": {
    "id": 1,
    "booking_number": "BK2024001",
    "client_id": 1,
    "vehicle_id": 1,
    "is_sub_rental": false,
    "franchise_id": 1,
    "pickup_location": "Airport Terminal 1",
    "dropoff_location": "Airport Terminal 1",
    "pickup_timestamp": 1704067200,
    "dropoff_timestamp": 1704326400,
    "number_of_days": 3,
    "status": "confirmed",
    "total_amount": "136.50",
    "additional_amount": "0.00",
    "note": null,
    "deposit_amount": "200.00",
    "flight_number": "AF123",
    "comment": "Customer prefers automatic transmission",
    "payment_type": "credit_card",
    "vehicle_changed": false,
    "old_vehicle_id": null,
    "accident_datetime": null,
    "vehicle_change_datetime": null,
    "maintenance_datetime": null,
    "maintenance_reason": null,
    "created_at": "2024-01-01T10:00:00.000000Z",
    "updated_at": "2024-01-01T10:00:00.000000Z"
  }
}
```

### Get booking details
**GET** `/bookings/{booking}`

**Response:** (Same structure as single booking in list response)

### Update booking
**PUT** `/bookings/{booking}`

**Request Body:** (Same structure as create, all fields optional)

### Delete booking
**DELETE** `/bookings/{booking}`

**Response:**
```json
{
  "message": "Réservation supprimée avec succès."
}
```

### Export bookings to CSV
**POST** `/bookings/export`

**Request Body:**
```json
{
  "export_filter": "all",
  "export_period": "current_month",
  "start_date": "2024-01-01",
  "end_date": "2024-12-31"
}
```

**Field Types:**
- `export_filter`: string (required, enum values from BookingExportFilter)
- `export_period`: string (required, enum values from BookingExportPeriod)
- `start_date`: string (required if custom period, YYYY-MM-DD format)
- `end_date`: string (required if custom period, YYYY-MM-DD format)

**Response:** CSV file download

## Franchises

### List all & search franchises
**GET** `/franchises`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Franchise North",
      "franchise_start_date": "2023-01-01",
      "franchise_end_date": "2025-12-31",
      "status": "active",
      "description": "Northern region franchise operations",
      "created_at": "2024-01-01T10:00:00.000000Z",
      "updated_at": "2024-01-01T10:00:00.000000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "from": 1,
    "to": 1
  }
}
```

**Field Types:**
- `id`: integer
- `name`: string (required)
- `franchise_start_date`: string (required, YYYY-MM-DD format)
- `franchise_end_date`: string (required, YYYY-MM-DD format)
- `status`: string (required, enum values from FranchiseStatus)
- `description`: string (nullable)
- `created_at`: string (ISO 8601 datetime)
- `updated_at`: string (ISO 8601 datetime)

### Create a new franchise
**POST** `/franchises`

**Request Body:**
```json
{
  "name": "Franchise North",
  "franchise_start_date": "2023-01-01",
  "franchise_end_date": "2025-12-31",
  "status": "active",
  "description": "Northern region franchise operations"
}
```

### Get franchise details
**GET** `/franchises/{franchise}`

### Update franchise
**PUT** `/franchises/{franchise}`

### Delete franchise
**DELETE** `/franchises/{franchise}`

## Partners

### List all & search partners
**GET** `/partners`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "company_name": "Partner Rental Co.",
      "address": "456 Business Ave, City, Country",
      "phone": "+1234567890",
      "email": "contact@partnerco.com",
      "partnership_start_date": "2023-01-01",
      "partnership_end_date": "2025-12-31",
      "status": "active",
      "description": "Sub-rental partner for overflow capacity",
      "created_at": "2024-01-01T10:00:00.000000Z",
      "updated_at": "2024-01-01T10:00:00.000000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "from": 1,
    "to": 1
  }
}
```

**Field Types:**
- `id`: integer
- `company_name`: string (required)
- `address`: string (required)
- `phone`: string (required)
- `email`: string (required, email format)
- `partnership_start_date`: string (required, YYYY-MM-DD format)
- `partnership_end_date`: string (required, YYYY-MM-DD format)
- `status`: string (required, enum values from PartnerStatus)
- `description`: string (nullable)
- `created_at`: string (ISO 8601 datetime)
- `updated_at`: string (ISO 8601 datetime)

### Create a new partner
**POST** `/partners`

**Request Body:**
```json
{
  "company_name": "Partner Rental Co.",
  "address": "456 Business Ave, City, Country",
  "phone": "+1234567890",
  "email": "contact@partnerco.com",
  "partnership_start_date": "2023-01-01",
  "partnership_end_date": "2025-12-31",
  "status": "active",
  "description": "Sub-rental partner for overflow capacity"
}
```

### Get partner details
**GET** `/partners/{partner}`

### Update partner
**PUT** `/partners/{partner}`

### Delete partner
**DELETE** `/partners/{partner}`

## Oil Changes

### List all & search oil changes
**GET** `/oil-changes`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "vehicle_id": 1,
      "service_center": "QuickLube Pro",
      "last_oil_change_date": "2024-01-15",
      "mileage_at_last_oil_change": 15000,
      "oil_type": "synthetic",
      "oil_filter_replaced": true,
      "air_filter_replaced": false,
      "fuel_filter_replaced": false,
      "cabin_filter_replaced": true,
      "total_amount": "85.50",
      "notes": "Standard oil change service",
      "created_at": "2024-01-15T10:00:00.000000Z",
      "updated_at": "2024-01-15T10:00:00.000000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "from": 1,
    "to": 1
  }
}
```

**Field Types:**
- `id`: integer
- `vehicle_id`: integer (required, exists in vehicles table)
- `service_center`: string (required)
- `last_oil_change_date`: string (required, YYYY-MM-DD format)
- `mileage_at_last_oil_change`: integer (required)
- `oil_type`: string (required, enum values from OilType)
- `oil_filter_replaced`: boolean (required)
- `air_filter_replaced`: boolean (required)
- `fuel_filter_replaced`: boolean (required)
- `cabin_filter_replaced`: boolean (required)
- `total_amount`: decimal (required, 2 decimal places)
- `notes`: string (nullable)
- `created_at`: string (ISO 8601 datetime)
- `updated_at`: string (ISO 8601 datetime)

### Create a new oil change record
**POST** `/oil-changes`

**Request Body:**
```json
{
  "vehicle_id": 1,
  "service_center": "QuickLube Pro",
  "last_oil_change_date": "2024-01-15",
  "mileage_at_last_oil_change": 15000,
  "oil_type": "synthetic",
  "oil_filter_replaced": true,
  "air_filter_replaced": false,
  "fuel_filter_replaced": false,
  "cabin_filter_replaced": true,
  "total_amount": 85.50,
  "notes": "Standard oil change service"
}
```

### Get oil change details
**GET** `/oil-changes/{oil_change}`

### Update oil change
**PUT** `/oil-changes/{oil_change}`

### Delete oil change
**DELETE** `/oil-changes/{oil_change}`

## Other Maintenances

### List all & search maintenance records
**GET** `/other-maintenances`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "vehicle_id": 1,
      "service_center": "AutoCare Center",
      "service_center_phone": "+1234567890",
      "service_center_address": "123 Service St, City",
      "maintenance_type": "brake_service",
      "maintenance_date": "2024-01-20",
      "current_mileage": 15500,
      "total_amount": "350.00",
      "description": "Brake pad replacement and rotor resurfacing",
      "created_at": "2024-01-20T10:00:00.000000Z",
      "updated_at": "2024-01-20T10:00:00.000000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "from": 1,
    "to": 1
  }
}
```

**Field Types:**
- `id`: integer
- `vehicle_id`: integer (required, exists in vehicles table)
- `service_center`: string (required)
- `service_center_phone`: string (required)
- `service_center_address`: string (required)
- `maintenance_type`: string (required)
- `maintenance_date`: string (required, YYYY-MM-DD format)
- `current_mileage`: integer (required)
- `total_amount`: decimal (required, 2 decimal places)
- `description`: string (nullable)
- `created_at`: string (ISO 8601 datetime)
- `updated_at`: string (ISO 8601 datetime)

### Create a new maintenance record
**POST** `/other-maintenances`

**Request Body:**
```json
{
  "vehicle_id": 1,
  "service_center": "AutoCare Center",
  "service_center_phone": "+1234567890",
  "service_center_address": "123 Service St, City",
  "maintenance_type": "brake_service",
  "maintenance_date": "2024-01-20",
  "current_mileage": 15500,
  "total_amount": 350.00,
  "description": "Brake pad replacement and rotor resurfacing"
}
```

### Get maintenance details
**GET** `/other-maintenances/{other_maintenance}`

### Update maintenance
**PUT** `/other-maintenances/{other_maintenance}`

### Delete maintenance
**DELETE** `/other-maintenances/{other_maintenance}`

## Technical Inspections

### List all & search inspections
**GET** `/technical-inspections`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "vehicle_id": 1,
      "inspection_center": "State Inspection Center",
      "inspection_center_phone": "+1234567890",
      "inspection_center_address": "789 Inspection Blvd, City",
      "last_inspection_date": "2024-01-10",
      "next_inspection_date": "2025-01-10",
      "total_amount": "45.00",
      "notes": "Passed all safety and emissions tests",
      "created_at": "2024-01-10T10:00:00.000000Z",
      "updated_at": "2024-01-10T10:00:00.000000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "from": 1,
    "to": 1
  }
}
```

**Field Types:**
- `id`: integer
- `vehicle_id`: integer (required, exists in vehicles table)
- `inspection_center`: string (required)
- `inspection_center_phone`: string (required)
- `inspection_center_address`: string (required)
- `last_inspection_date`: string (required, YYYY-MM-DD format)
- `next_inspection_date`: string (required, YYYY-MM-DD format)
- `total_amount`: decimal (required, 2 decimal places)
- `notes`: string (nullable)
- `created_at`: string (ISO 8601 datetime)
- `updated_at`: string (ISO 8601 datetime)

### Create a new inspection record
**POST** `/technical-inspections`

**Request Body:**
```json
{
  "vehicle_id": 1,
  "inspection_center": "State Inspection Center",
  "inspection_center_phone": "+1234567890",
  "inspection_center_address": "789 Inspection Blvd, City",
  "last_inspection_date": "2024-01-10",
  "next_inspection_date": "2025-01-10",
  "total_amount": 45.00,
  "notes": "Passed all safety and emissions tests"
}
```

### Get inspection details
**GET** `/technical-inspections/{technical_inspection}`

### Update inspection
**PUT** `/technical-inspections/{technical_inspection}`

### Delete inspection
**DELETE** `/technical-inspections/{technical_inspection}`

## Sub-Rental Vehicles

### List all & search sub-rental vehicles
**GET** `/sub-rental-vehicles`

**Response:** (Same structure as vehicles, but with `is_sub_rental: true` and partner information)
```json
{
  "data": [
    {
      "id": 2,
      "registration_number": "SUB-456",
      "brand": "NISSAN",
      "model": "ALTIMA",
      "year": 2023,
      "vehicle_release_date": "2023-03-01",
      "mileage": 8000,
      "number_of_seats": 5,
      "fuel_type": "petrol",
      "status": "available",
      "rental_price_per_day": "40.00",
      "gearbox_type": "automatic",
      "air_conditioning": true,
      "vehicle_type": "sedan",
      "is_sub_rental": true,
      "partner_id": 1,
      "rental_price_per_day_from_partner": "35.00",
      "created_at": "2024-01-01T10:00:00.000000Z",
      "updated_at": "2024-01-01T10:00:00.000000Z"
    }
  ]
}
```

### Create a new sub-rental vehicle
**POST** `/sub-rental-vehicles`

### Get sub-rental vehicle details
**GET** `/sub-rental-vehicles/{sub_rental_vehicle}`

### Update sub-rental vehicle
**PUT** `/sub-rental-vehicles/{sub_rental_vehicle}`

### Delete sub-rental vehicle
**DELETE** `/sub-rental-vehicles/{sub_rental_vehicle}`

## Wrecked Vehicles Archive

### List archived vehicles
**GET** `/wrecked-vehicles-archive`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "vehicle_id": 1,
      "archive_date": "2024-01-25",
      "reason": "Total loss from accident",
      "insurance_claim_number": "INS2024001",
      "insurance_payout": "25000.00",
      "notes": "Vehicle declared total loss, insurance settled",
      "created_at": "2024-01-25T10:00:00.000000Z",
      "updated_at": "2024-01-25T10:00:00.000000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "from": 1,
    "to": 1
  }
}
```

**Field Types:**
- `id`: integer
- `vehicle_id`: integer (required, exists in vehicles table)
- `archive_date`: string (required, YYYY-MM-DD format)
- `reason`: string (required)
- `insurance_claim_number`: string (nullable)
- `insurance_payout`: decimal (nullable, 2 decimal places)
- `notes`: string (nullable)
- `created_at`: string (ISO 8601 datetime)
- `updated_at`: string (ISO 8601 datetime)

### Archive a new vehicle
**POST** `/wrecked-vehicles-archive`

### Get archived vehicle details
**GET** `/wrecked-vehicles-archive/{wrecked_vehicles_archive}`

### Update archived vehicle
**PUT** `/wrecked-vehicles-archive/{wrecked_vehicles_archive}`

### Delete archived vehicle
**DELETE** `/wrecked-vehicles-archive/{wrecked_vehicles_archive}`

## Insurances

### List all & search insurances
**GET** `/insurances`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "vehicle_id": 1,
      "vehicle_usage": "rental",
      "order_number": "ORD2024001",
      "insurance_type": "comprehensive",
      "insurance_company": "Global Insurance Co.",
      "insurance_company_phone_number": "+1234567890",
      "policy_number": "POL123456789",
      "insurance_intermediary": "Insurance Broker Ltd.",
      "insurance_start_date": "2024-01-01",
      "insurance_end_date": "2024-12-31",
      "number_of_covered_seats": 5,
      "total_amount": "1200.00",
      "notes": "Full comprehensive coverage",
      "created_at": "2024-01-01T10:00:00.000000Z",
      "updated_at": "2024-01-01T10:00:00.000000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "from": 1,
    "to": 1
  }
}
```

**Field Types:**
- `id`: integer
- `vehicle_id`: integer (required, exists in vehicles table)
- `vehicle_usage`: string (required, enum values from InsuranceVehicleUsage)
- `order_number`: string (required)
- `insurance_type`: string (required, enum values from InsuranceType)
- `insurance_company`: string (required)
- `insurance_company_phone_number`: string (required)
- `policy_number`: string (required)
- `insurance_intermediary`: string (nullable)
- `insurance_start_date`: string (required, YYYY-MM-DD format)
- `insurance_end_date`: string (required, YYYY-MM-DD format)
- `number_of_covered_seats`: integer (required)
- `total_amount`: decimal (required, 2 decimal places)
- `notes`: string (nullable)
- `created_at`: string (ISO 8601 datetime)
- `updated_at`: string (ISO 8601 datetime)

### Create a new insurance
**POST** `/insurances`

### Get insurance details
**GET** `/insurances/{insurance}`

### Update insurance
**PUT** `/insurances/{insurance}`

### Delete insurance
**DELETE** `/insurances/{insurance}`

## Invoices

### List all & search invoices
**GET** `/invoices`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "invoice_number": "INV-2025-0001",
      "client_id": 1,
      "booking_id": 1,
      "invoice_date": "2024-01-01",
      "due_date": "2024-01-31",
      "subtotal": "136.50",
      "tax_amount": "27.30",
      "total_amount": "163.80",
      "status": "paid",
      "payment_date": "2024-01-05",
      "payment_method": "credit_card",
      "notes": "Payment received on time",
      "created_at": "2024-01-01T10:00:00.000000Z",
      "updated_at": "2024-01-05T10:00:00.000000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "from": 1,
    "to": 1
  }
}
```

**Field Types:**
- `id`: integer
- `client_id`: integer (required, exists in clients table)
- `booking_id`: integer (required, exists in bookings table)
- `invoice_date`: string (required, YYYY-MM-DD format)
- `due_date`: string (required, YYYY-MM-DD format)
- `subtotal`: decimal (required, 2 decimal places)
- `tax_amount`: decimal (required, 2 decimal places)
- `total_amount`: decimal (required, 2 decimal places)
- `status`: string (required, enum values from InvoiceStatus)
- `payment_date`: string (nullable, YYYY-MM-DD format)
- `payment_method`: string (nullable, enum values from PaymentMethod)
- `notes`: string (nullable)
- `created_at`: string (ISO 8601 datetime)
- `updated_at`: string (ISO 8601 datetime)

### Create a new invoice
**POST** `/invoices`

### Get invoice details
**GET** `/invoices/{invoice}`

### Update invoice
**PUT** `/invoices/{invoice}`

### Delete invoice
**DELETE** `/invoices/{invoice}`

## Contracts

### List all & search contracts
**GET** `/contracts`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "contract_number": "CON-2025-0001",
      "booking_id": 1,
      "notes": "Standard rental contract",
      "created_at": "2024-01-01T10:00:00.000000Z",
      "updated_at": "2024-01-01T10:00:00.000000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "from": 1,
    "to": 1
  }
}
```

**Field Types:**
- `id`: integer
- `booking_id`: integer (required, exists in bookings table)
- `notes`: string (nullable)
- `created_at`: string (ISO 8601 datetime)
- `updated_at`: string (ISO 8601 datetime)

### Create a new contract
**POST** `/contracts`

### Get contract details
**GET** `/contracts/{contract}`

### Update contract
**PUT** `/contracts/{contract}`

### Delete contract
**DELETE** `/contracts/{contract}`

## Contract Images

### List contract images
**GET** `/contracts/{contract}/images`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "contract_id": 1,
      "image_path": "/storage/contracts/1/image_001.jpg",
      "image_name": "contract_signature_page.jpg",
      "mime_type": "image/jpeg",
      "file_size": 256000,
      "order_index": 1,
      "description": "Contract signature page",
      "created_at": "2024-01-01T10:00:00.000000Z",
      "updated_at": "2024-01-01T10:00:00.000000Z"
    }
  ]
}
```

**Field Types:**
- `id`: integer
- `contract_id`: integer (exists in contracts table)
- `image_path`: string (file path)
- `image_name`: string (original filename)
- `mime_type`: string (enum values from ImageMimeType)
- `file_size`: integer (bytes)
- `order_index`: integer (display order)
- `description`: string (nullable)
- `created_at`: string (ISO 8601 datetime)
- `updated_at`: string (ISO 8601 datetime)

### Add new images to contract
**POST** `/contracts/{contract}/images`

**Request Body:** (Multipart form data)
```json
{
  "images": ["file1.jpg", "file2.pdf"],
  "descriptions": ["Signature page", "Terms and conditions"]
}
```

### Update contract image
**PUT** `/contracts/{contract}/images/{image}`

### Delete contract image
**DELETE** `/contracts/{contract}/images/{image}`

### Reorder contract images
**POST** `/contracts/{contract}/images/reorder`

**Request Body:**
```json
{
  "image_orders": [
    {"image_id": 1, "order_index": 2},
    {"image_id": 2, "order_index": 1}
  ]
}
```

### Reorder contract images
**POST** `/contracts/{contract}/images/reorder`

**Request Body:**
```json
{
  "image_orders": [
    {"image_id": 1, "order_index": 2},
    {"image_id": 2, "order_index": 1}
  ]
}
```

## Vehicle Status

### Search available vehicles
**GET** `/vehicle-status/search`

**Query Parameters:**
- `brand` (string, optional): Filter by vehicle brand
- `model` (string, optional): Filter by vehicle model
- `from_date` (string, required): Start date (YYYY-MM-DD format)
- `to_date` (string, required): End date (YYYY-MM-DD format)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "registration_number": "ABC-123",
      "brand": "TOYOTA",
      "model": "CAMRY",
      "year": 2022,
      "vehicle_type": "sedan",
      "rental_price_per_day": "45.50",
      "status": "available"
    }
  ],
  "count": 1
}
```

### Get vehicle timeline
**GET** `/vehicle-status/timeline/{vehicleId}`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "vehicle_id": 1,
      "status": "reserved",
      "start_date_timestamp": 1704067200,
      "end_date_timestamp": 1704326400,
      "booking_id": 1,
      "reason": "Customer rental",
      "notes": "Standard booking period",
      "created_at": "2024-01-01T10:00:00.000000Z",
      "updated_at": "2024-01-01T10:00:00.000000Z"
    }
  ],
  "count": 1
}
```

**Field Types:**
- `id`: integer
- `vehicle_id`: integer (required, exists in vehicles table)
- `status`: string (required, enum: "reserved", "in_maintenance", "in_accident")
- `start_date_timestamp`: integer (required, Unix timestamp)
- `end_date_timestamp`: integer (required, Unix timestamp)
- `booking_id`: integer (nullable, exists in bookings table)
- `reason`: string (required)
- `notes`: string (nullable)
- `created_at`: string (ISO 8601 datetime)
- `updated_at`: string (ISO 8601 datetime)

### Create availability record
**POST** `/vehicle-status`

**Request Body:**
```json
{
  "vehicle_id": 1,
  "status": "in_maintenance",
  "start_date_timestamp": 1704067200,
  "end_date_timestamp": 1704326400,
  "reason": "Scheduled maintenance",
  "notes": "Brake service and oil change"
}
```

**Response:**
```json
{
  "message": "Enregistrement de disponibilité du véhicule créé avec succès",
  "data": {
    "id": 1,
    "vehicle_id": 1,
    "status": "in_maintenance",
    "start_date_timestamp": 1704067200,
    "end_date_timestamp": 1704326400,
    "booking_id": null,
    "reason": "Scheduled maintenance",
    "notes": "Brake service and oil change",
    "created_at": "2024-01-01T10:00:00.000000Z",
    "updated_at": "2024-01-01T10:00:00.000000Z"
  }
}
```

### Update availability record
**PUT** `/vehicle-status/{vehicleStatus}`

### Delete availability record
**DELETE** `/vehicle-status/{vehicleStatus}`

## Maintenance Management

### Mark vehicle for maintenance
**POST** `/maintenance/mark-vehicle-maintenance`

**Request Body:**
```json
{
  "booking_id": 1,
  "maintenance_datetime": 1704067200,
  "estimated_maintenance_end_date": "2024-01-05",
  "maintenance_reason": "Engine repair required"
}
```

**Field Types:**
- `booking_id`: integer (required, exists in bookings table)
- `maintenance_datetime`: integer (required, Unix timestamp)
- `estimated_maintenance_end_date`: string (required, YYYY-MM-DD format)
- `maintenance_reason`: string (required)

**Response:**
```json
{
  "message": "Véhicule marqué comme en maintenance. Attribution d'un véhicule de remplacement requise.",
  "data": {
    "booking": {
      "id": 1,
      "booking_number": "BK2024001",
      "status": "needs_replacement",
      "maintenance_datetime": 1704067200,
      "maintenance_reason": "Engine repair required"
    },
    "vehicle_status": {
      "id": 2,
      "vehicle_id": 1,
      "status": "in_maintenance",
      "start_date_timestamp": 1704067200,
      "end_date_timestamp": 1704326400,
      "reason": "Engine repair required"
    }
  }
}
```

### List bookings needing maintenance replacement
**GET** `/maintenance/bookings-needing-replacement`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "booking_number": "BK2024001",
      "client_id": 1,
      "vehicle_id": 1,
      "status": "needs_replacement",
      "maintenance_datetime": 1704067200,
      "maintenance_reason": "Engine repair required",
      "pickup_timestamp": 1704067200,
      "dropoff_timestamp": 1704326400
    }
  ],
  "count": 1,
  "message": "Réservations nécessitant un remplacement pour maintenance récupérées avec succès."
}
```

### Assign replacement vehicle
**POST** `/maintenance/assign-replacement-vehicle`

**Request Body:**
```json
{
  "booking_id": 1,
  "replacement_vehicle_id": 2,
  "replacement_start_datetime": 1704067200
}
```

**Field Types:**
- `booking_id`: integer (required, exists in bookings table)
- `replacement_vehicle_id`: integer (required, exists in vehicles table)
- `replacement_start_datetime`: integer (required, Unix timestamp)

**Response:**
```json
{
  "message": "Véhicule de remplacement pour maintenance attribué avec succès.",
  "data": {
    "booking": {
      "id": 1,
      "booking_number": "BK2024001",
      "vehicle_id": 2,
      "old_vehicle_id": 1,
      "vehicle_changed": true,
      "vehicle_change_datetime": 1704067200,
      "status": "confirmed"
    }
  }
}
```

### Get available replacement vehicles
**GET** `/maintenance/available-replacement-vehicles`

**Response:**
```json
{
  "data": [
    {
      "id": 2,
      "registration_number": "DEF-456",
      "brand": "NISSAN",
      "model": "ALTIMA",
      "vehicle_type": "sedan",
      "status": "available"
    }
  ],
  "count": 1
}
```

### End maintenance period
**POST** `/maintenance/end-maintenance-period`

**Request Body:**
```json
{
  "vehicle_id": 1,
  "maintenance_completion_date": "2024-01-05"
}
```

**Field Types:**
- `vehicle_id`: integer (required, exists in vehicles table)
- `maintenance_completion_date`: string (required, YYYY-MM-DD format)

**Response:**
```json
{
  "message": "Période de maintenance terminée avec succès.",
  "data": {
    "vehicle": {
      "id": 1,
      "status": "available"
    }
  }
}
```

## Accident Management

### Mark vehicle accident
**POST** `/accidents/mark-vehicle-accident`

**Request Body:**
```json
{
  "booking_id": 1,
  "accident_datetime": 1704067200,
  "estimated_repair_end_date": "2024-01-10",
  "accident_description": "Minor collision, front bumper damage"
}
```

**Field Types:**
- `booking_id`: integer (required, exists in bookings table)
- `accident_datetime`: integer (required, Unix timestamp)
- `estimated_repair_end_date`: string (required, YYYY-MM-DD format)
- `accident_description`: string (required)

**Response:**
```json
{
  "message": "Véhicule marqué comme accidenté. Attribution d'un véhicule de remplacement requise.",
  "data": {
    "booking": {
      "id": 1,
      "booking_number": "BK2024001",
      "status": "needs_replacement",
      "accident_datetime": 1704067200
    },
    "vehicle_status": {
      "id": 3,
      "vehicle_id": 1,
      "status": "in_accident",
      "start_date_timestamp": 1704067200,
      "reason": "Minor collision, front bumper damage"
    }
  }
}
```

### List bookings needing accident replacement
**GET** `/accidents/bookings-needing-replacement`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "booking_number": "BK2024001",
      "client_id": 1,
      "vehicle_id": 1,
      "status": "needs_replacement",
      "accident_datetime": 1704067200,
      "pickup_timestamp": 1704067200,
      "dropoff_timestamp": 1704326400
    }
  ],
  "count": 1,
  "message": "Réservations nécessitant un remplacement suite à un accident récupérées avec succès."
}
```

### Assign replacement vehicle
**POST** `/accidents/assign-replacement-vehicle`

**Request Body:** (Same structure as maintenance replacement)
```json
{
  "booking_id": 1,
  "replacement_vehicle_id": 2,
  "replacement_start_datetime": 1704067200
}
```

### Get available replacement vehicles
**GET** `/accidents/available-replacement-vehicles`

**Response:** (Same structure as maintenance available vehicles)

### End accident period
**POST** `/accidents/end-accident-period`

**Request Body:**
```json
{
  "vehicle_id": 1,
  "repair_completion_date": "2024-01-10"
}
```

**Field Types:**
- `vehicle_id`: integer (required, exists in vehicles table)
- `repair_completion_date`: string (required, YYYY-MM-DD format)

**Response:**
```json
{
  "message": "Période d'accident terminée avec succès.",
  "data": {
    "vehicle": {
      "id": 1,
      "status": "available"
    }
  }
}
```

## Audit

### List audit logs
**GET** `/audit-logs`

**Query Parameters:**
- `per_page` (integer, optional): Number of items per page (default: 10)
- `page` (integer, optional): Page number
- `user_id` (integer, optional): Filter by user ID
- `action` (string, optional): Filter by action type
- `model_type` (string, optional): Filter by model type
- `start_date` (string, optional): Filter from date (YYYY-MM-DD)
- `end_date` (string, optional): Filter to date (YYYY-MM-DD)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "user_name": "John Admin",
      "action": "created",
      "model_type": "App\\Models\\Booking",
      "model_id": 1,
      "old_values": {},
      "new_values": {
        "booking_number": "BK2024001",
        "client_id": 1,
        "vehicle_id": 1,
        "status": "confirmed"
      },
      "ip_address": "192.168.1.100",
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "created_at": "2024-01-01T10:00:00.000000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1,
    "from": 1,
    "to": 1
  }
}
```

**Field Types:**
- `id`: integer
- `user_id`: integer (nullable, exists in users table)
- `user_name`: string (nullable)
- `action`: string (e.g., "created", "updated", "deleted")
- `model_type`: string (full class name)
- `model_id`: integer (ID of the affected model)
- `old_values`: object (previous values before change)
- `new_values`: object (new values after change)
- `ip_address`: string (nullable)
- `user_agent`: string (nullable)
- `created_at`: string (ISO 8601 datetime)

---

## Common Response Codes

- **200 OK**: Successful GET, PUT requests
- **201 Created**: Successful POST requests
- **204 No Content**: Successful DELETE requests
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation errors
- **500 Internal Server Error**: Server error

## Error Response Format

```json
{
  "message": "Validation failed",
  "errors": {
    "field_name": ["Error message 1", "Error message 2"]
  }
}
```

## Pagination Format

All list endpoints support pagination with the following query parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 10, max: 100)

Pagination response format:
```json
{
  "pagination": {
    "total": 100,
    "per_page": 10,
    "current_page": 1,
    "last_page": 10,
    "from": 1,
    "to": 10
  }
}
```
