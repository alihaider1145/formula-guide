#!/usr/bin/env bash

# usage: ./make_chapters.sh path/to/dir

set -e

DIR="$1"

if [ -z "$DIR" ]; then
  echo "Error: directory path required"
  exit 1
fi

mkdir -p "$DIR"

chapters=(one two three four five six seven eight nine ten)

# create chapter files
for i in "${!chapters[@]}"; do
  name="${chapters[$i]}"
  cat > "$DIR/chapter-$name.json" <<EOF
{
  "chapter_number": $((i + 1)),
  "chapter_name": "$name",
  "title": "",
  "content": []
}
EOF
done

# create index.json
cat > "$DIR/index.json" <<EOF
{
  "chapters": [
$(for i in "${chapters[@]}"; do
    echo "    \"chapter-$i.json\"$( [ "$i" != "ten" ] && echo "," )"
  done)
  ]
}
EOF

echo "Created chapter-one.json through chapter-ten.json and index.json in $DIR"
