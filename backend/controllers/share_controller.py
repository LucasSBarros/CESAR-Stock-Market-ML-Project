from flask import request, jsonify
from services.share_service import ShareService
from repositories.share_repository import ShareRepository
from dtos.share_dto import ShareDTO


def get_shares():
    shares = ShareRepository.get_all_shares()
    return jsonify(
        [
            {
                "id": share.id,
                "ticker": share.ticker,
                "start": share.start,
                "end": share.end,
                "prediction": share.prediction,
            }
            for share in shares
        ]
    )


def get_share(id):
    share = ShareRepository.get_share_by_id(id)
    if share:
        return jsonify(
            {
                "id": share.id,
                "ticker": share.ticker,
                "start": share.start,
                "end": share.end,
                "prediction": share.prediction,
            }
        )
    return jsonify({"error": "Share not found"}), 404


def create_share():
    try:
        share_dto = ShareDTO.from_request_data(request.json)
        new_share = ShareService.create_share(
            share_dto.ticker, share_dto.start, share_dto.end, share_dto.days
        )
        return (
            jsonify(
                {
                    "id": new_share.id,
                    "ticker": new_share.ticker,
                    "start": new_share.start,
                    "end": new_share.end,
                    "prediction": new_share.prediction,
                }
            ),
            201,
        )
    except ValueError as e:
        return jsonify({"error": str(e)}), 400


def update_share(id):
    try:
        share_dto = ShareDTO.from_request_data(request.json)
        updated_share = ShareService.update_share(
            id, share_dto.ticker, share_dto.start, share_dto.end, share_dto.days
        )
        if updated_share:
            return jsonify(
                {
                    "id": updated_share.id,
                    "ticker": updated_share.ticker,
                    "start": updated_share.start,
                    "end": updated_share.end,
                    "prediction": updated_share.prediction,
                }
            )
        return jsonify({"error": "Share not found"}), 404
    except ValueError as e:
        return jsonify({"error": str(e)}), 400


def delete_share(id):
    success = ShareRepository.delete_share(id)
    if success:
        return jsonify({"message": "Share deleted"})
    return jsonify({"error": "Share not found"}), 404
