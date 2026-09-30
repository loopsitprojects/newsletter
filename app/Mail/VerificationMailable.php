<?php

namespace App\Mail;

use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerificationMailable extends Mailable
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
            subject: 'Please confirm your subscription to ' . config('app.name'),
        );
    }

    public function content(): Content
    {
        $verifyUrl = route('public.verify', ['token' => $this->subscriber->verification_token]);
        $html = '<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a;">Confirm Your Subscription</h2>
            <p style="color: #475569;">Hello ' . e($this->subscriber->first_name ?: 'there') . ',</p>
            <p style="color: #475569;">Please click the button below to verify your email address and activate your subscription.</p>
            <p style="text-align: center; margin: 28px 0;">
                <a href="' . $verifyUrl . '" style="background: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Confirm Subscription</a>
            </p>
            <p style="color: #94a3b8; font-size: 13px;">If you did not request this, you can safely ignore this email.</p>
        </div>';

        return new Content(
            htmlString: $html,
        );
    }
}
