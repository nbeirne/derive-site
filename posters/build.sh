
prompts=$(cat ../prompts.json | jq '.[].text' | sed -e 's/\\n/\\\\\\\\break /g' | jq -r | sed 's/^/- /g')
prompts=$(echo "$prompts" | perl -pe 's/\n/\\n/')

template=$(cat << 'END'
---
output:
  pdf_document:
    template: poster_template.tex
postertext:
$prompts$
---
END
)
echo "$prompts"
text=$(echo "$template" | sed -e "s/\\\$prompts\\\$/$prompts/")
echo "$text"

# write data
rm -rf template.md
echo "$text" >> template.md
pandoc -f markdown -t pdf ./template.md -o posters.pdf --template ./poster_template.tex
rm -rf template.md

