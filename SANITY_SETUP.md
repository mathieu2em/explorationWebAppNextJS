# 🎨 Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for managing your tattoo gallery images without touching code.

## 📋 What is Sanity CMS?

Sanity is a headless CMS that gives you:
- ✅ Beautiful admin interface at `/studio`
- ✅ Drag-and-drop image uploads
- ✅ Easy content editing (title, description, size)
- ✅ 100% FREE for your use case (3 users, 5GB assets, unlimited API requests)
- ✅ Automatic image optimization and CDN
- ✅ No credit card required

## 🚀 Setup Steps

### Step 1: Install Dependencies

```bash
npm install
```

This will install all the Sanity packages that have been added to your `package.json`.

### Step 2: Create a Sanity Account & Project

1. Go to [sanity.io](https://www.sanity.io/)
2. Click "Get started for free"
3. Sign up with GitHub, Google, or email
4. Once logged in, click "Create new project"
5. Choose a project name (e.g., "Tattoo Artist Portfolio")
6. Select "Production" as the dataset name
7. Copy your **Project ID** (it looks like: `abc123de`)

### Step 3: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your Sanity credentials:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

   Replace `your_project_id_here` with the Project ID you copied from Sanity.

### Step 4: Add CORS Origins (Security)

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Go to "API" → "CORS Origins"
4. Click "Add CORS origin"
5. Add these origins:
   - `http://localhost:3000` (for local development)
   - Your Vercel production URL (e.g., `https://your-app.vercel.app`)
   - Enable "Allow credentials" for both

### Step 5: Deploy Sanity Studio

Run this command to make your Studio accessible:

```bash
npm run dev
```

Then visit: **http://localhost:3000/studio**

You should see the Sanity Studio interface! 🎉

### Step 6: Add Your First Tattoo

1. In the Studio, click the "+" button or "Tattoo" in the sidebar
2. Fill in the fields:
   - **Title**: The name of the tattoo (e.g., "Dragon on Shoulder")
   - **Image**: Click to upload your image
   - **Alt Text**: Description for accessibility (e.g., "Black and grey dragon tattoo")
   - **Display Size**: Choose Small, Medium, or Large (controls grid layout)
   - **Display Order**: Number to control position (0 = first, 1 = second, etc.)
3. Click "Publish"

That's it! Your image will appear on the website.

## 📸 Adding the Image from GitHub Issue #3

Now that Sanity is set up, you can add the image from the GitHub issue:

1. Download the image from: https://github.com/user-attachments/assets/926d031f-a92c-48df-94b8-7b1e9c9d021e
2. Go to http://localhost:3000/studio
3. Click "Tattoo" → "Create new"
4. Upload the downloaded image
5. Add a title and description
6. Choose the display size (small, medium, or large)
7. Set the display order (use 0 to put it first, or a higher number)
8. Click "Publish"

The image will immediately appear on your website!

## 🌐 Deploying to Vercel

Your Vercel deployment will work automatically once you:

1. Add environment variables to Vercel:
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_SANITY_PROJECT_ID` = your project ID
     - `NEXT_PUBLIC_SANITY_DATASET` = production

2. Redeploy your site (Vercel will do this automatically when you push to main)

## 🎯 How to Use Studio (Quick Reference)

### Access Studio
- **Local**: http://localhost:3000/studio
- **Production**: https://your-domain.com/studio

### Add New Tattoo
1. Click "Tattoo" in sidebar
2. Click "+" button
3. Fill in all fields
4. Click "Publish"

### Edit Existing Tattoo
1. Click "Tattoo" in sidebar
2. Select the tattoo from the list
3. Make your changes
4. Click "Publish"

### Reorder Tattoos
- Change the "Display Order" number (lower numbers appear first)
- The gallery automatically updates

### Display Sizes Explained
- **Small**: Takes 1 grid cell (1×1)
- **Medium**: Takes 2 horizontal cells (2×1)
- **Large**: Takes 4 cells (2×2) - best for showcase pieces

## 🔄 How It Works

1. **Before Sanity**: Images were hardcoded in the component file
2. **After Sanity**: Images are fetched from Sanity CMS
3. **Fallback**: If Sanity isn't configured, the app uses the old hardcoded images
4. **Automatic**: Changes in Sanity Studio appear on the website immediately (with CDN caching)

## 💰 Pricing (Always Free for You)

Sanity's Free tier includes:
- ✅ 3 users (you + 2 collaborators)
- ✅ 10,000 API requests/day (way more than you need)
- ✅ 5GB asset storage (~500-1000 high-res tattoo images)
- ✅ 10GB bandwidth/month
- ✅ No credit card required

You will **never** hit these limits with a portfolio website.

## 🆘 Troubleshooting

### "Invalid projectId" error
- Make sure you copied the Project ID correctly from sanity.io/manage
- Check that `.env.local` has no extra spaces or quotes

### Studio shows "403 Forbidden"
- Add CORS origins in sanity.io/manage (see Step 4)
- Make sure you added both localhost and your production URL

### Images not showing
- Check that you clicked "Publish" (not just "Save")
- Verify environment variables are set in Vercel
- Clear your browser cache

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders, then `npm install`

## 📝 Next Steps

1. **Migrate existing images**: You can add all your current tattoo images to Sanity Studio
2. **Remove fallback data**: Once all images are in Sanity, you can remove the hardcoded `fallbackTattooImages` array from `TattooCarousel.tsx`
3. **Add more fields**: You can extend the schema to include more info (artist notes, date, tags, etc.)

## 🔗 Useful Links

- [Sanity Dashboard](https://www.sanity.io/manage)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/plugins/next-sanity)

---

**Questions?** Check the [Sanity Community](https://www.sanity.io/exchange/community) or open an issue on GitHub.

✨ **Enjoy your new CMS-powered tattoo gallery!**
