$path = 'src/components/ToursSection.tsx'
$c = Get-Content $path -Raw
# 1) Import Image
if ($c -notmatch 'from "next/image"') {
  $c = $c -replace 'import React, \{ useState \} from "react";','import React, { useState } from "react";`nimport Image from "next/image";'
}
# 2) Replace <img .../> block with <Image .../>
$c = $c -replace '(?s)<img\s*\n\s*key=\{active\}[\s\S]*?loading=\"lazy\"\s*/>','<Image`n        key={active}`n        src={images[active] ?? placeholder}`n        alt={alt}`n        fill`n        sizes="(max-width: 768px) 100vw, 720px"`n        className="object-cover"`n        priority={false}`n      />'
# 3) Change container div class/height
$c = $c -replace 'className=\"relative h-56 w-full bg-muted\"','className="relative w-full bg-muted" style={{ height: 224 }}'
# 4) Fix button chevrons
$c = $c -replace '>\s*<\s*\n\s*</button>','>`n        &#8249;`n      </button>'
$c = $c -replace '>\s*>\s*\n\s*</button>','>`n        &#8250;`n      </button>'
Set-Content $path $c
