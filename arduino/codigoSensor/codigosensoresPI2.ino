#include <Ultrasonic.h>

int trigger = 12; // Pino do trigger do sensor ultrassônico
int echo = 13;    // Pino do echo do sensor ultrassônico

Ultrasonic sensor(trigger, echo); // Inicializa o sensor ultrassônico

const int distanciaMin = 5;  // Distância mínima aceitável
const int distanciaMax = 100; // Distância máxima aceitável

// ----------------------------------------------------------------------------------------------------------------------

void setup() {
    Serial.begin(9600); // Inicializa a comunicação serial
}

// ----------------------------------------------------------------------------------------------------------------------

void loop() {
    long distancia = sensor.distance(); // Obtém a distância medida pelo sensor

    // Exibe a distância medida
    Serial.print("Distância: ");
    Serial.print(distancia);
    Serial.println(" cm");

    // Exibe os valores mínimos e máximos
    Serial.print("Distância Mínima: ");
    Serial.print(distanciaMin);
    Serial.println(" cm");

    Serial.print("Distância Máxima: ");
    Serial.print(distanciaMax);
    Serial.println(" cm");

    delay(2000); // Aguarda 2 segundos antes da próxima leitura
}
