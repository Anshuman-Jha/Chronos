import paho.mqtt.client as client


def on_message(client, userdata, msg):

    client = mqtt.Client("WeatherStation_subscriber")
    
    client.on_message = on_message

    client.connect(mqtt.broker.hivemq, 1883, 60)
    client.subscribe('weather/temperture')
    client.loop_forever()
    