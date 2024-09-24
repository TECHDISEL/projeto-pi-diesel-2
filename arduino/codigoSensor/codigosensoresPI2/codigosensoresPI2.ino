#include <Ultrasonic.h>

int trigger = 12; // Pino do trigger do sensor ultrassônico
int echo = 13;    // Pino do echo do sensor ultrassônico

Ultrasonic sensor(trigger, echo); // Inicializa o sensor ultrassônico



// ----------------------------------------------------------------------------------------------------------------------

void setup() {
    Serial.begin(9600); // Inicializa a comunicação serial
}

// ----------------------------------------------------------------------------------------------------------------------

void loop() {
    long distancia = sensor.distanceRead(); // Obtém a distância medida pelo sensor

    if(isnan(distancia)){
      Serial.println("Umidade: Erro ao ler os dados do sensor");
    } else {
      Serial.print(30);
      Serial.print(" ");
      Serial.print(5);
      Serial.print(" ");
      Serial.println(distancia);
    }


    delay(2000); // Aguarda 2 segundos antes da próxima leitura
}
