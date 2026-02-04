#!/bin/bash

# Responsive Image Generator
# Creates multiple sizes of images for srcset

set -e

echo "🖼️  Responsive Image Generator"
echo "==============================="

SRC_DIR="public/images"
SIZES=(320 640 1024 1920)

# Process WebP files to generate responsive versions
process_webp() {
    local file="$1"
    local dirname=$(dirname "$file")
    local basename=$(basename "$file" .webp)
    
    for size in "${SIZES[@]}"; do
        local output="${dirname}/${basename}-${size}w.webp"
        if [ ! -f "$output" ]; then
            echo "  Creating: ${basename}-${size}w.webp"
            npx -y sharp-cli -i "$file" -o "$output" --width $size --quality 80 2>/dev/null || true
        fi
    done
}

# Find hero and portfolio images to process (most critical for responsive)
echo "📁 Processing hero images..."
for f in public/images/hero/*.webp; do
    [ -f "$f" ] && [[ ! "$f" =~ -[0-9]+w\.webp$ ]] && process_webp "$f"
done

echo "📁 Processing portfolio images..."
for f in public/images/portfolio/*.webp; do
    [ -f "$f" ] && [[ ! "$f" =~ -[0-9]+w\.webp$ ]] && process_webp "$f"
done

echo "📁 Processing team images..."
for f in public/images/team/*.webp; do
    [ -f "$f" ] && [[ ! "$f" =~ -[0-9]+w\.webp$ ]] && process_webp "$f"
done

echo ""
echo "✅ Responsive images generated!"
echo "📊 Total responsive variants: $(find $SRC_DIR -name '*-*w.webp' | wc -l)"
