#include <Ultrasonic.h>

#include "Ultrasonic.h"

int trigger = 12;
int echo = 13;


HC_SR04 sensor(trigger, echo);

const int PINO_SENSOR_TEMPERATURA = A0;


float temperaturaCelsius;
float tempMax;
float tempMin;

void setup() {
    Serial.begin(9600);
}

void loop(){

long distancia = sensor.distance();

int valorLeitura = analogRead(PINO_SENSOR_TEMPERATURA);
temperaturaCelsius = (valorLeitura * 5.0 / 1023.0) / 0.01;

	Serial.print("Distância:");
	Serial.print(distancia);
	Serial.print(" ");
  Serial.println();

  
  Serial.print("Temperatura:");
	Serial.print(temperaturaCelsius);
  Serial.print(" ");
  

Serial.print("tempMax:");
    Serial.print(52);
    Serial.print(" ");

    Serial.print("tempMin:");
    Serial.print(21);
    Serial.println();

delay(2000);

}
