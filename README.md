# Spice and More

A modern e-commerce website built with React and Vite, featuring products from Cosmetics, Herbs, and Incense categories.

## Features

- 🛍️ Product catalog with category filtering
- 🎨 Modern, responsive UI with Tailwind CSS
- 📱 Mobile-first design
- 🔄 Dynamic content management with Strapi Cloud

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Strapi Cloud account (for content management)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spice-and-more
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Strapi Cloud configuration:

```env
VITE_STRAPI_API_URL=https://your-project.strapi.app
VITE_STRAPI_API_TOKEN=your-api-token-here
```

   **Note:** If your Strapi content is public, you can leave `VITE_STRAPI_API_TOKEN` empty.

4. Start the development server:
```bash
npm run dev
```

## Strapi Cloud Setup

### 1. Create a Content Type in Strapi

In your Strapi Cloud admin panel, create a new Content Type called `Product` with the following fields:

- **name** (Text, Short text, Required)
- **description** (Text, Long text, Optional)
- **category** (Text, Short text, Required) - Values: "Cosmetics", "Herbs", "Incense"
- **image** (Media, Single media, Optional)

### 2. Configure API Permissions

1. Go to **Settings** → **Users & Permissions plugin** → **Roles** → **Public**
2. Enable the following permissions for `Product`:
   - `find` (to fetch all products)
   - `findOne` (to fetch a single product)

### 3. Add Products

1. Go to **Content Manager** → **Product**
2. Click **Create new entry**
3. Fill in the product details:
   - Name
   - Description
   - Category (must be exactly "Cosmetics", "Herbs", or "Incense")
   - Upload an image
4. Click **Save** and then **Publish**

### 4. Get Your API URL

Your Strapi API URL will be in the format:
```
https://your-project-name.strapi.app
```

Use this URL as your `VITE_STRAPI_API_URL` in the `.env` file.

## Project Structure

```
src/
├── components/          # React components
│   ├── CollectionPage/  # Category-specific pages
│   ├── Home/           # Homepage components
│   └── common/         # Shared components
├── hooks/              # Custom React hooks
│   └── useProducts.js  # Hook for fetching products from Strapi
├── pages/              # Page components
├── services/           # API services
│   └── strapi.js       # Strapi API integration
└── data/               # Static data (legacy - now using Strapi)
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Migration from JSON to Strapi

The project has been migrated from hardcoded `products.json` to Strapi Cloud. All product data is now fetched dynamically from your Strapi instance.

### Legacy Data

The original `products.json` file is still present in `src/data/products.json` for reference. You can use it as a template when adding products to Strapi.

## Troubleshooting

### Products not loading

1. Check that your `.env` file has the correct `VITE_STRAPI_API_URL`
2. Verify that your Strapi API permissions are set correctly
3. Check the browser console for error messages
4. Ensure your Strapi instance is running and accessible

### Images not displaying

1. Verify that images are uploaded in Strapi
2. Check that the image field is populated in your products
3. Ensure your Strapi media library permissions allow public access

## License

[Your License Here]
