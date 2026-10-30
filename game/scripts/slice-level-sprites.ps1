param([string]$Root = (Join-Path $PSScriptRoot '..\public\levels'))

Add-Type -AssemblyName System.Drawing

function Export-Cells {
  param([string]$Source, [int]$Columns, [int]$Rows, [string[]]$Names)
  if ($Names.Count -ne $Columns * $Rows) { throw "Cell count mismatch: $Source" }
  $bitmap = [System.Drawing.Bitmap]::new($Source)
  try {
    for ($index = 0; $index -lt $Names.Count; $index++) {
      $column = $index % $Columns
      $row = [Math]::Floor($index / $Columns)
      $left = [Math]::Floor($column * $bitmap.Width / $Columns)
      $top = [Math]::Floor($row * $bitmap.Height / $Rows)
      $right = [Math]::Floor(($column + 1) * $bitmap.Width / $Columns)
      $bottom = [Math]::Floor(($row + 1) * $bitmap.Height / $Rows)
      $width = $right - $left
      $height = $bottom - $top
      $sprite = [System.Drawing.Bitmap]::new($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
      try {
        $graphics = [System.Drawing.Graphics]::FromImage($sprite)
        try {
          $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
          $graphics.DrawImage($bitmap, [System.Drawing.Rectangle]::new(0, 0, $width, $height), [System.Drawing.Rectangle]::new($left, $top, $width, $height), [System.Drawing.GraphicsUnit]::Pixel)
        } finally { $graphics.Dispose() }
        $target = Join-Path (Split-Path $Source -Parent) ($Names[$index] + '.png')
        $sprite.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)
      } finally { $sprite.Dispose() }
    }
  } finally { $bitmap.Dispose() }
}

Export-Cells (Join-Path $Root 'level-01\sprite-sheet.png') 3 3 @(
  'E01-curtain','D2-botanical-frame','E02-wardrobe-door',
  'D4-door-handle','D4-door-sign','D5-glass-dome',
  'D5-unlit-candle','D5-cleaning-cloth','D2-damp-fungi'
)
Export-Cells (Join-Path $Root 'level-01\case-sheet.png') 2 2 @(
  'E03-partition-door','E04-key-tag','E05-wallpaper-edge','E06-bin-lid'
)
Export-Cells (Join-Path $Root 'level-02\sprite-sheet.png') 3 2 @(
  'E07-handle-clock','E08-listing-photo','E09-socket-cover',
  'E10-pawprint-rug','E11-receipt-drawer','E12-stove-tray'
)
Export-Cells (Join-Path $Root 'level-03\sprite-sheet.png') 3 2 @(
  'E13-damp-painting','E14-peeling-wall-sticker','E15-damp-rug',
  'E16-smoky-curtain','E17-fridge-drawer','E18-freezer-drawer'
)
Export-Cells (Join-Path $Root 'level-04\sprite-sheet.png') 3 2 @(
  'E19-wired-plant','E20-room-keycard','E21-sink-cabinet',
  'E22-tv-cover','E23-moved-furniture-rug','E24-shared-fridge-door'
)
Export-Cells (Join-Path $Root 'level-05\sprite-sheet.png') 3 2 @(
  'E25-gutter-basket','E26-candle-dome','E27-invoice-stack',
  'E28-frosted-window-latch','E29-pet-smell-rug','E30-cracked-fridge-shelf'
)
Export-Cells (Join-Path $Root 'level-06\sprite-sheet.png') 3 2 @(
  'E31-mold-curtain','E32-ball-level','E33-deduction-stack',
  'E34-meal-cupboard','E35-loose-baseboard','E36-doorstop-latch'
)

Export-Cells (Join-Path $Root 'level-02\accessory-sheet.png') 3 2 @(
  'E07-door-sign','E08-original-room-photo','E09-paint-film',
  'E10-pet-bed','E11-sale-receipt','E12-stove-before-photo'
)
Export-Cells (Join-Path $Root 'level-03\accessory-sheet.png') 3 2 @(
  'E13-drain-flap','E14-old-paint-skin','E15-thermal-strip',
  'E16-ashtray','E17-food-container','E18-grocery-bag'
)
Export-Cells (Join-Path $Root 'level-04\accessory-sheet.png') 3 2 @(
  'E19-camera-wire','E20-ad-photo','E21-water-valve',
  'E22-tv-before-photo','E23-bedroom-knob','E24-fridge-inner-drawer'
)
Export-Cells (Join-Path $Root 'level-05\accessory-sheet.png') 4 3 @(
  'E25-maintenance-log','E26-clean-wick','E26-cleaning-cloth','E27-key-tray',
  'E27-key-receipt','E28-thermostat-cover','E28-clock','E29-damp-cloth',
  'E29-movein-report','E30-adhesive-strip','E30-before-photo','E25-gutter-leaves'
)
Export-Cells (Join-Path $Root 'level-06\accessory-sheet.png') 4 3 @(
  'E31-wardrobe-door','E31-wallpaper-strip','E32-spirit-level','E32-inspection-card',
  'E33-movein-photo','E33-deduction-sheet','E34-meal-box','E34-cleaning-log',
  'E35-repair-invoice','E35-condition-photo','E36-bent-latch','E36-incident-receipt'
)
Export-Cells (Join-Path $Root 'level-02\cross-level-sheet.png') 2 2 @(
  'E08-wall-painting','E23-bedroom-door','E32-rolling-ball','E36-doorstop'
)
Move-Item -Force -LiteralPath (Join-Path $Root 'level-02\E23-bedroom-door.png') -Destination (Join-Path $Root 'level-04\E23-bedroom-door.png')
Move-Item -Force -LiteralPath (Join-Path $Root 'level-02\E32-rolling-ball.png') -Destination (Join-Path $Root 'level-06\E32-rolling-ball.png')
Move-Item -Force -LiteralPath (Join-Path $Root 'level-02\E36-doorstop.png') -Destination (Join-Path $Root 'level-06\E36-doorstop.png')

Write-Output 'Exported 89 independent transparent PNG prop drafts.'
