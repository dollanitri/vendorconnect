import pika
import test_nlp
import json

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.queue_declare(queue='sentiments')
channel.queue_declare(queue='results')

def callback(ch, method, properties, body):
  requestParams = json.loads(body.decode('utf-8'))
  results = test_nlp.show_sentiments(requestParams)
  channel.basic_publish(exchange='', routing_key='results', body=json.dumps(results, ensure_ascii=False))

# receive message and complete simulation
channel.basic_consume(on_message_callback=callback, queue='sentiments')

channel.start_consuming()
