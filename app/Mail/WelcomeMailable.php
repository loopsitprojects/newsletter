<?php

namespace App\Mail;

use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeMailable extends Mailable
{
    use Queueable, SerializesModels;

    public Subscriber $subscriber;

    public function __construct(Subscriber $subscriber)
    {
        $this->subscriber = $subscriber;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to ' . config('app.name') . '! 🎉',
        );
    }

    public function content(): Content
    {
        $unsubscribeUrl = route('public.unsubscribe', ['token' => $this->subscriber->unsubscribe_token]);
        $html = '<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a;">You are officially subscribed! 🚀</h2>
            <p style="color: #475569;">Hi ' . e($this->subscriber->first_name ?: 'there') . ',</p>
            <p style="color: #475569;">Thank you for confirming your email! Your subscription is now active. You will start receiving our latest updates, insights, and exclusive announcements directly in your inbox.</p>
            <p style="color: #94a3b8; font-size: 13px; margin-top: 30px;">
                You can manage your preferences or <a href="' . $unsubscribeUrl . '" style="color: #64748b;">unsubscribe</a> anytime.
            </p>
        </div>';

        return new Content(
            htmlString: $html,
        );
    }
}
