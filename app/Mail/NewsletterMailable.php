<?php

namespace App\Mail;

use App\Models\Campaign;
use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewsletterMailable extends Mailable
{
    use Queueable, SerializesModels;

    public Campaign $campaign;

    public Subscriber $subscriber;

    public string $trackingToken;

    public string $renderedHtml;

    public function __construct(Campaign $campaign, Subscriber $subscriber, string $trackingToken)
    {
        $this->campaign = $campaign;
        $this->subscriber = $subscriber;
        $this->trackingToken = $trackingToken;

        // Normalize media URLs: convert localhost/127.0.0.1 or relative storage paths to absolute production URL
        $storageBaseUrl = rtrim(config('app.url', url('/')), '/').'/storage/';
        $rawHtml = ! empty($campaign->content_html) ? $campaign->content_html : ($campaign->template?->content_html ?? '');
        $html = preg_replace(
            '#https?://(?:127\.0\.0\.1|localhost)(?::\d+)?/storage/#i',
            $storageBaseUrl,
            $rawHtml
        );
        $html = preg_replace('#(src|href)=[\'"]/storage/#i', '$1="'.$storageBaseUrl, $html);
        $appBaseUrl = rtrim(config('app.url', url('/')), '/');
        $html = preg_replace('#(src|href)=[\'"]/(favicon\.png|(?:images/)?loops-logo-(?:white|dark)\.png)(\?[^\'"]*)?[\'"]#i', '$1="'.$appBaseUrl.'/$2$3"', $html);

        // Normalize social icons: convert local or legacy SVGs to email-safe CDN PNG images
        $socialCdnMap = [
            'facebook' => 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/facebook.png',
            'linkedin' => 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/linkedin.png',
            'instagram' => 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/instagram.png',
            'tiktok' => 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/tiktok.png',
            'youtube' => 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/youtube.png',
        ];

        // Replace any relative /images/social/... or localhost /images/social/... with public CDN URLs for reliable email client rendering
        foreach ($socialCdnMap as $platform => $cdnUrl) {
            $html = preg_replace(
                '#(?:https?://(?:127\.0\.0\.1|localhost)(?::\d+)?)?/images/social/'.$platform.'\.png#i',
                $cdnUrl,
                $html
            );

            // Replace legacy inline SVGs inside social links with email-safe PNG <img> tags
            $html = preg_replace_callback(
                '#(<a\b[^>]*?(?:href|title)=["\'][^"\']*?'.$platform.'[^"\']*?["\'][^>]*?>)\s*<svg\b[^>]*?>.*?</svg>\s*(</a>)#is',
                function ($matches) use ($cdnUrl, $platform) {
                    $imgTag = '<img src="'.$cdnUrl.'" width="16" height="16" alt="'.ucfirst($platform).'" style="width: 16px; height: 16px; vertical-align: middle; display: inline-block; border: 0; margin-top: -2px;" />';

                    return $matches[1].$imgTag.$matches[2];
                },
                $html
            );
        }

        // Prevent dark mode inversion issues (e.g. Gmail iOS inverting dark headers into white boxes)
        $html = preg_replace('~<meta\s+name=["\']color-scheme["\']\s+content=["\'][^"\']*["\']>~i', '<meta name="color-scheme" content="light only">', $html);
        $html = preg_replace('~<meta\s+name=["\']supported-color-schemes["\']\s+content=["\'][^"\']*["\']>~i', '<meta name="supported-color-schemes" content="light">', $html);
        if (! str_contains($html, '<meta name="color-scheme"')) {
            $html = str_replace('<head>', "<head>\n    <meta name=\"color-scheme\" content=\"light only\">\n    <meta name=\"supported-color-schemes\" content=\"light\">", $html);
        }
        $html = preg_replace('~color-scheme:\s*light\s+dark;?~i', 'color-scheme: light only;', $html);
        $html = preg_replace('~supported-color-schemes:\s*light\s+dark;?~i', 'supported-color-schemes: light;', $html);

        // Replace complex gradient syntax on header cells that Gmail iOS strips
        $html = preg_replace('~background-image:\s*linear-gradient\([^)]*#0b0f19[^)]*\);?~i', 'background-image: linear-gradient(#0b0f19, #0b0f19);', $html);

        // Ensure header inversion protection styles exist in <style>
        $inversionProtectionCss = '
        /* Dark Mode & Inversion Protection (Apple Mail, Outlook, iOS Mail, Gmail) */
        u + .body .dark-header,
        u + .body .header-cell,
        u + .body .header-logo-bg {
            background-color: #0b0f19 !important;
            background-image: linear-gradient(#0b0f19, #0b0f19) !important;
        }
        u + .body .header-title-white {
            color: #ffffff !important;
        }
        u + .body .header-subtitle-white {
            color: #cbd5e1 !important;
        }
        ';
        if (! str_contains($html, '.header-logo-bg') && str_contains($html, '</style>')) {
            $html = str_replace('</style>', $inversionProtectionCss."\n    </style>", $html);
        }

        // Ensure header logo has dark background wrapper if missing
        if (! str_contains($html, 'header-logo-bg')) {
            $html = preg_replace_callback(
                '~(<img\b[^>]*?(?:loops-logo-white|favicon)[^>]*?>)~i',
                function ($matches) {
                    return '<table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0;"><tr><td class="header-logo-bg" style="background: #0b0f19; background-color: #0b0f19; background-image: linear-gradient(#0b0f19, #0b0f19); border-radius: 10px; padding: 4px 6px;">'.$matches[1].'</td></tr></table>';
                },
                $html,
                1
            );
        }

        // Ensure header headline text remains crisp white and right-aligned in inverted clients
        $html = preg_replace_callback(
            '~<h1\b([^>]*class="[^"]*mobile-headline[^"]*"[^>]*)>~i',
            function ($matches) {
                $tag = $matches[0];
                if (! str_contains($tag, 'header-title-white')) {
                    $tag = str_replace('mobile-headline', 'mobile-headline header-title-white', $tag);
                }
                if (str_contains($tag, 'color: #ffffff') && ! str_contains($tag, 'color: #ffffff !important')) {
                    $tag = str_replace('color: #ffffff', 'color: #ffffff !important', $tag);
                }
                if (! str_contains($tag, 'text-align: right')) {
                    $tag = preg_replace('~style="([^"]*)"~i', 'style="$1 text-align: right;"', $tag);
                }

                return $tag;
            },
            $html
        );

        // Normalize header text alignment so edition and subtitle are strictly right-aligned
        $html = preg_replace_callback(
            '~<p\b([^>]*Edition[^<]*</p>)~i',
            function ($matches) {
                $tag = $matches[0];
                if (! str_contains($tag, 'header-edition-text')) {
                    $tag = preg_replace('~<p\b~i', '<p class="header-edition-text"', $tag);
                }
                if (! str_contains($tag, 'text-align: right')) {
                    $tag = preg_replace('~style="([^"]*)"~i', 'style="$1 text-align: right; white-space: nowrap;"', $tag);
                }

                return $tag;
            },
            $html
        );

        $html = preg_replace_callback(
            '~<p\b([^>]*header-subtitle-white[^>]*)>~i',
            function ($matches) {
                $tag = $matches[0];
                if (! str_contains($tag, 'text-align: right')) {
                    $tag = preg_replace('~style="([^"]*)"~i', 'style="$1 text-align: right;"', $tag);
                }

                return $tag;
            },
            $html
        );

        // Clean legacy flexbox styles from table elements if present in older saved campaigns
        $html = preg_replace('#\.featured-grid-row\s*\{\s*display:\s*flex[^}]*\}#i', '', $html);
        $html = preg_replace('#\.featured-card\s*\{\s*display:\s*flex[^}]*\}#i', '', $html);
        $html = preg_replace('#\.featured-card\s*>\s*tbody\s*\{[^}]*\}#i', '', $html);
        $html = preg_replace('#\.featured-card-img-tr\s*\{[^}]*\}#i', '', $html);
        $html = preg_replace('#\.featured-card-body-tr\s*\{[^}]*\}#i', '', $html);
        $html = preg_replace('#\.featured-card-body-td\s*\{\s*display:\s*flex[^}]*\}#i', '', $html);

        // Normalize equal height attributes on featured cards for maximum email client compatibility
        $isBottomAlign = str_contains($html, 'data-featured-link-align="bottom"');

        if ($isBottomAlign) {
            $html = preg_replace_callback(
                '#<table\b([^>]*class="[^"]*featured-grid-table[^"]*"[^>]*)>#i',
                function ($matches) {
                    $tag = $matches[0];
                    if (! str_contains($tag, 'height=')) {
                        $tag = str_replace('<table ', '<table height="100%" ', $tag);
                    }
                    if (str_contains($tag, 'style="') && ! str_contains($tag, 'height:')) {
                        $tag = preg_replace('#style="([^"]*)"#i', 'style="$1 height: 100%;"', $tag);
                    } elseif (! str_contains($tag, 'style=')) {
                        $tag = str_replace('<table ', '<table style="height: 100%;" ', $tag);
                    }

                    return $tag;
                },
                $html
            );

            $html = preg_replace_callback(
                '#<td\b([^>]*class="[^"]*(?:col-left|col-right)[^"]*"[^>]*)>#i',
                function ($matches) {
                    $tag = $matches[0];
                    if (! str_contains($tag, 'height=')) {
                        $tag = str_replace('<td ', '<td height="100%" ', $tag);
                    }
                    if (str_contains($tag, 'style="') && ! str_contains($tag, 'height:')) {
                        $tag = preg_replace('#style="([^"]*)"#i', 'style="$1 height: 100%;"', $tag);
                    } elseif (! str_contains($tag, 'style=')) {
                        $tag = str_replace('<td ', '<td style="height: 100%;" ', $tag);
                    }

                    return $tag;
                },
                $html
            );

            $html = preg_replace_callback(
                '#<table\b([^>]*class="[^"]*featured-card[^"]*"[^>]*)>#i',
                function ($matches) {
                    $tag = $matches[0];
                    $heightVal = '400';
                    if (preg_replace('#min-height:\s*(\d+)px#i', '$1', $tag) !== $tag) {
                        preg_match('#min-height:\s*(\d+)px#i', $tag, $hMatch);
                        if (! empty($hMatch[1]) && $hMatch[1] !== '560') {
                            $heightVal = $hMatch[1];
                        }
                    }
                    if (! str_contains($tag, 'height=')) {
                        $tag = str_replace('<table ', '<table height="'.$heightVal.'" ', $tag);
                    }
                    if (str_contains($tag, 'style="') && ! str_contains($tag, 'height:')) {
                        $tag = preg_replace('#style="([^"]*)"#i', 'style="$1 height: 100%;"', $tag);
                    }

                    return $tag;
                },
                $html
            );

            // Normalize legacy 2-row cards to 3-row layout with compact action row
            $html = preg_replace_callback(
                '#(<td[^>]*class="[^"]*featured-card-body-td[^"]*"[^>]*>)(.*?)(<div\s+class="featured-card-action"[^>]*>.*?</div>)\s*</td>\s*</tr>#is',
                function ($matches) {
                    $bodyTdOpen = preg_replace('#padding:\s*24px\s+22px\s+26px\s+22px#i', 'padding: 18px 18px 6px 18px', $matches[1]);
                    $content = $matches[2];
                    $action = $matches[3];

                    return $bodyTdOpen.$content.'</td></tr>'.
                        '<tr class="featured-card-action-tr" height="32"><td valign="bottom" height="32" style="padding: 0 18px 14px 18px; vertical-align: bottom; height: 32px;" class="featured-card-action-td">'.
                        $action.'</td></tr>';
                },
                $html
            );
        } else {
            // For flow alignment (link directly under description), remove any legacy forced heights that create huge white space
            $html = preg_replace('#(<table\b[^>]*class="[^"]*featured-card[^"]*"[^>]*)\s+height="(?:560|460)"#i', '$1', $html);
            $html = preg_replace('#(<table\b[^>]*class="[^"]*featured-card[^"]*"[^>]*style="[^"]*)\s*height:\s*100%;?#i', '$1', $html);
            $html = preg_replace('#(<table\b[^>]*class="[^"]*featured-card[^"]*"[^>]*style="[^"]*)\s*min-height:\s*(?:560|460)px;?#i', '$1', $html);
        }

        // Perform variable replacement
        $firstName = $subscriber->first_name ?: 'Subscriber';
        $lastName = $subscriber->last_name ?: '';
        $companyName = config('app.name', 'SL MarTech');

        $html = str_replace('{{first_name}}', e($firstName), $html);
        $html = str_replace('{{last_name}}', e($lastName), $html);
        $html = str_replace('{{email}}', e($subscriber->email), $html);
        $html = str_replace('{{company_name}}', e($companyName), $html);

        $unsubscribeUrl = route('public.unsubscribe', ['token' => $subscriber->unsubscribe_token]);
        $html = str_replace('{{unsubscribe_url}}', $unsubscribeUrl, $html);

        // Open tracking pixel tag
        $openTrackUrl = route('tracking.open', ['token' => $trackingToken]);
        $trackingPixel = '<img src="'.$openTrackUrl.'" width="1" height="1" style="display:none;" alt="" />';

        // Inject tracking pixel before </body> or at the end
        if (str_contains($html, '</body>')) {
            $html = str_replace('</body>', $trackingPixel.'</body>', $html);
        } else {
            $html .= $trackingPixel;
        }

        $this->renderedHtml = $html;
    }

    public function envelope(): Envelope
    {
        $subject = $this->campaign->subject ?? '';
        $subject = str_replace('{{first_name}}', $this->subscriber->first_name ?: 'Subscriber', $subject);
        $subject = str_replace('{{last_name}}', $this->subscriber->last_name ?: '', $subject);
        $subject = str_replace('{{company_name}}', config('app.name', 'SL MarTech'), $subject);
        $subject = str_replace('{{email}}', $this->subscriber->email, $subject);

        $senderEmail = $this->campaign->sender_email ?: config('mail.from.address');
        $senderName = $this->campaign->sender_name ?: config('mail.from.name', 'SL MarTech');

        return new Envelope(
            from: new Address($senderEmail, $senderName),
            subject: $subject,
        );
    }

    public function content(): Content
    {
        return new Content(
            htmlString: $this->renderedHtml,
        );
    }
}
