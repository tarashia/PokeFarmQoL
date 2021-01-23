#!/bin/bash
echo "Compiling code into one js file..."

# Order from Poke-Farm-QoL.user.js
ROOT="."

declare -a INPUT=("${ROOT}/requires/user/header.txt"
                  "${ROOT}/requires/common/resources.js"
                  "${ROOT}/requires/common/helpers.js"
                  "${ROOT}/requires/common/globals.js"
                  "${ROOT}/requires/user/globals.js"
                  "${ROOT}/requires/user/evolutionTreeParser.js"
                  "${ROOT}/requires/user/dexPageParser.js"
                  "${ROOT}/requires/user/localStorageManager.js"
                  "${ROOT}/requires/user/dexUtilities.js"
                  "${ROOT}/requires/common/qolHub.js"
                  "${ROOT}/requires/common/basePage.js"
                  "${ROOT}/requires/common/shelterPage.js"
                  "${ROOT}/requires/common/privateFieldsPage.js"
                  "${ROOT}/requires/common/publicFieldsPage.js"
                  "${ROOT}/requires/common/labPage.js"
                  "${ROOT}/requires/user/labPage.js"
                  "${ROOT}/requires/common/fishingPage.js"
                  "${ROOT}/requires/common/multiuserPage.js"
                  "${ROOT}/requires/common/farmPage.js"
                  "${ROOT}/requires/user/farmPage.js"
                  "${ROOT}/requires/common/daycarePage.js"
                  "${ROOT}/requires/common/dexPage.js"
                  "${ROOT}/requires/common/wishforgePage.js"
                  "${ROOT}/requires/common/pagesManager.js"
                  "${ROOT}/requires/common/pfqol.js"
                  )
OUTPUT="${ROOT}/Poke-Farm-QoL.user.js"
rm -f "${OUTPUT}"

for FILE in "${INPUT[@]}"; do
   cat "$FILE" >> "${OUTPUT}"
   echo "" >> "${OUTPUT}"
done

./scripts/remove_eslint_comments.sh "${OUTPUT}" "/tmp/output.txt"

echo "Compilation complete!: ${OUTPUT}"