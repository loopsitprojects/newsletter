<?php

namespace App\Mail;

use App\Models\Campaign;
use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
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

        // Perform variable replacement
        $html = $campaign->content_html;
        $html = str_replace('{{first_name}}', e($subscriber->first_name ?? 'Subscriber'), $html);
        $html = str_replace('{{last_name}}', e($subscriber->last_name ?? ''), $html);
        $html = str_replace('{{email}}', e($subscriber->email), $html);
        $html = str_replace('{{company_name}}', config('app.name', 'Email Marketing Hub'), $html);

        $unsubscribeUrl = route('public.unsubscribe', ['token' => $subscriber->unsubscribe_token]);
        $html = str_replace('{{unsubscribe_url}}', $unsubscribeUrl, $html);

        // Open tracking pixel tag
        $openTrackUrl = route('tracking.open', ['token' => $trackingToken]);
        $trackingPixel = '<img src="' . $openTrackUrl . '" width="1" height="1" style="display:none;" alt="" />';

        // Inject tracking pixel before </body> or at the end
        if (str_contains($html, '</body>')) {
            $html = str_replace('</body>', $trackingPixel . '</body>', $html);
        } else {
            $html .= $trackingPixel;
        }

        $this->renderedHtml = $html;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->campaign->subject,
            from: $this->campaign->sender_email ?: config('mail.from.address'),
        );
    }

    public function content(): Content
    {
        return new Content(
            htmlString: $this->renderedHtml,
        );
    }
}
