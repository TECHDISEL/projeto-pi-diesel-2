
const labels = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
];

const data = {
    labels: labels,
    datasets: [{
        label: 'Nível de Diesel',
        backgroundColor: '#3d6e60',
        borderColor: '#3d6e60',
        tension: 0.4,
        pointRadius: 0,
        data: [
            12.5, // 06:00 - Trabalho pesado nas plantações
            11.0, // 07:00 - Tratores em operação
            10.0, // 08:00 - Picos de uso de máquinas pesadas
            9.5,  // 09:00
            8.8,  // 10:00 - Continuação de colheita ou preparo
            8.0,  // 11:00 - Alta demanda de diesel
            7.8,  // 12:00 - Pausa para almoço, leve consumo
            7.5,  // 13:00 - Retorno ao trabalho, consumo moderado
            6.5,  // 14:00 - Máquinas em operação novamente
            5.5,  // 15:00 - Pico de uso no campo
            4.5,  // 16:00 - Uso contínuo de maquinário
            3.8,  // 17:00 - Fim das operações principais
            3.5,  // 18:00 - Manutenção de máquinas
            3.2,  // 19:00 - Consumo leve no final do dia
            2.8,  // 20:00 - Noite chegando, consumo reduzido
            2.7,  // 21:00 - Consumo quase parado
            2.7,  // 22:00 - Atividades mínimas
            2.6,  // 23:00 - Consumo mínimo
        ],
    },]
};

const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Litros (10³)',
                    font: {
                        size: 16
                    }
                },
                beginAtZero: true,
                responsive: true,
            }
        },
        plugins: {
            annotation: {
                annotations: {
                    linhaConstante: {
                        type: 'line',
                        yMin: 2.4,  // Posição da linha constante no eixo Y
                        yMax: 2.4,  // Mesma posição no eixo Y para ser horizontal
                        borderColor: 'orange',  // Cor da linha
                        borderWidth: 1.5,      // Espessura da linha
                        label: {
                            enabled: true,
                            position: 'start',   // Posição do texto (start, center, end)
                            color: 'orange',        // Cor do texto
                            font: {
                                size: 12,
                                weight: 'bold'
                            },
                            yAdjust: -10        // Ajuste a posição do texto acima da linha
                        }
                    },
                    linhaConstante3: {
                        type: 'line',
                        yMin: 1.6,  // Posição da linha constante no eixo Y
                        yMax: 1.6,  // Mesma posição no eixo Y para ser horizontal
                        borderColor: 'red',  // Cor da linha
                        borderWidth: 1.5,      // Espessura da linha
                        label: {
                            enabled: true,
                            position: 'start',   // Posição do texto (start, center, end)
                            color: 'red',        // Cor do texto
                            font: {
                                size: 12,
                                weight: 'bold'
                            },
                            yAdjust: -10        // Ajuste a posição do texto acima da linha
                        }
                    }
                }
            }
        }
    }
};

const labels2 = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const data2 = {
    labels: labels2,
    datasets: [{
        label: 'Consumo Mensal em Litros',
        backgroundColor: '#6dc0c0',
        borderColor: '#6dc0c0',
        data: [200, 100, 120, 150, 220, 110],
    }]
};

const config2 = {
    type: 'bar',
    data: data2,
    options: {
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Litros (10³)',
                    font: {
                        size: 16
                    }
                }
            }
        }
    }
};


const sensorDigital = new Chart(
    document.getElementById('sensorDigital'),
    config
);

const myChart2 = new Chart(
    document.getElementById('myChart2'),
    config2
);

var abrirMenuLateral = false
var sidebar = document.getElementById('sidebar')

function abrirMenuLateral() {

    if (!abrirMenuLateral) {
        sidebar.classList.add('sidebar-responsive')
        abrirMenuLateral = true
    }
}

function fecharMenuLateral() {

    if (abrirMenuLateral) {
        sidebar.classList.remove('sidebar-responsive')
        abrirMenuLateral = false
    }
}