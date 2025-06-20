# Form Slice Migration - File List

Complete list of files you need to copy from this project to migrate the Form slice functionality to another Next.js project.

## 📁 Required Files to Copy

### 🎯 **Core Form Slice**
```
src/slices/Form/
├── index.tsx                 # Main Form slice component
├── model.json               # Prismic slice configuration
└── mocks.json              # Mock data for development
```

### 🎨 **Form Components**
```
src/app/components/Forms/
├── DynamicForm.tsx          # Main form component with validation
├── CustomInput.tsx          # Custom styled input field
├── CustomTextarea.tsx       # Custom styled textarea
├── CustomSelect.tsx         # Custom dropdown component
├── CustomCheckbox.tsx       # Custom checkbox component
├── CustomRadio.tsx          # Custom radio button component
└── CustomCheckboxGroup.tsx  # Multiple checkbox selection
```

### 🧠 **Validation & Utilities**
```
src/lib/
├── dynamicValidation.ts     # Zod schemas for form validation
└── rateLimit.ts            # Rate limiting functionality
```

### 📧 **Email Templates**
```
src/emails/
├── DynamicFormEmail.tsx            # Email sent to admin with form data
└── DynamicThankYouEmail.tsx        # Thank you email sent to user
```

### 🚀 **API Routes**
```
src/app/api/forms/
└── submit/
    └── route.ts            # Form submission handler
```

### ⚙️ **Configuration Files**
```
package.json                # Dependencies (see below for specific packages)
.env.local                 # Environment variables template
```

## 📦 **Required Dependencies**

Add these to your `package.json`:

```json
{
  "dependencies": {
    "@hookform/resolvers": "^4.0.0",
    "@marsidev/react-turnstile": "^1.1.0",
    "@react-email/components": "0.0.33",
    "react-hook-form": "^7.54.2",
    "resend": "^4.1.2",
    "zod": "^3.24.2",
    "lru-cache": "^11.1.0"
  },
  "devDependencies": {
    "react-email": "3.0.7"
  }
}
```

## 🔐 **Environment Variables**

Add to your `.env.local`:

```env

# Resend (for email sending)
RESEND_API_KEY=your-resend-api-key

# Turnstile (for captcha - optional)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key
TURNSTILE_SECRET_KEY=your-turnstile-secret-key
```

## 📧 **Email-Only Storage**

This form system sends emails via Resend but doesn't store form data in a database. All form submissions are sent as emails to the specified notification email address.

## 🎯 **What Each File Does**

- **Form slice (`src/slices/Form/`)**: The main Prismic slice that renders dynamic forms
- **Form components**: Custom styled form controls (inputs, selects, checkboxes, etc.)
- **DynamicForm.tsx**: Main form logic with validation and submission
- **Validation**: Zod schemas that adapt to different field types
- **Email templates**: React Email components for sending notifications
- **API route**: Handles form submissions, validation, and email sending
- **Utilities**: Rate limiting functionality

## 🚀 **After Copying Files**

1. Install dependencies: `npm install`
2. Set up environment variables
3. Configure Resend for email sending
4. Add the Form slice to your Prismic repository
5. Import the slice in your main slice index file

## 📝 **Notes**

- All form components are fully styled with Tailwind CSS
- Includes accessibility features (ARIA labels, keyboard navigation)
- Supports all field types: text, email, phone, url, textarea, select, radio, checkbox, checkbox groups
- Has built-in validation with proper error handling
- Includes rate limiting and honeypot spam protection
- Optional Turnstile captcha integration
- Responsive design (half-width and full-width fields) 