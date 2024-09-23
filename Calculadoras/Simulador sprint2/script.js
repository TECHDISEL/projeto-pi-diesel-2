function calcular_diesel_tanque_deitado(){
    const altura_tanque = Number(alturaTotalDoTanque.value)
    const comprimento_tanque = Number(comprimentoDoTanque.value)
    const altura_atual_diesel = Number(alturaAtualDoDiesel.value)
    const raio_circunferencia_tanque = altura_tanque / 2
    const dias_reabastecimento = Number(diasReabastecimento.value)
    const diesel_utilizado_por_dia = Number(dieselUtilizadoPorDia.value)

    var altura_triangulo = altura_atual_diesel - raio_circunferencia_tanque
    var base_triangulo = Math.sqrt(Math.pow(raio_circunferencia_tanque, 2) - Math.pow(altura_triangulo, 2))
    var area_triangulos = altura_triangulo * base_triangulo

    var angulo_triangulos_radianos = Math.acos((altura_triangulo / raio_circunferencia_tanque))
    var angulo_triangulos_graus = angulo_triangulos_radianos * (180 / Math.PI)


    var angulo_seccao = 360 - (angulo_triangulos_graus * 2)
    var area_seccao = (Math.PI * Math.pow(raio_circunferencia_tanque, 2) * angulo_seccao) / 360

    var volume_diesel = (area_seccao + area_triangulos) * comprimento_tanque
    var volume_diesel_litros = volume_diesel * 1000

    resultado_volume_diesel.innerHTML = `
    O volume atual do Diesel é de (aproximadamente): <b>${(Math.floor(volume_diesel_litros).toLocaleString('pt-BR'))}L</b>.
    <br><br>
    É importante delimitar um volume mínimo de estoque do Diesel, para que seu negócio não tenha quebra de fluxo. <br>
    De acordo com o nosso cálculo, em cima dos dados informados, é possível dizer que o volume mínimo que você deve manter no seu tanque é de <b>${(dias_reabastecimento * diesel_utilizado_por_dia).toLocaleString('pt-BR')}L</b>.
    <br><br>
    Com o nosso projeto, é possível realizar esse monitoramento ao vivo. O sensor HC-SR04, sensor ultrassônico que mede distância, irá medir a distância do ponto mais alto do tanque até a altura atual do Diesel em relação ao tanque, permitindo realizar o cálculo do volume do combustível. 
    <br>
    Com essa informação, que apresentaremos através do dashboard do site institucional, você será capaz de realizar o controle para um fluxo mais efetivo do seu ambiente de trabalho, sem deixar máquinas paradas por falta do combustível. 
    `
}

function calcular_diesel_tanque_em_pe(){
    const altura_tanque = Number(alturaTotalDoTanque.value)
    const comprimento_tanque = Number(comprimentoDoTanque.value)
    const altura_atual_diesel = Number(alturaAtualDoDiesel.value)
    const raio_circunferencia_tanque = altura_tanque / 2
    const dias_reabastecimento = Number(diasReabastecimento.value)
    const diesel_utilizado_por_dia = Number(dieselUtilizadoPorDia.value)

    var volume_diesel = comprimento_tanque * Math.PI * Math.pow(raio_circunferencia_tanque, 2)
    var volume_diesel_litros = volume_diesel * 1000

    resultado_volume_diesel.innerHTML = `
    O volume atual do Diesel é de (aproximadamente): <b>${(Math.floor(volume_diesel_litros).toLocaleString('pt-BR'))}L</b>.
    <br><br>
    É importante delimitar um volume mínimo de estoque do Diesel, para que seu negócio não tenha quebra de fluxo. <br>
    De acordo com o nosso cálculo, em cima dos dados informados, é possível dizer que o volume mínimo que você deve manter no seu tanque é de <b>${(dias_reabastecimento * diesel_utilizado_por_dia.toLocaleString('pt-BR'))}L</b>.
    <br><br>
    Com o nosso projeto, é possível realizar esse monitoramento ao vivo. O sensor HC-SR04, sensor ultrassônico que mede distância, irá medir a distância do ponto mais alto do tanque até a altura atual do Diesel em relação ao tanque, permitindo realizar o cálculo do volume do combustível. 
    <br>
    Com essa informação, que apresentaremos através do dashboard do site institucional, você será capaz de realizar o controle para um fluxo mais efetivo do seu ambiente de trabalho, sem deixar máquinas paradas por falta do combustível. 
    `
}