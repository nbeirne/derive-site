

prompts=$(cat ../prompts.json| jq '.prompts[] | {"text": .text | sub("\n";"\\\\break ";"g"), "size"}')

prompts=$(echo "$prompts" | jq -c | sed 's/^/- /g') # format for yaml
prompts=$(echo "$prompts" | perl -pe 's/\n/\\n/') # replace newlines

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
pandoc --pdf-engine=xelatex -f markdown -t pdf ./template.md -o posters.pdf --template ./poster_template.tex
rm -rf template.md

