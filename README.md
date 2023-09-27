# VansBnB Backend

![image](https://github.com/plabram/vans-backend/assets/12176574/99575de1-1844-4e8b-85a2-e0239e92fda2)


Welcome to the VansBnB webapp! It's bit like AirBnB (but for vans).

This repo contains the backend that van owners will use to create an account and publish vans and bookings.

https://vans-backend.onrender.com/api/

### Data models

A typical van owner (`User`) looks like this:
| Field | Type | Example | Required |
| --- | --- | --- | --- |
| `name` | String | "Anne Owner" | True |
| `email` | String | "test@test.com" | True |
| `password` | String | "$2b$10$CzNgdcFSK" | True |
| `vans` | [{Van}] | {title: "An amazing van", id: 1}, {title: "Another amazing van", id: 2} | False |
| `avatar` | String | "https://avatar.com" | False |


Here's a typical `Van` with a `Booking`:
| Field | Type | Example | Required |
| --- | --- | --- | --- |
| `title` | String | "An amazing van" | True |
| `description` | String | "A modern VW California with everything you need for a great stay." | False |
| `images` | [String] | ["image1", "image2"] | False |
| `price` | Number | 50 | False |
| `sleeps` | Number | 3 | False |
| `attributes` | [String] | ["kitchenette", "heating"] | False |
| `drive` | String | "Manual" | False |
| `bookings` | [{Booking}] | {customerId: "10", startDate: "2024-01-01", endDate: "2024-01-10"}, {customerId: "72", startDate: "2024-01-24", endDate: "2024-01-27"} | False |

### Endpoints:

* POST a new User: /auth/register
* POST an existing User: /auth/login
* GET all Users: /users
* GET, PUT (update) or DELETE User: /users/:id
* POST (add) User avatar: /users/:id/upload-avatar
* PUT (add) a new Van to User: /users/:id/vans
* DELETE Van from User: /users/:id/vans/:vanid
* GET all Vans: /vans
* POST (add) Van images: /vans/:vanid/upload-van-image
* GET, PUT (update) or DELETE Van by VanID: /vans/:vanid
* PUT (add) Booking to Van: /vans/:vanid/bookings
* PUT (update) or DELETE Booking: /vans/:vanid/bookings/bookingid
* GET all Bookings: /bookings
* GET Booking by BookingID: /bookings/bookingid
