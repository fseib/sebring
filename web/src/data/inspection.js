// Checklist del peritaje de 180 puntos. Es el mismo para todas las unidades;
// el puntaje final y la fecha vienen de cada vehículo.
const inspectionCategories = [
  {
    title: 'Motor & Caja',
    points: 45,
    items: [
      'Compresión de cilindros óptima',
      'Sin pérdidas de aceite ni fluidos',
      'Turbo e intercooler limpios',
      'Caja automática sin golpes de cambio',
    ],
  },
  {
    title: 'Chasis y Tren Delantero',
    points: 50,
    items: [
      'Estructura monocasco sin impacto',
      'VTV vigente y aprobada en PBA/CABA',
      'Pastillas y discos al 85% de vida',
      'Alineación y combas comprobadas',
    ],
  },
  {
    title: 'Legal & DNRPA',
    points: 40,
    items: [
      'Formulario 12 Policial verificado',
      'Libre deuda de infracciones y patentes',
      'Grabado de cristales y autopartes ley',
      'Informe Dominio Histórico DNRPA limpio',
    ],
  },
  {
    title: 'Estética & Habitáculo',
    points: 45,
    items: [
      'Espesor de pintura original de fábrica',
      'Llantas sin roces ni golpes',
      'Cuero sanitizado con ozono',
      'Duplicado de llave original presente',
    ],
  },
]

export default inspectionCategories
