import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Telegram bot webhook that answers user questions using YandexGPT
    Args: event with httpMethod, body containing Telegram update
    Returns: HTTP response with 200 OK
    '''
    method: str = event.get('httpMethod', 'POST')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    # Parse Telegram update
    body_data = json.loads(event.get('body', '{}'))
    
    # Extract message
    message = body_data.get('message', {})
    chat_id = message.get('chat', {}).get('id')
    user_text = message.get('text', '')
    
    if not chat_id or not user_text:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}),
            'isBase64Encoded': False
        }
    
    # Get credentials
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    yandex_api_key = os.environ.get('YANDEX_API_KEY')
    folder_id = os.environ.get('YANDEX_FOLDER_ID')
    
    if not bot_token or not yandex_api_key or not folder_id:
        if bot_token:
            try:
                send_telegram_message(bot_token, chat_id, "⚠️ Бот не настроен. Обратитесь к администратору.")
            except:
                pass
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}),
            'isBase64Encoded': False
        }
    
    # Get AI response
    try:
        ai_response = get_yandex_gpt_response(user_text, yandex_api_key, folder_id)
        send_telegram_message(bot_token, chat_id, ai_response)
    except Exception as e:
        try:
            send_telegram_message(bot_token, chat_id, f"❌ Ошибка: {str(e)}")
        except:
            pass
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True}),
        'isBase64Encoded': False
    }


def get_yandex_gpt_response(user_message: str, api_key: str, folder_id: str) -> str:
    """Get response from YandexGPT"""
    
    system_prompt = """Ты юридический помощник компании "Кухни на заказ". Твоя задача:
1. Консультировать по вопросам возврата, неустойки, дефектов кухонной мебели
2. Объяснять права потребителей по Закону о защите прав потребителей
3. Давать четкие инструкции по действиям
4. Быть дружелюбным и понятным

При сложных вопросах предлагай позвонить: +7 (999) 123-45-67"""
    
    url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
    
    payload = {
        "modelUri": f"gpt://{folder_id}/yandexgpt-lite",
        "completionOptions": {
            "stream": False,
            "temperature": 0.6,
            "maxTokens": 2000
        },
        "messages": [
            {
                "role": "system",
                "text": system_prompt
            },
            {
                "role": "user",
                "text": user_message
            }
        ]
    }
    
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Api-Key {api_key}'
    }
    
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers, method='POST')
    
    with urllib.request.urlopen(req, timeout=30) as response:
        response_data = json.loads(response.read().decode('utf-8'))
    
    ai_text = response_data.get('result', {}).get('alternatives', [{}])[0].get('message', {}).get('text', '')
    
    if not ai_text:
        return "Извините, не удалось получить ответ. Попробуйте переформулировать вопрос."
    
    return ai_text


def send_telegram_message(bot_token: str, chat_id: int, text: str) -> None:
    """Send message to Telegram"""
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    
    payload = {
        'chat_id': chat_id,
        'text': text
    }
    
    data = json.dumps(payload).encode('utf-8')
    
    headers = {
        'Content-Type': 'application/json'
    }
    
    req = urllib.request.Request(url, data=data, headers=headers, method='POST')
    
    with urllib.request.urlopen(req, timeout=10) as response:
        response.read()