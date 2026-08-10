from datetime import datetime

from app.extensions import db


class WalletTransaction(db.Model):

    __tablename__ = "wallet_transactions"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    wallet_id = db.Column(
        db.Integer,
        db.ForeignKey("wallets.id"),
        nullable=False
    )

    transaction_type = db.Column(
        db.String(30),
        nullable=False
    )

    amount = db.Column(
        db.Float,
        nullable=False
    )

    status = db.Column(
        db.String(30),
        nullable=False,
        default="COMPLETED"
    )

    description = db.Column(
        db.String(255),
        nullable=True
    )

    reference = db.Column(
        db.String(100),
        unique=True,
        nullable=True
    )

    payment_id = db.Column(
        db.Integer,
        db.ForeignKey("payments.id"),
        nullable=True
    )

    # =====================================
    # M-PESA WITHDRAWAL TRACKING
    # =====================================

    phone_number = db.Column(
        db.String(30),
        nullable=True
    )

    mpesa_receipt_number = db.Column(
        db.String(100),
        nullable=True
    )

    originator_conversation_id = db.Column(
        db.String(100),
        nullable=True
    )

    result_code = db.Column(
        db.Integer,
        nullable=True
    )

    result_description = db.Column(
        db.String(255),
        nullable=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    wallet = db.relationship(
        "Wallet",
        backref=db.backref(
            "transactions",
            lazy=True
        )
    )

    payment = db.relationship(
        "Payment",
        backref=db.backref(
            "wallet_transaction",
            uselist=False
        )
    )

    def to_dict(self):

        return {

            "id":
                self.id,

            "wallet_id":
                self.wallet_id,

            "transaction_type":
                self.transaction_type,

            "amount":
                self.amount,

            "status":
                self.status,

            "description":
                self.description,

            "reference":
                self.reference,

            "payment_id":
                self.payment_id,

            # =====================================
            # M-PESA DATA
            # =====================================

            "phone_number":
                self.phone_number,

            "mpesa_receipt_number":
                self.mpesa_receipt_number,

            "originator_conversation_id":
                self.originator_conversation_id,

            "result_code":
                self.result_code,

            "result_description":
                self.result_description,

            "created_at":
                self.created_at.isoformat()
                if self.created_at
                else None

        }

    def __repr__(self):

        return f"<WalletTransaction {self.id}>"
