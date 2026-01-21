# Sanity CMS Configuration

This directory contains the Sanity CMS configuration for managing the tattoo gallery.

## Directory Structure

```
sanity/
├── schemas/          # Content type definitions
│   ├── tattoo.ts    # Tattoo content type schema
│   └── index.ts     # Schema exports
└── lib/             # Utilities and API clients
    ├── client.ts    # Sanity client configuration
    ├── image.ts     # Image URL builder
    └── queries.ts   # GROQ queries for fetching data
```

## Key Files

### `schemas/tattoo.ts`
Defines the structure of a tattoo entry:
- `title`: The tattoo name
- `image`: The tattoo image (with hotspot cropping)
- `alt`: Accessibility text
- `size`: Display size (small/medium/large)
- `order`: Display order in gallery

### `lib/client.ts`
Sanity client for fetching data from your CMS.

### `lib/queries.ts`
GROQ queries used to fetch tattoos from Sanity.

### `lib/image.ts`
Utility for generating optimized image URLs from Sanity.

## Adding New Content Types

To add new content types (e.g., blog posts, testimonials):

1. Create a new schema file in `schemas/`
2. Import and add it to `schemas/index.ts`
3. Create corresponding queries in `lib/queries.ts`
4. Update components to fetch the new data

## Studio Access

The Sanity Studio is available at `/studio` when running the dev server.
