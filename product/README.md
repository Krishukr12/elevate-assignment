# Product Listing Page

This is a simple front-end application that displays a list of products. It features a search with debouncing to filter products and includes pagination.

## Preview

![Product Listing Page Preview](./public/product-preview.png)

## Features

- Display a grid of products with images, titles, prices, and categories.
- Search functionality to filter products by title.
- Debounced search input to improve performance.
- Pagination to navigate through the product list.
- Responsive design for different screen sizes.

## Tech Stack

- **Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed on your system.

### Installation

1. Clone the repository:
   ```sh
   git clone <git@github.com:Krishukr12/elevate-assignment.git>
   ```
2. Navigate to the project directory:
   ```sh
   cd product
   ```
3. Install the dependencies using pnpm:
   ```sh
   pnpm install
   ```

### Running the Development Server

To start the Vite development server, run the following command:

```sh
pnpm dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

In the project directory, you can run:

- `pnpm dev`: Runs the app in development mode.
- `pnpm build`: Builds the app for production.
- `pnpm lint`: Lints the source code using ESLint.
- `pnpm preview`: Serves the production build locally.
