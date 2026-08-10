import base64
import os
from datetime import datetime
from urllib.parse import quote

import requests


class MpesaError(Exception):
    """Raised when an M-PESA Daraja operation fails."""


class MpesaService:

    def __init__(self):

        self.environment = os.getenv(
            "MPESA_ENVIRONMENT",
            "sandbox"
        ).lower()

        if self.environment == "production":

            self.base_url = (
                "https://api.safaricom.co.ke"
            )

        else:

            self.base_url = (
                "https://sandbox.safaricom.co.ke"
            )

        self.consumer_key = os.getenv(
            "MPESA_CONSUMER_KEY"
        )

        self.consumer_secret = os.getenv(
            "MPESA_CONSUMER_SECRET"
        )

        self.shortcode = os.getenv(
            "MPESA_SHORTCODE"
        )

        self.passkey = os.getenv(
            "MPESA_PASSKEY"
        )

        self.b2c_shortcode = os.getenv(
            "MPESA_B2C_SHORTCODE"
        )

        self.b2c_initiator_name = os.getenv(
            "MPESA_B2C_INITIATOR_NAME"
        )

        self.b2c_security_credential = os.getenv(
            "MPESA_B2C_SECURITY_CREDENTIAL"
        )

        self.callback_url = os.getenv(
            "MPESA_CALLBACK_URL"
        )

        self.b2c_result_url = os.getenv(
            "MPESA_B2C_RESULT_URL"
        )

        self.b2c_timeout_url = os.getenv(
            "MPESA_B2C_TIMEOUT_URL"
        )

    # =====================================
    # VALIDATE CONFIGURATION
    # =====================================

    def validate_config(self):

        required = {
            "MPESA_CONSUMER_KEY":
                self.consumer_key,

            "MPESA_CONSUMER_SECRET":
                self.consumer_secret,

            "MPESA_SHORTCODE":
                self.shortcode,

            "MPESA_PASSKEY":
                self.passkey,

            "MPESA_CALLBACK_URL":
                self.callback_url
        }

        missing = [
            name
            for name, value in required.items()
            if not value
            or value.startswith("YOUR_")
        ]

        if missing:

            raise MpesaError(
                "Missing M-PESA configuration: "
                + ", ".join(missing)
            )

    # =====================================
    # OAUTH ACCESS TOKEN
    # =====================================

    def get_access_token(self):

        self.validate_config()

        url = (
            f"{self.base_url}"
            "/oauth/v1/generate"
            "?grant_type=client_credentials"
        )

        credentials = (
            f"{self.consumer_key}:"
            f"{self.consumer_secret}"
        )

        encoded_credentials = base64.b64encode(
            credentials.encode("utf-8")
        ).decode("utf-8")

        headers = {
            "Authorization":
                f"Basic {encoded_credentials}"
        }

        try:

            response = requests.get(
                url,
                headers=headers,
                timeout=30
            )

        except requests.RequestException as exc:

            raise MpesaError(
                f"Unable to connect to M-PESA: {exc}"
            ) from exc

        if response.status_code != 200:

            raise MpesaError(
                "M-PESA OAuth failed: "
                f"HTTP {response.status_code} "
                f"{response.text}"
            )

        try:

            data = response.json()

        except ValueError as exc:

            raise MpesaError(
                "M-PESA OAuth returned invalid JSON"
            ) from exc

        access_token = data.get(
            "access_token"
        )

        if not access_token:

            raise MpesaError(
                "M-PESA OAuth response did not "
                "contain an access token"
            )

        return access_token

    # =====================================
    # STK PASSWORD
    # =====================================

    def generate_stk_password(self):

        if not self.shortcode:
            raise MpesaError(
                "MPESA_SHORTCODE is not configured"
            )

        if not self.passkey:
            raise MpesaError(
                "MPESA_PASSKEY is not configured"
            )

        timestamp = datetime.now().strftime(
            "%Y%m%d%H%M%S"
        )

        raw_password = (
            f"{self.shortcode}"
            f"{self.passkey}"
            f"{timestamp}"
        )

        password = base64.b64encode(
            raw_password.encode("utf-8")
        ).decode("utf-8")

        return password, timestamp

    # =====================================
    # NORMALIZE PHONE NUMBER
    # =====================================

    @staticmethod
    def normalize_phone(phone_number):

        if not phone_number:
            raise MpesaError(
                "Phone number is required"
            )

        phone = str(phone_number).strip()

        if phone.startswith("+254"):

            phone = phone[1:]

        elif phone.startswith("254"):

            pass

        elif phone.startswith("0"):

            phone = "254" + phone[1:]

        else:

            raise MpesaError(
                "Invalid Kenyan phone number"
            )

        if (
            len(phone) != 12
            or not phone.isdigit()
            or not phone.startswith("254")
        ):

            raise MpesaError(
                "Phone number must be in "
                "2547XXXXXXXX or 2541XXXXXXXX format"
            )

        return phone

    # =====================================
    # STK PUSH
    # =====================================

    def stk_push(
        self,
        amount,
        phone_number,
        account_reference,
        transaction_desc
    ):

        token = self.get_access_token()

        password, timestamp = (
            self.generate_stk_password()
        )

        phone = self.normalize_phone(
            phone_number
        )

        url = (
            f"{self.base_url}"
            "/mpesa/stkpush/v1/processrequest"
        )

        payload = {

            "BusinessShortCode":
                self.shortcode,

            "Password":
                password,

            "Timestamp":
                timestamp,

            "TransactionType":
                "CustomerPayBillOnline",

            "Amount":
                int(float(amount)),

            "PartyA":
                phone,

            "PartyB":
                self.shortcode,

            "PhoneNumber":
                phone,

            "CallBackURL":
                self.callback_url,

            "AccountReference":
                str(account_reference)[:12],

            "TransactionDesc":
                str(transaction_desc)[:13]
        }

        headers = {
            "Authorization":
                f"Bearer {token}",

            "Content-Type":
                "application/json"
        }

        try:

            response = requests.post(
                url,
                json=payload,
                headers=headers,
                timeout=30
            )

        except requests.RequestException as exc:

            raise MpesaError(
                f"STK Push connection failed: {exc}"
            ) from exc

        try:

            data = response.json()

        except ValueError:

            raise MpesaError(
                "M-PESA STK Push returned invalid JSON: "
                f"{response.text}"
            )

        if response.status_code != 200:

            raise MpesaError(
                "STK Push failed: "
                f"HTTP {response.status_code} "
                f"{data}"
            )

        return data


mpesa_service = MpesaService()
