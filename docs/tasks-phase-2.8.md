# ✅ Phase 2.8 – Settings Module: Implementation Checklist

## 1️⃣ Pre-Implementation
- [x] Verify `settings` table schema (all fields: site_name, logo_url, theme, primary_color, contact_email, contact_phone, social, analytics, meta_title, meta_desc)
- [x] Confirm RLS policies (public SELECT, admin UPDATE/INSERT)
- [x] Confirm `SupabaseSettingsRepository` has get/update methods
- [x] Confirm settings schemas defined (`SettingsSchema`, `UpdateSettingsDTO`)
- [x] Confirm admin route `/admin/settings` exists

---

## 2️⃣ Hook & Utilities
- [x] Create `src/lib/hooks/useSettings.ts`
  - [x] Expose: `settings`, `loading`, `saving`, `error`
  - [x] Methods: `updateSettings`, `refresh`
  - [x] Auto-fetch on mount
  - [x] Toast notifications for success/error

---

## 3️⃣ Form Components
### A. Main Settings Page
- [x] Update `src/Pages/Admin/Settings.jsx`
  - [x] Header with title + last updated timestamp
  - [x] Bootstrap Nav Tabs (5 tabs)
  - [x] Tab content area with forms
  - [x] Loading skeleton on initial load
  - [x] Replace placeholder with functional interface

### B. Settings Tabs
- [x] Create `src/Components/Admin/Forms/SettingsGeneralForm.jsx`
  - [x] Fields: site_name, meta_title, meta_desc
  - [x] Zod validation
  - [x] Save + Reset buttons
  - [x] Form pre-population from settings

- [x] Create `src/Components/Admin/Forms/SettingsBrandingForm.jsx`
  - [x] Fields: logo_url, primary_color, theme
  - [x] Color picker integration
  - [x] Theme dropdown (light/dark/auto)
  - [x] Save + Reset buttons

- [x] Create `src/Components/Admin/Forms/SettingsSocialForm.jsx`
  - [x] Fields: facebook, twitter, linkedin, instagram, youtube
  - [x] URL validation
  - [x] Store as JSON object
  - [x] Save + Reset buttons

- [x] Create `src/Components/Admin/Forms/SettingsAnalyticsForm.jsx`
  - [x] Fields: plausible_site_id, google_analytics_id
  - [x] Store as JSON object
  - [x] Save + Reset buttons

- [x] Create `src/Components/Admin/Forms/SettingsContactForm.jsx`
  - [x] Fields: contact_email, contact_phone
  - [x] Email + phone validation
  - [x] Save + Reset buttons

### C. Utility Components
- [x] Create `src/Components/Admin/Forms/ColorPicker.jsx`
  - [x] HTML5 color input
  - [x] Text input for manual hex entry
  - [x] Color preview swatch
  - [x] Hex format validation

---

## 4️⃣ Data Flow
- [x] Settings load on mount (singleton, create if doesn't exist)
- [x] Each tab saves independently
- [x] Client-side Zod validation before submission
- [x] Toast notifications on success/error
- [x] UI refreshes after save

---

## 5️⃣ Testing
### Settings Forms
- [ ] General tab saves site name, meta title, meta description
- [ ] Branding tab saves logo URL, primary color, theme
- [ ] Social tab saves all platform URLs as JSON
- [ ] Analytics tab saves tracking IDs as JSON
- [ ] Contact tab saves email and phone
- [ ] Validation errors display correctly for each field
- [ ] Success toasts show after each tab save
- [ ] Forms pre-populate with existing values on load
- [ ] Reset button reverts unsaved changes per tab

### Data Persistence
- [ ] Settings persist across page reloads
- [ ] Only one settings record exists (singleton pattern)
- [ ] RLS prevents non-admin modifications
- [ ] Public site can read settings for display

### UI/UX
- [ ] Tabs switch smoothly without data loss
- [ ] Loading states display during fetch/save
- [ ] Color picker shows live preview
- [ ] Mobile responsive on all tabs
- [ ] Last updated timestamp displays correctly

### Security
- [ ] RLS enforced (admin-only modifications)
- [ ] Zod validation prevents invalid data
- [ ] URL fields validated (social media, logo)
- [ ] Email field validated
- [ ] Hex color format validated

---

## 6️⃣ Documentation
- [ ] Update `docs/changelog.md` → v0.13.0
- [ ] Update `docs/backend.md` → Settings module complete
- [ ] Update `docs/architecture.md` → Settings flow diagrams
- [ ] Update `docs/tasks.md` → mark 3.8 complete

---

## ✅ Success Criteria
- [x] All 5 tabs functional with save capability
- [x] Settings loaded on mount (singleton pattern)
- [x] Each tab saves independently without affecting others
- [x] Color picker with live preview
- [x] JSON fields (social, analytics) properly structured
- [x] RLS enforced (admin-only modifications)
- [x] Zod validation prevents invalid data
- [x] Toast notifications for user feedback
- [ ] Documentation fully updated

---

## 📊 Implementation Status

### ✅ Completed
- `useSettings` hook with full CRUD operations
- All 5 settings form components (General, Branding, Social, Analytics, Contact)
- ColorPicker utility component
- Main Settings page with tabbed interface
- RLS policies verified
- Zod validation for all forms
- Toast notifications integrated
- Loading and saving states
- Reset functionality per form

### 🔄 Ready for Testing
- Form functionality (all tabs)
- Data persistence
- RLS enforcement
- UI/UX behavior
- Mobile responsiveness

### 📝 Pending
- Documentation updates (changelog, backend.md, architecture.md)
- Manual testing verification
- Edge case testing

---

## 🎯 Next Steps
1. **Manual Testing** - Verify all forms work correctly in admin panel
2. **Update Documentation** - Complete changelog, backend.md, architecture.md
3. **Edge Case Testing** - Test with empty settings, invalid data, etc.
4. **Phase 2.9 Prep** - Move to next module once testing complete
