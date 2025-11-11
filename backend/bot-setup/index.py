import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Check bot status and setup webhook for Telegram bot
    Args: event with httpMethod, body with action and bot_token
    Returns: HTTP response with status or webhook setup result
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
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    action = body_data.get('action', '')
    bot_token = body_data.get('bot_token', '')
    
    if not bot_token:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'bot_token is required'}),
            'isBase64Encoded': False
        }
    
    if action == 'check_status':
        status = check_bot_status(bot_token)
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(status),
            'isBase64Encoded': False
        }
    
    if action == 'setup_webhook':
        webhook_url = body_data.get('webhook_url', '')
        if not webhook_url:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'webhook_url is required'}),
                'isBase64Encoded': False
            }
        
        result = setup_webhook(bot_token, webhook_url)
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 400,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Invalid action'}),
        'isBase64Encoded': False
    }


def check_bot_status(bot_token: str) -> Dict[str, Any]:
    """Check bot info and webhook status"""
    try:
        # Get bot info
        bot_url = f"https://api.telegram.org/bot{bot_token}/getMe"
        req = urllib.request.Request(bot_url, method='GET')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            bot_data = json.loads(response.read().decode('utf-8'))
        
        if not bot_data.get('ok'):
            return {
                'success': False,
                'error': 'Invalid bot token'
            }
        
        bot_info = bot_data.get('result', {})
        
        # Get webhook info
        webhook_url = f"https://api.telegram.org/bot{bot_token}/getWebhookInfo"
        req = urllib.request.Request(webhook_url, method='GET')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            webhook_data = json.loads(response.read().decode('utf-8'))
        
        webhook_info = webhook_data.get('result', {})
        
        return {
            'success': True,
            'bot_username': bot_info.get('username', ''),
            'bot_name': bot_info.get('first_name', ''),
            'webhook_url': webhook_info.get('url', ''),
            'webhook_set': bool(webhook_info.get('url')),
            'pending_updates': webhook_info.get('pending_update_count', 0)
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }


def setup_webhook(bot_token: str, webhook_url: str) -> Dict[str, Any]:
    """Setup webhook for bot"""
    try:
        url = f"https://api.telegram.org/bot{bot_token}/setWebhook"
        
        data = urllib.parse.urlencode({
            'url': webhook_url
        }).encode('utf-8')
        
        req = urllib.request.Request(url, data=data, method='POST')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
        
        if result.get('ok'):
            return {
                'success': True,
                'message': 'Webhook успешно подключен!'
            }
        else:
            return {
                'success': False,
                'error': result.get('description', 'Unknown error')
            }
            
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }
