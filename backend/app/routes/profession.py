from flask import Blueprint, jsonify

from app.models.profession import Profession


profession_bp = Blueprint(
    "profession",
    __name__,
    url_prefix="/api/professions"
)


# =====================================
# GET ALL ACTIVE PROFESSIONS
# =====================================

@profession_bp.route("", methods=["GET"])
def get_professions():

    try:

        professions = (
            Profession.query
            .filter_by(active=True)
            .order_by(
                Profession.category.asc(),
                Profession.name.asc()
            )
            .all()
        )

        return jsonify([
            profession.to_dict()
            for profession in professions
        ]), 200

    except Exception as e:

        return jsonify({
            "message": "Failed to load professions",
            "error": str(e)
        }), 500
