---
applyTo: '**'
---



# Franchises

GET /franchises

POST /franchises

GET /franchises/{id}

PUT /franchises/{id}

PATCH /franchises/{id}

DELETE /franchises/{id}
// Franchise Json
{
    "name": "CarJet",                            	//string
    "franchise_start_date": "01/01/2020",        	//date
    "franchise_end_date": "01/01/2030",			 	//date
    "status": "active",                          	//enum 'active' 'inactive' 'suspended'
    "description": "Lorem lemntq"  				 	//text
}

# Clients

GET /clients

POST /clients

GET /clients/{id}

PUT /clients/{id}

DELETE /clients/{id}

// Client Json
{
    "last_name": "HAJ", 							//string
    "first_name": "ISHAQ",							//string
    "phone": "+212619512220",						//string
    "email": "ishaq.haj2@gmail.com", 				//email
    "address": "Ksar touroug mellab",				//string
    "date_of_birth": "07/11/2002", 					//date
    "id_document_type": "passport", 				//enum : 'passport' 'residence_permit' 'drivers_license' 'identity_card';
    "id_document_number": "ua124812",				//string
    "id_issue_date": "01/11/2018",					//date
    "id_expiry_date": "01/11/2028",					//date
    "nationality": "marocain",						//string
    "driver_license_number": "ua124812",			//string
    "driver_license_issue_date": "01/09/2022"		//date
}

# Vehicles

GET /vehicles

POST /vehicles

GET /vehicles/{id}

PUT /vehicles/{id}

DELETE /vehicles/{id}

// Vehicle Json
{
	"registration_number": "123456WW", //string
	"brand": "Dacia", //string
	"model": "Duster",//string
	"year": "2024",//year	-5 year =< now()(year) the car age has to  have maximum 5years
	"vehicle_release_date": "01/01/2024",//date
	"mileage": "91400", //number
	"number_of_seats": "5", //number
	"fuel_type": "petrol",//enum : 'petrol' 'diesel 'electric' 'hybrid';
	"status": "available",//enum : available, in_maintenance, reserved, in_accident
	"rental_price_per_day": "300", //number
	"gearbox_type": "manual",//enum : automatic, manual
	"air_conditioning": true, //boolean
	"vehicle_type": "sedan"  //enum : 'sedan' 'hatchback' 'wagon' 'suv' 'crossover' 'minivan' 'luxury'
}

# Bookings

GET /bookings

POST /bookings

GET /bookings/{id}

PUT /bookings/{id}

DELETE /bookings/{id}

// Booking Json
{
    "booking_number": "BC12354", //String
    "client_id": 1,  //select from db
    "vehicle_id": 1, //select from db
    "is_sub_rental": false, // boolean
    "franchise_id": 1, //select from db
    "pickup_location": "RAK", //string
    "dropoff_location": "RAK", //string
    "pickup_timestamp": "2025-09-01T10:00", //datetime-local
    "dropoff_timestamp": "2025-09-30T10:00", //datetime-local
    "number_of_days": "30", //int
    "status": "confirmed", //enum : confirmed, cancelled, completed, pending
    "total_amount": "9000", //number
    "additional_amount": "500", //number
    "note": "Siège bébé", //text/string
    "deposit_amount": "5000", //number
    "flight_number": "bC1234",//string
    "comment": null, //text
    "payment_type": "cash" //enum : cash, bank_transfer, cheque, credit_card
}

# Partners

GET /partners

POST /partners

GET /partners/{id}

PUT /partners/{id}

DELETE /partners/{id}
// Partner Json
{
	"company_name": "MacroL", //string
	"address": "Ksar touroug", //string
	"phone": "0619512220", //string
	"email": "Macrol@gmail.com", //email
	"partnership_start_date": "01/01/2023", //date
	"partnership_end_date":"01/01/2023", //date
	"status": "active", //enum : active, inactive, suspended
	"description": "Lorem lorem lorem" //string/text
}
# Oil Changes

GET /oil-changes

POST /oil-changes

GET /oil-changes/{id}

PUT /oil-changes/{id}

DELETE /oil-changes/{id}
// Oil Change
{
	"vehicle_id": 1, //select from db
	"service_center": "aima sa", //string
	"last_oil_change_date": "01/08/2025", //date
	"mileage_at_last_oil_change": "98222", //number
	"oil_type": "synthetic", //enum : mineral, semi_synthetic, synthetic
	"oil_filter_replaced": true, //boolean
	"air_filter_replaced": false, //boolean
	"fuel_filter_replaced": false, //boolean
	"cabin_filter_replaced": false, //boolean
	"total_amount": "500", //number
	"notes": "Lorem lorem lorem" //text
}

# Technical Inspections

GET /technical-inspections

POST /technical-inspections

GET /technical-inspections/{id}

PUT /technical-inspections/{id}

DELETE /technical-inspections/{id}

// Technical Inspection Json
{
	"vehicle_id": 1, //select from db
	"inspection_center": "decka", //string
	"last_inspection_date": "01/08/2025", // date
	"next_inspection_date": "01/02/2026", //date
	"total_amount": "500", // number
	"notes": "Lorem Lorem Lorem" //text/string
}

# Other Maintenance

GET /other-maintenance

POST /other-maintenance

GET /other-maintenance/{id}

PUT /other-maintenance/{id}

DELETE /other-maintenance/{id}
// Other maintenance Json
{
	"vehicle_id": 1, //select from db
	"maintenance_type": "Changement des pneus", //string
	"maintenance_date": "29/08/2025", //date
	"current_mileage": "98714", // number
	"total_amount": "4000", //number
	"description": "Lorem lorem lorem" //string/text
}

# Insurances

GET /insurances

POST /insurances

GET /insurances/{id}

PUT /insurances/{id}


DELETE /insurances/{id}

// Insurance Json
{
	"vehicle_id": 1, //select id from db
	"vehicle_usage": "tourism", // enum : tourism, miscellaneous, temporary_certificate, border_insurance
	"order_number": "01A180331095", //string
	"insurance_type": "comprehensive_with_excess", //enum :  enum : third_party, comprehensive, collision, theft_fire, natural_disasters, comprehensive_with_excess, driver_damage, pay_per_kilometer, fleet
	"insurance_company": "Atlanta sanad", //string
	"insurance_company_phone_number": "0522957800", //string
	"policy_number": "1651.3401.317977", //string
	"insurance_intermediary": "Assurance al amane", //string
	"insurance_start_date": "31/08/2025", //date
	"insurance_end_date": "30/08/2026", //date
	"number_of_covered_seats": "6", //number
	"total_amount": "3862.75", //number
	"notes": "Lorem lorem lorem" //text/string
}

//Vehicle AND Sub rental Vehicle are storing in the same table !!


# Sub-Rental Vehicles

GET /sub-rental-vehicles

POST /sub-rental-vehicles

GET /sub-rental-vehicles/{id}

PUT /sub-rental-vehicles/{id}

DELETE /sub-rental-vehicles/{id}
// Sub Rental Vehicle Json
{
	"registration_number": "123456WW", //string
	"brand": "Dacia", //string
	"model": "Duster",//string
	"year": "2024",//year	-5 year =< now()(year) the car age has to  have maximum 5years
	"vehicle_release_date": "01/01/2024",//date
	"mileage": "91400", //number
	"number_of_seats": "5", //number
	"fuel_type": "petrol",//enum : 'petrol' 'diesel 'electric' 'hybrid';
	"status": "available",//enum : available, in_maintenance, reserved, in_accident
	"rental_price_per_day": "300", //number
	"gearbox_type": "manual",//enum : automatic, manual
	"air_conditioning": true, //boolean
	"vehicle_type": "sedan"  //enum : 'sedan' 'hatchback' 'wagon' 'suv' 'crossover' 'minivan' 'luxury'

	"is_sub_rental": true, //boolean
	"partner_id": 1, //select from db
	"rental_price_per_day_from_partner": "250" //number
}

// Invoice json
# Invoices

GET /invoices

POST /invoices

GET /invoices/{id}

PUT /invoices/{id}

DELETE /invoices/{id}

{
  "client_id": 1, // select from db
  "invoice_number": "INV-2025-001", // string (I think it should be generated in the backend
  "invoice_date": "2025-08-31", // date
  "delivery_date": "2025-09-02", //date
  "due_date": "2025-09-15", //date
  "paid_date": null, //date
  "subtotal": 1000.00, //number
  "discount": 50.00, //number
  "subtotal_after_discount": 950.00, //number
  "tax_rate": 20.00, //select enum : 0, 7, 10, 14, 20
  "tax_amount": 190.00, // number : subtotal * tax_rate/100
  "total_amount": 1140.00, //number : subtotal + subtotal * tax_rate/100
  "status": "sent", //enum : draft, sent, paid, overdue, cancelled, refunded,
  "notes": "First quarter services invoice", //string / text
  "payment_method": null, // enum : cash, bank_transfer, cheque, credit_card
  "payment_reference": null, // string
  "invoice_items": [
    {
      "description": "Web Development Services", // string
      "quantity": 40, // number
      "unit_price_excluding_tax": 15.00, //number
      "total_price_excluding_tax": 600.00 // number = quantity * unit_price_excluding_tax
    },
    {
      "description": "Hosting Services",
      "quantity": 1,
      "unit_price_excluding_tax": 200.00,
      "total_price_excluding_tax": 200.00
    },
    {
      "description": "Domain Registration",
      "quantity": 2,
      "unit_price_excluding_tax": 100.00,
      "total_price_excluding_tax": 200.00
    }
  ]
}
