# Setup instructions
--- git clone <your-repo-url>
--- cd product-explorer-dashboard
--- npm install

# Run Locally
--- npm run dev

# Features implemented
# Product Listing
- Fetches products from the Fake Store API
- Displays products in a responsive grid layout
- Displays product image, title, price, and category

# Search & Filtering
- Client-side search by product title
- Category-based filtering
- Combined filtering (search and category)
- Optional filter to display favorites only

# Product Details Page
- Dynamic routing using Next.js App Router
- Route: /products/[id]
- Displays large product image, title, description, price, and category

# Favorites Feature
- Mark and unmark products as favorites
- Favorites persisted using localStorage
- Favorites state restored on page reload
- Filter to view only favorited products

# Responsive Design
- Mobile-first layout
- Optimized for mobile, tablet, and desktop
- Clean and accessible UI built with Tailwind CSS

# Assumptions / Trade-offs
- Client-side filtering is used since the dataset is small and static.
- Favorites are stored in localStorage to persist state without a backend.
- No global state library was used to keep the application simple and maintainable.
- Pagination and advanced optimizations were excluded to stay within the assignment scope.
