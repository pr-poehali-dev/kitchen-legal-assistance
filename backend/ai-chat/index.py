import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any, List


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: AI chatbot for legal consultation about kitchen orders using YandexGPT
    Args: event with httpMethod, body containing messages array
    Returns: HTTP response with AI assistant reply
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
    
    # Parse request body
    body_str = event.get('body', '{}')
    if not body_str or body_str == '':
        body_str = '{}'
    
    body_data = json.loads(body_str)
    messages: List[Dict[str, str]] = body_data.get('messages', [])
    
    if not messages:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Messages array is required'}),
            'isBase64Encoded': False
        }
    
    # Get YandexGPT credentials from environment
    folder_id = os.environ.get('YANDEX_FOLDER_ID')
    api_key = os.environ.get('YANDEX_API_KEY')
    
    if not folder_id or not api_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'YandexGPT credentials not configured'}),
            'isBase64Encoded': False
        }
    
    # System prompt for legal assistant
    system_prompt = """Ты — юридический помощник компании "Закон Кухни", специализирующейся на защите прав потребителей при заказе кухонных гарнитуров.

Твоя задача:
1. Консультировать клиентов по вопросам защиты прав потребителей
2. Объяснять, как рассчитывается неустойка (3% в день от стоимости)
3. Рассказывать о порядке действий при просрочке или браке
4. Предлагать оставить заявку для бесплатной консультации с юристом

Ключевая информация:
- Неустойка: 3% от стоимости кухни за каждый день просрочки (максимум = стоимость кухни)
- При браке: можно требовать устранения, уменьшения цены или расторжения договора
- Штраф 50% от присужденной суммы, если дело дошло до суда
- Моральный вред: обычно 10-30 тыс. ₽
- Все судебные расходы взыскиваются с ответчика

Стиль общения:
- Дружелюбный, понятный язык без сложных юридических терминов
- Конкретные примеры и цифры
- В конце каждого ответа предлагай связаться с юристом для детальной консультации
- Телефон: 8 (905) 994-00-69

Важно:
- НЕ давай гарантий по конкретным делам (только юрист после анализа документов)
- НЕ называй точные суммы взыскания без анализа договора
- Всегда рекомендуй бесплатную консультацию для точного расчёта"""
    
    # Prepare messages for YandexGPT API
    yandex_messages = [{'role': 'system', 'text': system_prompt}]
    
    # Convert messages to YandexGPT format
    for msg in messages:
        yandex_messages.append({
            'role': msg['role'],
            'text': msg['content']
        })
    
    # Call YandexGPT API
    url = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Api-Key {api_key}',
        'x-folder-id': folder_id
    }
    
    data = {
        'modelUri': f'gpt://{folder_id}/yandexgpt-lite',
        'completionOptions': {
            'stream': False,
            'temperature': 0.6,
            'maxTokens': 500
        },
        'messages': yandex_messages
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode('utf-8'),
        headers=headers,
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            response_data = json.loads(response.read().decode('utf-8'))
        
        assistant_message = response_data['result']['alternatives'][0]['message']['text']
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'reply': assistant_message,
                'success': True
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
            'body': json.dumps({'error': f'Failed to get AI response: {str(e)}'}, ensure_ascii=False),
            'isBase64Encoded': False
        }
