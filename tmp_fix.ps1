$path = 'src/components/ToursSection.tsx'
$c = Get-Content $path -Raw
# Fix stray `n sequences
$c = $c -replace '\\`n', "`n"
# Ensure next/image import exactly once
$c = $c -replace 'import React, \{ useState \} from "react";.*?import Image from "next/image";','import React, { useState } from "react";`nimport Image from "next/image";'
# Replace the <Image...> block if it still has backticks
$c = $c -replace 'Image`n\s*key=','Image`n        key='
# Fix chevrons inside buttons
$c = $c -replace '>\s*<\s*\r?\n\s*</button>','>`n        &#8249;`n      </button>'
$c = $c -replace '>\s*>\s*\r?\n\s*</button>','>`n        &#8250;`n      </button>'
Set-Content $path $c
