from flask import Response, request
from collections import OrderedDict
from services.share_service import ShareService
from repositories.share_repository import ShareRepository
import json


def get_shares():
    shares = ShareService.get_all_shares()
    response_data = []

    for share in shares:
        response_data.append(
            OrderedDict(
                [
                    ("ticker", share.ticker),
                    ("start", share.start),
                    ("end", share.end),
                    ("id", share.id),
                    ("prediction", share.prediction),
                ]
            )
        )

    return Response(json.dumps(response_data), mimetype="application/json")


def get_share(id):
    share = ShareService.get_share_by_id(id)
    if share:
        response_data = OrderedDict(
            [
                ("ticker", share.ticker),
                ("start", share.start),
                ("end", share.end),
                ("id", share.id),
                ("prediction", share.prediction),
            ]
        )
        return Response(json.dumps(response_data), mimetype="application/json")
    return (
        Response(json.dumps({"error": "Share not found"}), mimetype="application/json"),
        404,
    )


def create_share():
    data = request.json
    ticker = data.get("ticker")
    start = data.get("start")
    end = data.get("end")
    days = data.get("days", 30)

    new_share = ShareService.create_share(ticker, start, end, days)

    response_data = OrderedDict(
        [
            ("ticker", new_share.ticker),
            ("start", new_share.start),
            ("end", new_share.end),
            ("id", new_share.id),
            ("prediction", new_share.prediction),
        ]
    )

    return Response(json.dumps(response_data), mimetype="application/json"), 201


def update_share(id):
    data = request.json
    ticker = data.get("ticker")
    start = data.get("start")
    end = data.get("end")
    days = data.get("days", 30)

    updated_share = ShareService.update_share(id, ticker, start, end, days)
    if updated_share:
        response_data = OrderedDict(
            [
                ("ticker", updated_share.ticker),
                ("start", updated_share.start),
                ("end", updated_share.end),
                ("id", updated_share.id),
                ("prediction", updated_share.prediction),
            ]
        )
        return Response(json.dumps(response_data), mimetype="application/json")
    return (
        Response(json.dumps({"error": "Share not found"}), mimetype="application/json"),
        404,
    )


def delete_share(id):
    success = ShareService.delete_share(id)
    if success:
        return Response(
            json.dumps({"message": "Share deleted"}), mimetype="application/json"
        )
    return (
        Response(json.dumps({"error": "Share not found"}), mimetype="application/json"),
        404,
    )
