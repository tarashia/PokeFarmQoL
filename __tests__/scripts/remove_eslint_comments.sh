#!/bin/bash
OUTPUT="$1"
TMP_FILE="$2"

# remove eslint lines
cp "${OUTPUT}" "${TMP_FILE}"
# globals multiline regex: \/\* globals? .*? \*\/
mapfile -t matches < <(grep -Pzo '(?s)\s*\/\* globals? .*?\*\/' "${OUTPUT}")
unset matches[0]
for m in "${matches[@]}"
do
   ESCAPED=$(printf '%s\n' "$m" | sed -e 's/[*\/&]/\\&/g')
   sed -i -- "s|${ESCAPED}||g" ${TMP_FILE}
done
mv $TMP_FILE ${OUTPUT}
# globals single line regex: \/\/ globals? .*
egrep -v '^\s*\/\/ globals? .*' ${OUTPUT} >> $TMP_FILE
mv $TMP_FILE ${OUTPUT}
# eslint single line regex: \/\/ eslint.*
egrep -v '^\s*\/\/ eslint.*' ${OUTPUT} >> $TMP_FILE
mv $TMP_FILE ${OUTPUT}