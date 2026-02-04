#!/bin/bash
# Convert all .jpeg images in public/images/ to .webp
# Requires npx and sharp-cli

echo "Starting WebP conversion..."
find public/images -name "*.jpeg" -print0 | while IFS= read -r -d '' file; do
    webp_file="${file%.*}.webp"
    if [ ! -f "$webp_file" ]; then
        echo "Converting: $file -> $webp_file"
        # Extract directory and filename for safer handling
        dirname=$(dirname "$file")
        filename=$(basename "$file")
        webp_filename="${filename%.*}.webp"
        
        # Use npx sharp-cli to convert
        # Note: sharp-cli takes -i input -o output
        npx -y sharp-cli -i "$file" -o "$dirname/$webp_filename" --quality 80
        
        if [ $? -eq 0 ]; then
            echo "✓ Converted"
        else
            echo "✗ Failed to convert $file"
        fi
    else
        echo "Skipping (exists): $webp_file"
    fi
done

echo "WebP conversion complete."
