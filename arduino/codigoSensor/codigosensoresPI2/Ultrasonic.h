ifndef Ultrasonic_h
#define Ultrasonic_h

#include "Arduino.h"

class HC_SR04
{
	public:
		HC_SR04(uint8_t pintrigger, uint8_t pinecho);
		uint16_t distance();
	private:
		uint8_t _pintrigger;
		uint8_t	_pinecho;
		
};

#endif
