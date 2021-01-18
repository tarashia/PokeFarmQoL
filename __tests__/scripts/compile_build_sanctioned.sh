#!/bin/bash
echo "Compiling code into one js file..."

# Order from Poke-Farm-QoL.user.js
ROOT="."

declare -a INPUT=("${ROOT}/requires/utils/header.txt"
                  "${ROOT}/requires/utils/resources.js"
                  "${ROOT}/requires/utils/helpers.js"
                  "${ROOT}/requires/utils/globals.js"
                  "${ROOT}/requires/utils/evolutionTreeParser.js"
                  "${ROOT}/requires/utils/dexPageParser.js"
                  "${ROOT}/requires/utils/localStorageManager.js"
                  "${ROOT}/requires/utils/dexUtilities.js"
                  "${ROOT}/requires/utils/qolHub.js"
                  "${ROOT}/requires/pages/basePage.js"
                  "${ROOT}/requires/pages/shelterPage.js"
                  "${ROOT}/requires/pages/privateFieldsPage.js"
                  "${ROOT}/requires/pages/publicFieldsPage.js"
                  "${ROOT}/requires/pages/labPage.js"
                  "${ROOT}/requires/pages/fishingPage.js"
                  "${ROOT}/requires/pages/multiuserPage.js"
                  "${ROOT}/requires/pages/farmPage.js"
                  "${ROOT}/requires/pages/daycarePage.js"
                  "${ROOT}/requires/pages/dexPage.js"
                  "${ROOT}/requires/pages/wishforgePage.js"
                  "${ROOT}/requires/utils/pfqol.js"
                  )
OUTPUT="${ROOT}/Poke-Farm-QoL.sanctioned.js"
rm -f "${OUTPUT}"

for FILE in "${INPUT[@]}"; do
   cat "$FILE" >> "${OUTPUT}"
   echo "" >> "${OUTPUT}"
done

## # remove eslint lines
## TMP_FILE="/tmp/output.txt"
## rm -f "${TMP_FILE}"
## # globals multiline regex: \/\* globals? .*? \*\/
## matches=( $(grep -Pzo '(?s)\s*\/\* globals? .*?\*\/' "Poke-Farm-QoL.sanctioned.js" | tr '\0' '\n') )
## # matches=($(grep -Pzo "(?s)\s*\/\* globals? .*?\*\/" ${OUTPUT}))
## for m in "${matches[@]}"
## do
##     sed -i "\'/${m}/d\'" ${OUTPUT}
## done
## # eslint multiline regex: \/\* eslint.*?\*\/
## matches=($(grep -Pzo "(?s)\s*\/\* eslint.*?\*\/" ${OUTPUT}))
## for m in "${matches[@]}"
## do
##     sed -i "\'/${m}/d\'" ${OUTPUT}
## done
## # >> $TMP_FILE
## mv $TMP_FILE ${OUTPUT}
## # globals single line regex: \/\/ globals? .*
## egrep -v '^\s*\/\/ globals? .*' ${OUTPUT} >> $TMP_FILE
## mv $TMP_FILE ${OUTPUT}
## # eslint single line regex: \/\/ eslint.*
## egrep -v '^\s*\/\/ eslint.*' ${OUTPUT} >> $TMP_FILE
## mv $TMP_FILE ${OUTPUT}

echo "Compilation complete!: ${OUTPUT}"