#!/bin/bash
echo "Compiling code into one js file..."

# Order from Poke-Farm-QoL.user.js
ROOT="."
declare -a EXTERNALS=("${ROOT}/node_modules/jquery/dist/jquery.min.js"
                     )
declare -a INPUT=("${ROOT}/requires/sanctioned/header.txt"
                  "${ROOT}/requires/common/resources.js"
                  "${ROOT}/requires/sanctioned/resources.js"
                  "${ROOT}/requires/common/helpers.js"
                  "${ROOT}/requires/common/globals.js"
                  "${ROOT}/requires/sanctioned/globals.js"
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
                  "${ROOT}/requires/common/wishforgePage.js"
                  "${ROOT}/requires/common/pagesManager.js"
                  "${ROOT}/requires/common/pfqol.js"
                  "${ROOT}/requires/sanctioned/pfqol.js"
                  )
OUTPUT="${ROOT}/__tests__/Poke-Farm-QoL.sanctioned.js"

# try to mimic the web environment
echo "" > "${OUTPUT}"
echo "/* instanbul ignore next */" >> "${OUTPUT}"
echo "// eslint-disable-next-line camelcase" >>  "${OUTPUT}"
echo "const GM_addStyle        = require('../__mocks__/tampermonkey').GM_addStyle;" >> "${OUTPUT}"

for FILE in "${EXTERNALS[@]}"; do
   echo "/* istanbul ignore next */" >> "${OUTPUT}"
   echo "/* eslint-disable */" >>  "${OUTPUT}"
   cat "$FILE" >> "${OUTPUT}"
   echo "/* eslint-enable */" >>  "${OUTPUT}"
   echo "" >> "${OUTPUT}"
done

for FILE in "${INPUT[@]}"; do
   cat "$FILE" >> "${OUTPUT}"
   echo "" >> "${OUTPUT}"
done

echo "Compilation complete!: ${OUTPUT}"