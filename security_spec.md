# Security Specification - Radhika Sarees Firestore

## 1. Data Invariants
- **Users (`/users/{userId}`)**: Only authenticated users can read or write their own user profile document where `userId == request.auth.uid`. Role privilege escalation is forbidden.
- **Reviews (`/reviews/{reviewId}`)**: Publicly readable. Any authenticated customer can submit a review with rating between 1 and 5, bounded comment length (max 1000 characters), and must set their `userId == request.auth.uid`. Anonymous or spoofed user IDs are rejected.
- **Orders (`/orders/{orderId}`)**: An authenticated user can create an order where `userId == request.auth.uid`. A user can read only their own orders where `resource.data.userId == request.auth.uid`. Status updates can only be executed by administrators.
- **Inquiries (`/inquiries/{inquiryId}`)**: Any visitor can submit a contact message (name, phone, message with bounded size). Inquiries are not publicly listable; read access is restricted to store administrators.

## 2. The Dirty Dozen Malicious Payloads
1. **User Profile Hijack**: Creating `/users/victim_uid` with `request.auth.uid = attacker_uid`.
2. **Ghost Admin Elevation**: Injecting `role: "admin"` into `/users/{uid}` by normal customer.
3. **Review Identity Spoof**: Submitting a review with `userId: "admin_uid"` while signed in as another user.
4. **Rating Boundary Overflow**: Submitting a review with `rating: 99` or `rating: -1`.
5. **Denial-of-Wallet Review Bomb**: Submitting a review with a 5MB character junk comment.
6. **Order Impersonation**: Creating an order with `userId: "target_victim_123"`.
7. **Order Total Poisoning**: Modifying an existing order's `totalAmount` from 12000 to 0 after placement.
8. **Order Status Tampering**: Customer trying to set `orderStatus: "delivered"` or `paymentStatus: "paid"`.
9. **Private Order Peeping**: Querying orders of other customers without matching `userId`.
10. **Inquiry Data Scraping**: Public attacker trying to list or read all customer contact inquiries.
11. **Document ID Buffer Overflow**: Injecting 50KB strings as document IDs to exhaust Firestore memory.
12. **Timestamp Fraud**: Providing fake historic timestamps `createdAt: "1999-01-01"` instead of `request.time`.
