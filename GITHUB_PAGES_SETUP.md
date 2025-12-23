# GitHub Pages Setup Guide

This guide will help you configure your repository to deploy to GitHub Pages using GitHub Actions.

## Prerequisites

- A GitHub account
- A public repository (or GitHub Pro for private repos)
- Admin access to the repository

## Step-by-Step Setup

### Step 1: Enable GitHub Pages with GitHub Actions

1. Navigate to your repository on GitHub: `https://github.com/ryanphanna/Pass-Map`

2. Click on **Settings** (in the top navigation bar)

3. In the left sidebar, scroll down and click on **Pages**

4. Under **Build and deployment**, you'll see a **Source** dropdown:
   - Click the dropdown
   - Select **"GitHub Actions"**
   - Do NOT select "Deploy from a branch"

5. You should see a message like: "Your site is ready to be published at https://ryanphanna.github.io/Pass-Map/"

### Step 2: Configure Workflow Permissions

1. Still in **Settings**, click on **Actions** in the left sidebar

2. Click on **General** under the Actions menu

3. Scroll down to the **Workflow permissions** section at the bottom of the page

4. Select the radio button for **"Read and write permissions"**

5. Check the box for **"Allow GitHub Actions to create and approve pull requests"**

6. Click the **Save** button

### Step 3: Trigger a Deployment

The workflow is configured to run automatically on pushes to `main` or `claude/*` branches.

To trigger a deployment:

```bash
# Make a small change (or use the GitHub UI to trigger workflow_dispatch)
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

Or manually trigger from the GitHub UI:
1. Go to **Actions** tab
2. Click on **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select the `main` branch
5. Click **Run workflow**

### Step 4: Verify Deployment

1. Go to the **Actions** tab in your repository

2. You should see a workflow run for "Deploy to GitHub Pages"

3. Click on the workflow run to see the details

4. Wait for both the "build" and "deploy" jobs to complete (they should show green checkmarks)

5. Once complete, visit: `https://ryanphanna.github.io/Pass-Map/`

6. You should see your app running!

## Common Issues and Solutions

### Issue: 403 Forbidden Error

**Cause**: GitHub Pages source is not set to "GitHub Actions" OR workflow permissions are incorrect

**Solution**:
- Verify Settings → Pages → Source is set to "GitHub Actions"
- Verify Settings → Actions → General → Workflow permissions is set to "Read and write permissions"

### Issue: 404 Not Found Error

**Cause**: Site hasn't been deployed yet OR base path is incorrect

**Solution**:
- Check that at least one workflow run has completed successfully
- Verify `vite.config.js` has `base: '/Pass-Map/'` (matching your repository name)
- Wait 1-2 minutes for DNS propagation after first deployment

### Issue: Workflow Runs but Site Doesn't Update

**Cause**: GitHub Pages may still be set to deploy from a branch

**Solution**:
- Go to Settings → Pages
- Ensure Source is "GitHub Actions" not "Deploy from a branch"
- Re-run the workflow from the Actions tab

### Issue: Private Repository

**Cause**: GitHub Pages for private repositories requires GitHub Pro, Team, or Enterprise

**Solution**:
- Make the repository public, OR
- Upgrade to GitHub Pro or higher

## Verification Checklist

Use this checklist to ensure everything is configured correctly:

- [ ] Repository Settings → Pages → Source is set to "GitHub Actions"
- [ ] Repository Settings → Actions → General → Workflow permissions is "Read and write"
- [ ] `.github/workflows/deploy.yml` file exists in the repository
- [ ] `vite.config.js` has `base: '/Pass-Map/'`
- [ ] Workflow run completes successfully (green checkmark in Actions tab)
- [ ] Site loads at `https://ryanphanna.github.io/Pass-Map/`

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [deploy-pages Action](https://github.com/actions/deploy-pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)

## Need Help?

If you're still experiencing issues:

1. Check the workflow logs in the Actions tab for error messages
2. Verify all configuration settings match this guide
3. Try deleting and re-running the workflow
4. Create an issue in this repository with the error details
