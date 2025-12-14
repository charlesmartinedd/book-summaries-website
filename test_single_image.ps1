# Test single image generation
$apiKey = "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"
$model = "google/gemini-2.5-flash-image"
$prompt = "Modern 3D animated style, Pixar-quality, soft lighting, vibrant colors, child-friendly, cinematic composition, Victorian era 1870s, Victorian gentleman in London study examining pocket watch, elegant interior, 3D Pixar style"

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "Content-Type" = "application/json"
    "HTTP-Referer" = "https://book-summaries-website.github.io"
    "X-Title" = "Test Image Generation"
}

$body = @{
    model = $model
    messages = @(
        @{
            role = "user"
            content = $prompt
        }
    )
} | ConvertTo-Json

Write-Host "Testing OpenRouter API with model: $model"
Write-Host "Prompt: $($prompt.Substring(0, 80))..."
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "https://openrouter.ai/api/v1/chat/completions" `
        -Method Post `
        -Headers $headers `
        -Body $body `
        -TimeoutSec 180

    Write-Host "Success! Response received."
    $response | ConvertTo-Json -Depth 10 | Out-File "test_response.json"
    Write-Host "Full response saved to test_response.json"

    # Try to extract image
    if ($response.choices -and $response.choices[0].message.images) {
        $imageData = $response.choices[0].message.images[0].image_url.url
        Write-Host "Image data received (length: $($imageData.Length))"

        # Save image
        if ($imageData -match "^data:image/[^;]+;base64,(.+)$") {
            $base64 = $Matches[1]
            $bytes = [Convert]::FromBase64String($base64)
            [IO.File]::WriteAllBytes("images/80-days/chapters/test.png", $bytes)
            Write-Host "Image saved to images/80-days/chapters/test.png"
        }
    } else {
        Write-Host "No image data found in response"
    }
} catch {
    Write-Host "Error: $_"
    Write-Host "StatusCode:" $_.Exception.Response.StatusCode.value__
    Write-Host "StatusDescription:" $_.Exception.Response.StatusDescription
}
