#!/bin/bash
echo "Compiling code into one js file..."

# Order from Poke-Farm-QoL.user.js
ROOT="."

# wrap INPUT files in WRAPPER_HEADER and WRAPPER_FOOTER
read -r -d '' WRAPPER_HEADER << EOM
EOM

read -r -d '' WRAPPER_FOOTER << EOM
EOM

# External modules that have to get prepended to the code
declare -a EXTERNALS=("${ROOT}/node_modules/jquery/dist/jquery.min.js"
                     )

# The file that contains the header block comment for the script
FILE_HEADER="${ROOT}/requires/sanctioned/header.txt"

# Code files to concenate after FILE_HEADER and inside 
# WRAPPER_HEADER and WRAPPER_FOOTER
declare -a INPUT=("${ROOT}/requires/common/polyfill.js"
                  "${ROOT}/requires/common/resources.js"
                  "${ROOT}/requires/sanctioned/resources.js"
                  "${ROOT}/requires/common/helpers.js"
                  "${ROOT}/requires/common/globals.js"
                  "${ROOT}/requires/sanctioned/globals.js"
                  "${ROOT}/requires/common/localStorageManager.js"
                  "${ROOT}/requires/sanctioned/localStorageManager.js"
                  "${ROOT}/requires/common/qolHub.js"
                  "${ROOT}/requires/sanctioned/qolHub.js"
                  "${ROOT}/requires/common/basePage.js"
                  "${ROOT}/requires/common/shelterPage.js"
                  "${ROOT}/requires/sanctioned/shelterPage.js"
                  "${ROOT}/requires/common/privateFieldsPage.js"
                  "${ROOT}/requires/sanctioned/privateFieldsPage.js"
                  "${ROOT}/requires/common/publicFieldsPage.js"
                  "${ROOT}/requires/common/labPage.js"
                  "${ROOT}/requires/sanctioned/labPage.js"
                  "${ROOT}/requires/common/fishingPage.js"
                  "${ROOT}/requires/common/multiuserPage.js"
                  "${ROOT}/requires/common/farmPage.js"
                  "${ROOT}/requires/sanctioned/farmPage.js"
                  "${ROOT}/requires/common/daycarePage.js"
                  "${ROOT}/requires/common/dexPage.js"
                  "${ROOT}/requires/sanctioned/dexPage.js"
                  "${ROOT}/requires/common/wishforgePage.js"
                  "${ROOT}/requires/common/pagesManager.js"
                  "${ROOT}/requires/common/pfqol.js"
                  "${ROOT}/requires/sanctioned/pfqol.js"
                  )
OUTPUT="${ROOT}/Poke-Farm-QoL.sanctioned.test.user.js"
rm -f "${OUTPUT}"

# try to mimic the web environment
echo "" > "${OUTPUT}"

for FILE in "${EXTERNALS[@]}"; do
   echo "/* istanbul ignore next */" >> "${OUTPUT}"
   echo "/* eslint-disable */" >>  "${OUTPUT}"
   cat "$FILE" >> "${OUTPUT}"
   echo "" >> "${OUTPUT}"
   echo "/* eslint-enable */" >>  "${OUTPUT}"
   echo "" >> "${OUTPUT}"
done

cat "$FILE_HEADER" >> "${OUTPUT}"
echo "" >> "${OUTPUT}"
echo "$WRAPPER_HEADER" >> "${OUTPUT}"
for FILE in "${INPUT[@]}"; do
   cat "$FILE" >> "${OUTPUT}"
   echo "" >> "${OUTPUT}"
done
echo "$WRAPPER_FOOTER" >> "${OUTPUT}"

npm run lint "${OUTPUT}"

echo "Compilation complete!: ${OUTPUT}"