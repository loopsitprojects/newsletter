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
        $rawHtml = $campaign->content_html ?? '';
        $html = preg_replace(
            '#https?://(?:127\.0\.0\.1|localhost)(?::\d+)?/storage/#i',
            $storageBaseUrl,
            $rawHtml
        );
        $html = preg_replace('#src=[\'"]/storage/#i', 'src="'.$storageBaseUrl, $html);
        $appBaseUrl = rtrim(config('app.url', url('/')), '/');
        $html = preg_replace('#src=[\'"]/favicon\.png[\'"]#i', 'src="'.$appBaseUrl.'/favicon.png"', $html);

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
        $subject = $this->campaign->subject;
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
