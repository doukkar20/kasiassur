Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root "img\\modules-3d"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$size = 1400

function Color-Hex([string]$hex, [int]$alpha = 255) {
  $base = [System.Drawing.ColorTranslator]::FromHtml($hex)
  return [System.Drawing.Color]::FromArgb($alpha, $base.R, $base.G, $base.B)
}

function New-Canvas([int]$side) {
  $bmp = New-Object System.Drawing.Bitmap $side, $side
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear([System.Drawing.Color]::Transparent)
  return @{ Bitmap = $bmp; Graphics = $g }
}

function New-RoundedPath([single]$x, [single]$y, [single]$w, [single]$h, [single]$r) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Draw-Glow([System.Drawing.Graphics]$g, [single]$cx, [single]$cy, [single]$diameter, [string]$hex) {
  foreach ($step in @(1.75, 1.35, 1.0)) {
    $alpha = if ($step -eq 1.75) { 18 } elseif ($step -eq 1.35) { 28 } else { 44 }
    $brush = New-Object System.Drawing.SolidBrush (Color-Hex $hex $alpha)
    $d = $diameter * $step
    $g.FillEllipse($brush, $cx - $d / 2, $cy - $d / 2, $d, $d)
    $brush.Dispose()
  }
}

function Draw-Shadow([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$w, [single]$h, [int]$alpha = 28) {
  foreach ($ratio in @(1.0, 1.2, 1.45)) {
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb([Math]::Max(6, [int]($alpha / $ratio)), 26, 18, 48))
    $nw = $w * $ratio
    $nh = $h * $ratio
    $g.FillEllipse($brush, $x - ($nw - $w) / 2, $y - ($nh - $h) / 2, $nw, $nh)
    $brush.Dispose()
  }
}

function Draw-Circuit([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$w, [single]$h) {
  $pen = New-Object System.Drawing.Pen (Color-Hex "#00D1FF" 52), 4
  $nodeBrush = New-Object System.Drawing.SolidBrush (Color-Hex "#EAFBFF" 150)
  $lines = @(
    @{ P = @(120,120,220,120,220,210,320,210) }
    @{ P = @(520,150,640,150,640,260,760,260) }
    @{ P = @(150,520,260,520,260,420,380,420) }
    @{ P = @(520,620,640,620,640,520,780,520) }
  )

  foreach ($line in $lines) {
    $pts = New-Object 'System.Collections.Generic.List[System.Drawing.PointF]'
    for ($i = 0; $i -lt $line.P.Count; $i += 2) {
      $pts.Add([System.Drawing.PointF]::new($x + $line.P[$i], $y + $line.P[$i + 1]))
    }
    $g.DrawLines($pen, $pts.ToArray())
    foreach ($pt in $pts) {
      $g.FillEllipse($nodeBrush, $pt.X - 6, $pt.Y - 6, 12, 12)
    }
  }

  $pen.Dispose()
  $nodeBrush.Dispose()
}

function Draw-GlassPanel([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$w, [single]$h) {
  $path = New-RoundedPath $x $y $w $h 64
  $rect = [System.Drawing.RectangleF]::new($x, $y, $w, $h)
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, (Color-Hex "#FFFFFF" 165), (Color-Hex "#BEEFFF" 70), 90
  $pen = New-Object System.Drawing.Pen (Color-Hex "#FFFFFF" 210), 6
  $highlight = New-Object System.Drawing.Pen (Color-Hex "#00D1FF" 60), 3
  $g.FillPath($brush, $path)
  $g.DrawPath($pen, $path)
  $g.DrawArc($highlight, $x + 40, $y + 28, $w - 80, 180, 190, 120)
  Draw-Circuit $g $x $y $w $h
  $highlight.Dispose()
  $pen.Dispose()
  $brush.Dispose()
  $path.Dispose()
}

function New-ShieldPath([single]$x, [single]$y, [single]$w, [single]$h) {
  $pts = [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($x + $w * 0.50, $y),
    [System.Drawing.PointF]::new($x + $w * 0.88, $y + $h * 0.12),
    [System.Drawing.PointF]::new($x + $w * 0.82, $y + $h * 0.56),
    [System.Drawing.PointF]::new($x + $w * 0.50, $y + $h),
    [System.Drawing.PointF]::new($x + $w * 0.18, $y + $h * 0.56),
    [System.Drawing.PointF]::new($x + $w * 0.12, $y + $h * 0.12)
  )
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddClosedCurve($pts, 0.35)
  return $path
}

function Draw-Shield([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$w, [single]$h, [bool]$glass = $false) {
  $path = New-ShieldPath $x $y $w $h
  $rect = [System.Drawing.RectangleF]::new($x, $y, $w, $h)
  $c1 = if ($glass) { Color-Hex "#00D1FF" 128 } else { Color-Hex "#1D1137" 255 }
  $c2 = if ($glass) { Color-Hex "#8DEAFF" 82 } else { Color-Hex "#5B36B5" 255 }
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, $c1, $c2, 90
  $pen = New-Object System.Drawing.Pen (Color-Hex "#C9F9FF" 220), 8
  $gloss = New-Object System.Drawing.Pen (Color-Hex "#FFFFFF" 140), 4
  $g.FillPath($brush, $path)
  $g.DrawPath($pen, $path)
  $g.DrawArc($gloss, $x + 28, $y + 18, $w - 56, $h * 0.46, 205, 115)
  $gloss.Dispose()
  $pen.Dispose()
  $brush.Dispose()
  return $path
}

function Draw-K([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$w, [single]$h) {
  $font = New-Object System.Drawing.Font("Segoe UI", ($h * 0.44), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $rect = [System.Drawing.RectangleF]::new($x, $y, $w, $h)
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = [System.Drawing.StringAlignment]::Center
  $fmt.LineAlignment = [System.Drawing.StringAlignment]::Center
  $shadow = New-Object System.Drawing.SolidBrush (Color-Hex "#132C56" 90)
  $ink = New-Object System.Drawing.SolidBrush (Color-Hex "#E8FDFF" 235)
  $g.DrawString("K", $font, $shadow, [System.Drawing.RectangleF]::new($x + 5, $y + 8, $w, $h), $fmt)
  $g.DrawString("K", $font, $ink, $rect, $fmt)
  $ink.Dispose()
  $shadow.Dispose()
  $font.Dispose()
  $fmt.Dispose()
}

function Draw-Lock([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$scale) {
  $pen = New-Object System.Drawing.Pen (Color-Hex "#00D1FF" 255), (18 * $scale)
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $bodyBrush = New-Object System.Drawing.SolidBrush (Color-Hex "#FFFFFF" 180)
  $g.FillRectangle($bodyBrush, $x, $y + 56 * $scale, 160 * $scale, 138 * $scale)
  $g.DrawRectangle($pen, $x, $y + 56 * $scale, 160 * $scale, 138 * $scale)
  $g.DrawArc($pen, $x + 34 * $scale, $y, 92 * $scale, 108 * $scale, 180, 180)
  $g.DrawLine($pen, $x + 80 * $scale, $y + 108 * $scale, $x + 80 * $scale, $y + 158 * $scale)
  $g.FillEllipse([System.Drawing.Brushes]::White, $x + 64 * $scale, $y + 135 * $scale, 32 * $scale, 32 * $scale)
  $bodyBrush.Dispose()
  $pen.Dispose()
}

function Draw-Check([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$scale) {
  $pen = New-Object System.Drawing.Pen (Color-Hex "#8DEAFF" 255), (22 * $scale)
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawLines($pen, [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($x, $y + 36 * $scale),
    [System.Drawing.PointF]::new($x + 32 * $scale, $y + 68 * $scale),
    [System.Drawing.PointF]::new($x + 92 * $scale, $y)
  ))
  $pen.Dispose()
}

function Draw-HandShake([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$scale) {
  $purple = New-Object System.Drawing.SolidBrush (Color-Hex "#2D1B4E" 220)
  $cyanPen = New-Object System.Drawing.Pen (Color-Hex "#00D1FF" 200), (10 * $scale)
  $g.FillPolygon($purple, [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($x, $y + 36 * $scale),
    [System.Drawing.PointF]::new($x + 42 * $scale, $y),
    [System.Drawing.PointF]::new($x + 86 * $scale, $y + 34 * $scale),
    [System.Drawing.PointF]::new($x + 42 * $scale, $y + 72 * $scale)
  ))
  $g.FillPolygon($purple, [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($x + 90 * $scale, $y + 34 * $scale),
    [System.Drawing.PointF]::new($x + 136 * $scale, $y),
    [System.Drawing.PointF]::new($x + 176 * $scale, $y + 34 * $scale),
    [System.Drawing.PointF]::new($x + 136 * $scale, $y + 72 * $scale)
  ))
  $g.DrawLine($cyanPen, $x + 60 * $scale, $y + 50 * $scale, $x + 120 * $scale, $y + 50 * $scale)
  $purple.Dispose()
  $cyanPen.Dispose()
}

function Draw-Block([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$w, [single]$h, [single]$depth) {
  $front = New-Object System.Drawing.SolidBrush (Color-Hex "#2D1B4E" 210)
  $side = New-Object System.Drawing.SolidBrush (Color-Hex "#4E2D89" 215)
  $top = New-Object System.Drawing.SolidBrush (Color-Hex "#7EEBFF" 145)
  $g.FillRectangle($front, $x, $y, $w, $h)
  $g.FillPolygon($side, [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($x + $w, $y),
    [System.Drawing.PointF]::new($x + $w + $depth, $y - $depth),
    [System.Drawing.PointF]::new($x + $w + $depth, $y + $h - $depth),
    [System.Drawing.PointF]::new($x + $w, $y + $h)
  ))
  $g.FillPolygon($top, [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($x, $y),
    [System.Drawing.PointF]::new($x + $depth, $y - $depth),
    [System.Drawing.PointF]::new($x + $w + $depth, $y - $depth),
    [System.Drawing.PointF]::new($x + $w, $y)
  ))
  $front.Dispose()
  $side.Dispose()
  $top.Dispose()
}

function Draw-People([System.Drawing.Graphics]$g, [single]$x, [single]$y) {
  foreach ($item in @(
    @{ X = $x; R = 54; H = 148 }
    @{ X = $x + 132; R = 62; H = 176 }
    @{ X = $x + 256; R = 44; H = 126 }
  )) {
    $brush = New-Object System.Drawing.SolidBrush (Color-Hex "#2D1B4E" 190)
    $glass = New-Object System.Drawing.SolidBrush (Color-Hex "#00D1FF" 70)
    $g.FillEllipse($brush, $item.X, $y, $item.R * 2, $item.R * 2)
    $g.FillEllipse($glass, $item.X - 10, $y - 14, ($item.R * 2) + 20, ($item.R * 2) + 18)
    $g.FillRectangle($brush, $item.X + $item.R * 0.4, $y + $item.R * 2 + 10, $item.R * 1.2, $item.H)
    $brush.Dispose()
    $glass.Dispose()
  }
}

function Draw-HeartBands([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$scale) {
  $cyanPen = New-Object System.Drawing.Pen (Color-Hex "#00D1FF" 235), (28 * $scale)
  $purplePen = New-Object System.Drawing.Pen (Color-Hex "#5B36B5" 220), (28 * $scale)
  $cyanPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $cyanPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $purplePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $purplePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawArc($cyanPen, $x, $y, 180 * $scale, 160 * $scale, 140, 255)
  $g.DrawArc($purplePen, $x + 104 * $scale, $y, 180 * $scale, 160 * $scale, 145, 255)
  $g.DrawLine($cyanPen, $x + 102 * $scale, $y + 148 * $scale, $x + 190 * $scale, $y + 304 * $scale)
  $g.DrawLine($purplePen, $x + 182 * $scale, $y + 148 * $scale, $x + 98 * $scale, $y + 304 * $scale)
  $cyanPen.Dispose()
  $purplePen.Dispose()
}

function Draw-GlassWheel([System.Drawing.Graphics]$g, [single]$cx, [single]$cy, [single]$r) {
  $fill = New-Object System.Drawing.SolidBrush (Color-Hex "#BDF6FF" 72)
  $ring = New-Object System.Drawing.Pen (Color-Hex "#EAFDFF" 210), 8
  $core = New-Object System.Drawing.SolidBrush (Color-Hex "#2D1B4E" 170)
  $g.FillEllipse($fill, $cx - $r, $cy - $r, $r * 2, $r * 2)
  $g.DrawEllipse($ring, $cx - $r, $cy - $r, $r * 2, $r * 2)
  $g.FillEllipse($core, $cx - $r * 0.34, $cy - $r * 0.34, $r * 0.68, $r * 0.68)
  $core.Dispose()
  $ring.Dispose()
  $fill.Dispose()
}

function Draw-CarBody([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$w, [single]$h) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddBezier($x + $w * 0.06, $y + $h * 0.76, $x + $w * 0.18, $y + $h * 0.60, $x + $w * 0.27, $y + $h * 0.42, $x + $w * 0.39, $y + $h * 0.42)
  $path.AddLine($x + $w * 0.39, $y + $h * 0.42, $x + $w * 0.67, $y + $h * 0.42)
  $path.AddBezier($x + $w * 0.67, $y + $h * 0.42, $x + $w * 0.78, $y + $h * 0.42, $x + $w * 0.88, $y + $h * 0.60, $x + $w * 0.95, $y + $h * 0.73)
  $path.AddLine($x + $w * 0.95, $y + $h * 0.73, $x + $w * 0.91, $y + $h * 0.82)
  $path.AddLine($x + $w * 0.91, $y + $h * 0.82, $x + $w * 0.70, $y + $h * 0.82)
  $path.AddBezier($x + $w * 0.70, $y + $h * 0.82, $x + $w * 0.63, $y + $h * 0.68, $x + $w * 0.37, $y + $h * 0.68, $x + $w * 0.30, $y + $h * 0.82)
  $path.AddLine($x + $w * 0.30, $y + $h * 0.82, $x + $w * 0.11, $y + $h * 0.82)
  $path.CloseFigure()

  $rect = [System.Drawing.RectangleF]::new($x, $y, $w, $h)
  $fill = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, (Color-Hex "#C9F9FF" 122), (Color-Hex "#66DDFF" 72), 90
  $pen = New-Object System.Drawing.Pen (Color-Hex "#EAFDFF" 220), 8
  $shine = New-Object System.Drawing.Pen (Color-Hex "#FFFFFF" 125), 4
  $accent = New-Object System.Drawing.Pen (Color-Hex "#00D1FF" 165), 6
  $windowBrush = New-Object System.Drawing.SolidBrush (Color-Hex "#FFFFFF" 92)
  $windowOutline = New-Object System.Drawing.Pen (Color-Hex "#C7F6FF" 145), 4
  $windowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
  $g.FillPath($fill, $path)
  $g.DrawPath($pen, $path)
  $g.DrawArc($shine, $x + $w * 0.16, $y + $h * 0.34, $w * 0.56, $h * 0.24, 190, 110)
  $windowPath.AddPolygon([System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($x + $w * 0.33, $y + $h * 0.47),
    [System.Drawing.PointF]::new($x + $w * 0.44, $y + $h * 0.34),
    [System.Drawing.PointF]::new($x + $w * 0.65, $y + $h * 0.34),
    [System.Drawing.PointF]::new($x + $w * 0.76, $y + $h * 0.47),
    [System.Drawing.PointF]::new($x + $w * 0.61, $y + $h * 0.47),
    [System.Drawing.PointF]::new($x + $w * 0.47, $y + $h * 0.47)
  ))
  $g.FillPath($windowBrush, $windowPath)
  $g.DrawPath($windowOutline, $windowPath)
  $g.DrawLine($accent, $x + $w * 0.21, $y + $h * 0.66, $x + $w * 0.82, $y + $h * 0.66)
  $shine.Dispose()
  $accent.Dispose()
  $windowOutline.Dispose()
  $windowBrush.Dispose()
  $windowPath.Dispose()
  $pen.Dispose()
  $fill.Dispose()
  $path.Dispose()
}

function Draw-House3D([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$scale) {
  $front = New-Object System.Drawing.SolidBrush (Color-Hex "#EAFDFF" 150)
  $side = New-Object System.Drawing.SolidBrush (Color-Hex "#8DEAFF" 85)
  $roof = New-Object System.Drawing.SolidBrush (Color-Hex "#2D1B4E" 178)
  $line = New-Object System.Drawing.Pen (Color-Hex "#FFFFFF" 195), 8
  $windowFill = New-Object System.Drawing.SolidBrush (Color-Hex "#DFFBFF" 108)

  $frontPts = [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($x + 40 * $scale, $y + 170 * $scale),
    [System.Drawing.PointF]::new($x + 230 * $scale, $y + 170 * $scale),
    [System.Drawing.PointF]::new($x + 230 * $scale, $y + 390 * $scale),
    [System.Drawing.PointF]::new($x + 40 * $scale, $y + 390 * $scale)
  )
  $sidePts = [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($x + 230 * $scale, $y + 170 * $scale),
    [System.Drawing.PointF]::new($x + 320 * $scale, $y + 120 * $scale),
    [System.Drawing.PointF]::new($x + 320 * $scale, $y + 340 * $scale),
    [System.Drawing.PointF]::new($x + 230 * $scale, $y + 390 * $scale)
  )
  $roofFront = [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($x, $y + 180 * $scale),
    [System.Drawing.PointF]::new($x + 135 * $scale, $y + 60 * $scale),
    [System.Drawing.PointF]::new($x + 270 * $scale, $y + 180 * $scale)
  )
  $roofSide = [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($x + 135 * $scale, $y + 60 * $scale),
    [System.Drawing.PointF]::new($x + 230 * $scale, $y + 20 * $scale),
    [System.Drawing.PointF]::new($x + 360 * $scale, $y + 140 * $scale),
    [System.Drawing.PointF]::new($x + 270 * $scale, $y + 180 * $scale)
  )

  $g.FillPolygon($front, $frontPts)
  $g.FillPolygon($side, $sidePts)
  $g.FillPolygon($roof, $roofFront)
  $g.FillPolygon($roof, $roofSide)
  $g.DrawPolygon($line, $frontPts)
  $g.DrawPolygon($line, $sidePts)
  $g.DrawPolygon($line, $roofFront)
  $g.DrawPolygon($line, $roofSide)
  $g.FillRectangle($windowFill, $x + 82 * $scale, $y + 228 * $scale, 36 * $scale, 40 * $scale)
  $g.FillRectangle($windowFill, $x + 172 * $scale, $y + 228 * $scale, 30 * $scale, 40 * $scale)
  $g.FillRectangle($windowFill, $x + 262 * $scale, $y + 214 * $scale, 28 * $scale, 52 * $scale)
  $g.DrawRectangle($line, $x + 82 * $scale, $y + 228 * $scale, 36 * $scale, 40 * $scale)
  $g.DrawRectangle($line, $x + 172 * $scale, $y + 228 * $scale, 30 * $scale, 40 * $scale)
  $g.DrawRectangle($line, $x + 262 * $scale, $y + 214 * $scale, 28 * $scale, 52 * $scale)
  $g.FillRectangle([System.Drawing.Brushes]::White, $x + 110 * $scale, $y + 250 * $scale, 55 * $scale, 140 * $scale)
  $g.DrawRectangle($line, $x + 110 * $scale, $y + 250 * $scale, 55 * $scale, 140 * $scale)

  $windowFill.Dispose()
  $line.Dispose()
  $roof.Dispose()
  $side.Dispose()
  $front.Dispose()
}

function Draw-RecursiveHouseEtch([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$scale) {
  $pen = New-Object System.Drawing.Pen (Color-Hex "#FFFFFF" 52), 5
  foreach ($n in @(1.0, 0.73, 0.49)) {
    $ox = $x + (1 - $n) * 55 * $scale
    $oy = $y + (1 - $n) * 52 * $scale
    $g.DrawPolygon($pen, [System.Drawing.PointF[]]@(
      [System.Drawing.PointF]::new($ox + 20 * $scale, $oy + 110 * $scale),
      [System.Drawing.PointF]::new($ox + 150 * $scale * $n, $oy),
      [System.Drawing.PointF]::new($ox + 280 * $scale * $n, $oy + 110 * $scale)
    ))
    $g.DrawRectangle($pen, $ox + 62 * $scale, $oy + 110 * $scale, 174 * $scale * $n, 206 * $scale * $n)
  }
  $pen.Dispose()
}

function Draw-Person([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$scale, [string]$hex) {
  $body = New-Object System.Drawing.SolidBrush (Color-Hex $hex 188)
  $glass = New-Object System.Drawing.SolidBrush (Color-Hex "#BDF6FF" 72)
  $outline = New-Object System.Drawing.Pen (Color-Hex "#FFFFFF" 135), 4
  $headR = 42 * $scale
  $bodyPath = New-Object System.Drawing.Drawing2D.GraphicsPath
  $bodyPath.AddClosedCurve([System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($x + 6 * $scale, $y + 96 * $scale),
    [System.Drawing.PointF]::new($x + 80 * $scale, $y + 58 * $scale),
    [System.Drawing.PointF]::new($x + 152 * $scale, $y + 96 * $scale),
    [System.Drawing.PointF]::new($x + 134 * $scale, $y + 242 * $scale),
    [System.Drawing.PointF]::new($x + 24 * $scale, $y + 242 * $scale)
  ), 0.18)
  $g.FillEllipse($glass, $x - 10 * $scale, $y - 10 * $scale, $headR * 2 + 20 * $scale, $headR * 2 + 18 * $scale)
  $g.FillEllipse($body, $x, $y, $headR * 2, $headR * 2)
  $g.FillPath($body, $bodyPath)
  $g.DrawPath($outline, $bodyPath)
  $outline.Dispose()
  $glass.Dispose()
  $body.Dispose()
  $bodyPath.Dispose()
}

function Draw-GlassBarrier([System.Drawing.Graphics]$g, [single]$x, [single]$y, [single]$w, [single]$h) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc($x, $y, $w, $h, 194, 152)
  $path.AddArc($x + 60, $y + 28, $w - 120, $h - 80, 14, 152)
  $path.CloseFigure()
  $fill = New-Object System.Drawing.SolidBrush (Color-Hex "#FFFFFF" 96)
  $pen = New-Object System.Drawing.Pen (Color-Hex "#D8FAFF" 195), 6
  $highlight = New-Object System.Drawing.Pen (Color-Hex "#FFFFFF" 120), 3
  $g.FillPath($fill, $path)
  $g.DrawPath($pen, $path)
  $g.DrawArc($highlight, $x + 80, $y + 40, $w - 160, $h - 86, 198, 118)
  $highlight.Dispose()
  $pen.Dispose()
  $fill.Dispose()
  $path.Dispose()
}

function Draw-PulseRing([System.Drawing.Graphics]$g, [single]$cx, [single]$cy, [single]$rx, [single]$ry) {
  foreach ($spec in @(
    @{ Scale = 1.0; Alpha = 96; Width = 6 },
    @{ Scale = 1.22; Alpha = 62; Width = 4 },
    @{ Scale = 1.46; Alpha = 28; Width = 4 }
  )) {
    $pen = New-Object System.Drawing.Pen (Color-Hex "#00D1FF" $spec.Alpha), $spec.Width
    $g.DrawEllipse($pen, $cx - ($rx * $spec.Scale), $cy - ($ry * $spec.Scale), ($rx * 2 * $spec.Scale), ($ry * 2 * $spec.Scale))
    $pen.Dispose()
  }
}

function Save-Icon([string]$name, [scriptblock]$renderer) {
  $canvas = New-Canvas $size
  $bmp = $canvas.Bitmap
  $g = $canvas.Graphics
  & $renderer $g
  $bmp.Save((Join-Path $outDir $name), [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

Save-Icon "kasiassur-auto.png" {
  param($g)
  Draw-Glow $g 355 405 330 "#00D1FF"
  Draw-Glow $g 1040 370 280 "#6A42C2"
  Draw-Shadow $g 360 1045 680 150 34
  Draw-GlassPanel $g 360 310 700 390
  $roadPen = New-Object System.Drawing.Pen (Color-Hex "#00D1FF" 195), 14
  $roadPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $roadPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawBezier($roadPen, 265, 820, 335, 600, 1080, 880, 1110, 600)
  $g.DrawBezier($roadPen, 320, 600, 520, 430, 815, 420, 1050, 620)
  $g.DrawBezier($roadPen, 430, 730, 620, 760, 860, 760, 1010, 700)
  Draw-CarBody $g 240 500 920 360
  Draw-GlassWheel $g 470 830 78
  Draw-GlassWheel $g 930 830 78
  $shield = Draw-Shield $g 540 388 320 392 $true
  Draw-K $g 610 510 180 154
  $roadPen.Dispose()
  $shield.Dispose()
}

Save-Icon "kasiassur-habitat.png" {
  param($g)
  Draw-Glow $g 330 420 340 "#00D1FF"
  Draw-Glow $g 1030 415 320 "#6A42C2"
  Draw-Shadow $g 355 1045 690 160 36
  Draw-GlassPanel $g 640 315 440 485
  Draw-RecursiveHouseEtch $g 690 360 0.92
  Draw-House3D $g 205 400 1.55
  $shield = Draw-Shield $g 705 395 300 382 $false
  Draw-Lock $g 744 535 1.18
  $shield.Dispose()
}

Save-Icon "kasiassur-sante.png" {
  param($g)
  Draw-Glow $g 335 410 330 "#00D1FF"
  Draw-Glow $g 1025 405 320 "#6A42C2"
  Draw-Shadow $g 350 1045 700 160 34
  Draw-GlassPanel $g 340 315 720 350
  Draw-PulseRing $g 700 515 178 118
  Draw-HeartBands $g 438 245 1.72
  Draw-Person $g 364 585 1.02 "#2D1B4E"
  Draw-Person $g 560 525 1.18 "#3B2572"
  Draw-Person $g 790 598 0.88 "#2D1B4E"
  Draw-GlassBarrier $g 288 675 835 220
  $shield = Draw-Shield $g 570 408 260 320 $true
  Draw-Check $g 636 518 1.18
  $shield.Dispose()
}

Save-Icon "kasiassur-pro.png" {
  param($g)
  Draw-Glow $g 330 420 320 "#00D1FF"
  Draw-Glow $g 1020 400 320 "#6A42C2"
  Draw-Shadow $g 355 1045 710 165 38
  Draw-GlassPanel $g 320 300 780 420
  Draw-Block $g 250 655 150 175 42
  Draw-Block $g 435 590 158 240 42
  Draw-Block $g 655 615 155 215 42
  Draw-Block $g 845 510 155 320 42
  $pen = New-Object System.Drawing.Pen (Color-Hex "#00D1FF" 205), 8
  $node = New-Object System.Drawing.SolidBrush (Color-Hex "#BDF6FF" 220)
  $g.DrawLines($pen, [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new(325, 565), [System.Drawing.PointF]::new(515, 470), [System.Drawing.PointF]::new(700, 450), [System.Drawing.PointF]::new(930, 425)
  ))
  $g.DrawLine($pen, 515, 470, 515, 635)
  $g.DrawLine($pen, 700, 450, 700, 640)
  $g.DrawLine($pen, 930, 425, 930, 560)
  foreach ($p in @(
    [System.Drawing.PointF]::new(325,560),
    [System.Drawing.PointF]::new(515,470),
    [System.Drawing.PointF]::new(700,450),
    [System.Drawing.PointF]::new(930,425),
    [System.Drawing.PointF]::new(515,635),
    [System.Drawing.PointF]::new(700,640)
  )) {
    $g.FillEllipse($node, $p.X - 10, $p.Y - 10, 20, 20)
  }
  $shield = Draw-Shield $g 532 370 336 424 $false
  Draw-HandShake $g 588 546 1.36
  $pen.Dispose()
  $node.Dispose()
  $shield.Dispose()
}

$sheet = New-Object System.Drawing.Bitmap 2600, 2600
$sg = [System.Drawing.Graphics]::FromImage($sheet)
$sg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$sg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$sg.Clear([System.Drawing.Color]::White)

$cards = @(
  @{ Name = "kasiassur-auto.png"; X = 120; Y = 120 }
  @{ Name = "kasiassur-habitat.png"; X = 1360; Y = 120 }
  @{ Name = "kasiassur-sante.png"; X = 120; Y = 1360 }
  @{ Name = "kasiassur-pro.png"; X = 1360; Y = 1360 }
)

foreach ($card in $cards) {
  $img = [System.Drawing.Image]::FromFile((Join-Path $outDir $card.Name))
  try {
    $panelPath = New-RoundedPath ($card.X + 40) ($card.Y + 40) 1040 1040 56
    $panelBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 250, 252, 255))
    $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 230, 236, 245)), 3
    $shadow = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(18, 24, 38, 56))
    $sg.FillPath($panelBrush, $panelPath)
    $sg.DrawPath($panelPen, $panelPath)
    $sg.FillEllipse($shadow, $card.X + 140, $card.Y + 1080, 880, 120)
    $panelPen.Dispose()
    $panelBrush.Dispose()
    $panelPath.Dispose()
    $shadow.Dispose()
    $sg.DrawImage($img, $card.X, $card.Y, 1120, 1120)
  }
  finally {
    $img.Dispose()
  }
}

$sheet.Save((Join-Path $outDir "kasiassur-modules-preview-white.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$sg.Dispose()
$sheet.Dispose()

Get-ChildItem $outDir | Select-Object Name, Length | Format-Table -AutoSize
