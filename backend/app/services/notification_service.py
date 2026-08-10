import logging

logger = logging.getLogger(__name__)


def send_email(to_email, subject, message):
    """
    Development email notification.

    Replace the implementation later with SendGrid,
    Resend, SMTP, or another production email provider.
    """

    if not to_email:
        logger.warning("Email notification skipped: no email address")
        return False

    logger.info(
        "\n========== EMAIL NOTIFICATION ==========\n"
        "TO: %s\n"
        "SUBJECT: %s\n"
        "MESSAGE:\n%s\n"
        "========================================\n",
        to_email,
        subject,
        message,
    )

    return True


def send_sms(phone_number, message):
    """
    Development SMS notification.

    Replace the implementation later with Africa's Talking,
    Twilio, or another production SMS provider.
    """

    if not phone_number:
        logger.warning("SMS notification skipped: no phone number")
        return False

    logger.info(
        "\n============ SMS NOTIFICATION ============\n"
        "TO: %s\n"
        "MESSAGE:\n%s\n"
        "==========================================\n",
        phone_number,
        message,
    )

    return True


def notify_wallet_credit(user, amount, reference, service_request_id):
    """
    Notify technician when money enters their wallet.
    """

    amount = float(amount)

    subject = "Nyũmba Dragon 888 - Wallet Payment Received"

    message = (
        f"Hello {user.full_name},\n\n"
        f"You have received KES {amount:,.2f} "
        f"in your Nyũmba Dragon 888 wallet.\n\n"
        f"Service Request: #{service_request_id}\n"
        f"Transaction Reference: {reference}\n\n"
        f"Your wallet has been credited successfully.\n\n"
        f"Nyũmba Dragon 888"
    )

    send_email(
        user.email,
        subject,
        message
    )

    send_sms(
        user.phone,
        (
            f"Nyũmba Dragon 888: "
            f"KES {amount:,.2f} has been credited to your wallet. "
            f"Ref: {reference}"
        )
    )


def notify_wallet_withdrawal(
    user,
    amount,
    phone_number,
    reference,
    balance
):
    """
    Notify technician after a wallet withdrawal.
    """

    amount = float(amount)
    balance = float(balance)

    subject = "Nyũmba Dragon 888 - Wallet Withdrawal"

    message = (
        f"Hello {user.full_name},\n\n"
        f"Your wallet withdrawal of KES {amount:,.2f} "
        f"has been completed successfully.\n\n"
        f"Sent to: {phone_number}\n"
        f"Withdrawal Reference: {reference}\n"
        f"Remaining Wallet Balance: KES {balance:,.2f}\n\n"
        f"Nyũmba Dragon 888"
    )

    send_email(
        user.email,
        subject,
        message
    )

    send_sms(
        user.phone,
        (
            f"Nyũmba Dragon 888: "
            f"Your withdrawal of KES {amount:,.2f} "
            f"was completed. "
            f"Ref: {reference}. "
            f"Balance: KES {balance:,.2f}"
        )
    )
