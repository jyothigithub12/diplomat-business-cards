# Smart Business Cards

A modern, responsive digital business card system that creates unique URLs for each employee. Perfect for deployment on GitHub Pages.

## Features

- **Individual Employee Pages**: Each employee gets their own unique URL (e.g., `/muhammad-tahir`)
- **Professional Design**: Clean, modern interface with smooth animations
- **Contact Integration**: Click-to-call, click-to-email, and vCard download
- **Social Media Links**: LinkedIn, Twitter, Instagram, and Facebook integration
- **QR Code Generation**: Easy sharing via QR codes
- **Responsive Design**: Works perfectly on all devices
- **Employee Directory**: Central listing of all team members

## Deployment Instructions

### For GitHub Pages:

1. **Fork/Clone this repository**
2. **Update the base URL** in `vite.config.ts`:
   ```typescript
   base: '/your-repository-name/',
   ```
3. **Add your employees** in `src/data/employees.ts`
4. **Build and deploy**:
   ```bash
   npm run build
   ```
5. **Enable GitHub Pages** in your repository settings and select the `dist` folder

### URL Structure:
- Main directory: `https://yourusername.github.io/your-repo-name/`
- Employee cards: `https://yourusername.github.io/your-repo-name/employee-id`

## Adding New Employees

Edit `src/data/employees.ts` and add new employee objects:

```typescript
{
  id: 'employee-url-id',
  name: 'Employee Name',
  title: 'Job Title',
  company: 'Company Name',
  email: 'email@company.com',
  phone: '+1 (555) 123-4567',
  // ... additional fields
}
```

## Customization

- **Colors**: Modify the theme colors in each employee's data
- **Styling**: Update Tailwind classes in components
- **Content**: Add/remove fields in the Employee interface
- **Branding**: Update company information and logos

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- React Router
- Lucide React (icons)
- Vite

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to see your application.