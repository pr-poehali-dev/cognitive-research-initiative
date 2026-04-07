import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Получить список отзывов или добавить новый отзыв."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    try:
        if event.get("httpMethod") == "GET":
            cur.execute(
                "SELECT id, name, city, text, rating, created_at FROM reviews ORDER BY created_at DESC LIMIT 50"
            )
            rows = cur.fetchall()
            reviews = [
                {
                    "id": r[0],
                    "name": r[1],
                    "city": r[2],
                    "text": r[3],
                    "rating": r[4],
                    "created_at": r[5].isoformat(),
                }
                for r in rows
            ]
            return {"statusCode": 200, "headers": cors, "body": {"reviews": reviews}}

        if event.get("httpMethod") == "POST":
            body = json.loads(event.get("body") or "{}")
            name = (body.get("name") or "").strip()
            city = (body.get("city") or "").strip()
            text = (body.get("text") or "").strip()
            rating = int(body.get("rating") or 5)

            if not name or not text:
                return {"statusCode": 400, "headers": cors, "body": {"error": "name и text обязательны"}}
            if rating < 1 or rating > 5:
                rating = 5

            cur.execute(
                "INSERT INTO reviews (name, city, text, rating) VALUES (%s, %s, %s, %s) RETURNING id",
                (name, city, text, rating),
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            return {"statusCode": 201, "headers": cors, "body": {"id": new_id, "success": True}}

        return {"statusCode": 405, "headers": cors, "body": {"error": "Method not allowed"}}
    finally:
        cur.close()
        conn.close()
