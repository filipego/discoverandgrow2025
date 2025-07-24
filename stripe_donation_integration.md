# Stripe Donation Integration – Discover and Grow

## 🧾 Overview
Integrate a Stripe-powered donation form into the Discover and Grow website, allowing donors to make **one-time or recurring contributions**. The form will live inside a **custom Prismic slice**, visually styled to match the donation page shared earlier.

---

## ✅ Goals

- Accept one-time and recurring donations (monthly).
- Offer preset tiers **($25, $50, $100, $500, $1,000+)** and allow **custom amounts**.
- Keep donors **on-site** using **Stripe Elements** (not redirect).
- Send branded **thank you emails** and **receipts** with Stripe.
- Allow donors to **cancel/manage subscriptions** via Stripe Customer Portal.
- Support full **testing** using Stripe test environment.

---

## 🛠 Tech Requirements

### 1. Stripe Setup
- [ ] Use **Stripe Elements** to securely embed payment fields.
- [ ] Form supports:
  - [ ] Preset amounts ($25, $50, $100, $500, $1,000)
  - [ ] Optional “Other Amount” input
  - [ ] One-Time vs Monthly toggle
- [ ] Accept dynamic input amounts via frontend form
- [ ] Use **Stripe API** for payment processing
- [ ] Store **Stripe secret & publishable keys** securely via environment variables

### 2. Prismic Slice
- [ ] Create a **responsive slice** with:
  - [ ] Text/graphic section on the left (editable via Prismic)
  - [ ] Stripe form embedded on the right
  - [ ] Optional call-to-action buttons (Monthly / One-Time toggle)
- [ ] Thank You Message / Success State lives within the slice OR
- [ ] Optional redirect to `/thank-you` page

### 3. Email + Subscription Management
- [ ] Enable **Stripe email receipts**
- [ ] Customize Stripe emails:
  - [ ] Add logo & colors
  - [ ] Include **thank you message**
  - [ ] Include link to **Stripe Customer Portal**
- [ ] Set up Customer Portal to allow:
  - [ ] Canceling monthly donations
  - [ ] Updating payment method

### 4. Developer Notes
- [ ] Use Stripe’s test cards to QA before going live
- [ ] No iframes — use **Stripe Elements** JS SDK for a seamless UI
- [ ] All sensitive logic runs server-side or via MCP
- [ ] All UI components and logic must be:
  - [ ] Modular
  - [ ] Reusable
  - [ ] Editable through Prismic

---

## ✨ Optional Enhancements (Future)
- Send custom thank you emails using a service like **Resend** or **Postmark**
- Connect to newsletter (e.g. ConvertKit) via webhook
- Offer donation “in honor of” options

---

## 🔐 API Keys Needed
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`

(Make sure these are set up securely depending on deployment platform)

---

## 📄 Final Deliverables
- [ ] Working donation form embedded in Prismic slice
- [ ] Functional one-time and recurring donation flows
- [ ] Stripe email customization complete
- [ ] Deployed and tested on staging, then production
