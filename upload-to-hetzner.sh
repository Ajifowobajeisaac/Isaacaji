#!/bin/bash

# Upload script for Hetzner shared hosting
# This script uploads your React build to Hetzner hosting via FTP

# Configuration - UPDATE THESE VALUES
FTP_HOST="www101.your-server.de"
FTP_USER="your-ftp-username"  # Get this from Hetzner control panel
FTP_PASS="your-ftp-password"  # Get this from Hetzner control panel
REMOTE_DIR="/"  # Root directory of your hosting

echo "🚀 Starting upload to Hetzner shared hosting..."

# Build the project
echo "📦 Building React app..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Copy .htaccess to dist folder
echo "📝 Adding .htaccess file..."
cp .htaccess dist/

# Upload files via FTP
echo "📤 Uploading files to Hetzner hosting..."

# Using lftp for better FTP handling
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
lcd dist;
cd $REMOTE_DIR;
mirror --reverse --delete --verbose .;
quit
"

if [ $? -ne 0 ]; then
    echo "❌ Upload failed!"
    echo "💡 Make sure you have lftp installed: brew install lftp (macOS) or apt install lftp (Linux)"
    exit 1
fi

echo "✅ Files uploaded successfully!"
echo "🌐 Your website should be live at: https://isaacaji.com"
echo "⏰ DNS changes may take up to 24 hours to propagate"
