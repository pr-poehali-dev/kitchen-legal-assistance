import json
import os
import urllib.request
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Test YandexGPT connection and credentials
    Args: event with httpMethod
    Returns: HTTP response with test results
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
    
    # Get credentials
    api_key = os.environ.get('YANDEX_API_KEY')
    folder_id = os.environ.get('YANDEX_FOLDER_ID')
    
    result = {
        'credentials_status': {
            'api_key_exists': bool(api_key),
            'folder_id_exists': bool(folder_id),
            'api_key_format': api_key[:10] + '...' if api_key else None,
            'folder_id_value': folder_id if folder_id else None
        }
    }
    
    # Try to make a test request to YandexGPT
    if api_key and folder_id:
        try:
            url = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion'
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Api-Key {api_key}'
            }
            
            data = {
                'modelUri': f'gpt://{folder_id}/yandexgpt-lite',
                'completionOptions': {
                    'stream': False,
                    'temperature': 0.6,
                    'maxTokens': 100
                },
                'messages': [
                    {
                        'role': 'user',
                        'text': 'Привет! Ответь одним словом: работает?'
                    }
                ]
            }
            
            req = urllib.request.Request(
                url,
                data=json.dumps(data).encode('utf-8'),
                headers=headers,
                method='POST'
            )
            
            with urllib.request.urlopen(req, timeout=10) as response:
                response_data = json.loads(response.read().decode('utf-8'))
            
            ai_reply = response_data.get('result', {}).get('alternatives', [{}])[0].get('message', {}).get('text', '')
            
            result['connection_test'] = {
                'success': True,
                'message': 'YandexGPT успешно подключен!',
                'ai_reply': ai_reply
            }
            
        except urllib.error.HTTPError as e:
            error_body = e.read().decode('utf-8')
            result['connection_test'] = {
                'success': False,
                'error': str(e),
                'error_details': error_body,
                'status_code': e.code
            }
        except Exception as e:
            result['connection_test'] = {
                'success': False,
                'error': str(e),
                'error_type': type(e).__name__
            }
    else:
        result['connection_test'] = {
            'success': False,
            'error': 'Credentials not found in environment'
        }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(result, ensure_ascii=False),
        'isBase64Encoded': False
    }