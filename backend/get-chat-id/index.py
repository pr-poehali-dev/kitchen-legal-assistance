import json
import os
import urllib.request
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all chats/channels where bot is admin to find chat_id
    Args: event with httpMethod
    Returns: HTTP response with recent updates containing chat IDs
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    
    if not bot_token:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'TELEGRAM_BOT_TOKEN not configured'}),
            'isBase64Encoded': False
        }
    
    # First delete webhook to allow getUpdates
    delete_webhook_url = f"https://api.telegram.org/bot{bot_token}/deleteWebhook"
    
    try:
        req = urllib.request.Request(delete_webhook_url, method='GET')
        urllib.request.urlopen(req, timeout=10)
        
        # Now get updates to see recent chats
        url = f"https://api.telegram.org/bot{bot_token}/getUpdates"
        req = urllib.request.Request(url, method='GET')
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        if not data.get('ok'):
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Telegram API error', 'details': data}),
                'isBase64Encoded': False
            }
        
        # Extract unique chats from updates
        updates = data.get('result', [])
        chats = {}
        
        for update in updates:
            if 'message' in update:
                chat = update['message'].get('chat', {})
                chat_id = chat.get('id')
                if chat_id:
                    chats[chat_id] = {
                        'chat_id': chat_id,
                        'type': chat.get('type'),
                        'title': chat.get('title', chat.get('first_name', 'Unknown')),
                        'username': chat.get('username', '')
                    }
            elif 'channel_post' in update:
                chat = update['channel_post'].get('chat', {})
                chat_id = chat.get('id')
                if chat_id:
                    chats[chat_id] = {
                        'chat_id': chat_id,
                        'type': chat.get('type'),
                        'title': chat.get('title', 'Unknown'),
                        'username': chat.get('username', '')
                    }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'chats': list(chats.values()),
                'instructions': 'Отправьте любое сообщение в канал, затем обновите эту страницу чтобы увидеть chat_id'
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }