#!/bin/bash

# Deployment script for Isaac Ajifowobaje's personal website
# Run this script from your local machine to deploy to Hetzner

# Configuration
SERVER_IP="YOUR_SERVER_IP_HERE"  # Replace with your actual server IP
DOMAIN="your-domain.com"          # Replace with your actual domain
SERVER_USER="root"

echo "🚀 Starting deployment to Hetzner..."

# Build the project
echo "📦 Building React app..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Upload files to server
echo "📤 Uploading files to server..."
rsync -avz --delete dist/ $SERVER_USER@$SERVER_IP:/var/www/isaacaji/

if [ $? -ne 0 ]; then
    echo "❌ Upload failed!"
    exit 1
fi

echo "✅ Files uploaded successfully!"

# Restart nginx
echo "🔄 Restarting nginx..."
ssh $SERVER_USER@$SERVER_IP "systemctl restart nginx"

if [ $? -ne 0 ]; then
    echo "❌ Nginx restart failed!"
    exit 1
fi

echo "✅ Nginx restarted successfully!"

echo "🎉 Deployment completed!"
echo "🌐 Your website should be live at: http://$DOMAIN"
echo "🔒 Don't forget to set up SSL certificate with: sudo certbot --nginx -d $DOMAIN"
