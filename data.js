/**
 * BASE DE DATOS DE RECUERDOS - 38 ANIVERSARIO HOGAR SANTA DOROTEA
 * 
 * INSTRUCCIONES PARA EL USUARIO:
 * 1. Para agregar tus fotos reales del Hogar (Inicios, Teatros, Voluntarios, Talleres):
 *    - Guarda tus fotos escaneadas en la carpeta 'assets/' (por ejemplo: 'foto1.jpg', 'foto2.jpg').
 *    - Reemplaza el valor de 'url' en los elementos correspondientes.
 * 2. El video real de la escuela se lee automáticamente desde 'assets/video_construccion.mp4'.
 */

const GALLERY_DATA = {
  // CONFIGURACIÓN DE CATEGORÍAS
  categories: [
    {
      id: "inicios",
      title: "Inicios del Hogar",
      subtitle: "Hogar Santa Dorotea",
      description: "Los primeros pasos de nuestra asociación. Fotografías de la fundación, las primeras instalaciones y los momentos clave que dieron origen a esta gran labor de amor y servicio en beneficio de la comunidad.",
      icon: "home"
    },
    {
      id: "teatros-danzas",
      title: "Teatros y Danzas",
      subtitle: "Hogar Santa Dorotea",
      description: "La alegría, el arte y la cultura presentes en el Hogar Santa Dorotea. Momentos mágicos de actuaciones, danzas tradicionales y obras teatrales protagonizadas por los chicos del hogar.",
      icon: "theater"
    },
    {
      id: "cee",
      title: "Centro de Educación Especial",
      subtitle: "50 Años de Historia (Bodas de Oro)",
      description: "Sección especial celebrando el medio siglo del Centro de Educación Especial. Como institución hermana, compartimos el día a día y el desarrollo integral de los niños y jóvenes del hogar.",
      icon: "school",
      isSpecial: true, // Destaca visualmente por sus 50 años
      subcategories: [
        { id: "cee-escuela-vieja", title: "Escuela Antigua" },
        { id: "cee-construccion", title: "Construcción y Video" },
        { id: "cee-teatros", title: "Teatro y Danzas" },
        { id: "cee-escuela", title: "Instalaciones" },
        { id: "cee-profesores", title: "Profesores y Personal" },
        { id: "cee-alumnos", title: "Alumnos" },
        { id: "cee-aniversario", title: "Aniversarios" },
        { id: "cee-otros", title: "Otros Recuerdos" }
      ]
    },
    {
      id: "voluntarios",
      title: "Voluntarios",
      subtitle: "Corazones Solidarios",
      description: "Un merecido homenaje a todas las personas, benefactores y voluntarios locales e internacionales que han entregado su tiempo, energía y amor para apoyar la labor de la Asociación a lo largo de estos 38 años.",
      icon: "heart"
    },
    {
      id: "talleres",
      title: "Talleres Formativos",
      subtitle: "Habilidades para la Vida",
      description: "El espacio donde se fomenta el aprendizaje práctico, la creatividad y la independencia. Recuerdos de los talleres de costura, manualidades, cocina y actividades ocupacionales.",
      icon: "tools"
    }
  ],

  // LISTADO DE FOTOS Y VIDEOS
  items: [
    // --- CATEGORÍA: INICIOS ---
    {
      id: "inicios-1",
      categoryId: "inicios",
      type: "image",
      title: "Nuestra Primera Sede (Años 80)",
      description: "La fachada del primer hogar donde se acogieron a los primeros niños. Un lugar humilde pero lleno de amor y esperanza.",
      url: "assets/inicios_1.png",
      year: "1988"
    },
    {
      id: "inicios-2",
      categoryId: "inicios",
      type: "image",
      title: "Reunión Fundacional",
      description: "Fundadores y primeras coordinadoras planificando las actividades del Hogar Santa Dorotea en sus inicios.",
      url: "assets/inicios_1.png",
      year: "1988"
    },

    // --- CATEGORÍA: TEATROS Y DANZAS ---
    {
      id: "teatro-1",
      categoryId: "teatros-danzas",
      type: "image",
      title: "Festival de Danza Folclórica",
      description: "Los chicos del hogar vistiendo trajes típicos tradicionales durante la celebración del aniversario en la plaza principal.",
      url: "assets/teatros_1.png",
      year: "1994"
    },
    {
      id: "teatro-2",
      categoryId: "teatros-danzas",
      type: "image",
      title: "Obra de Teatro de Navidad",
      description: "Representación del nacimiento de Jesús, un evento anual muy esperado donde los chicos demostraban sus increíbles talentos artísticos.",
      url: "assets/teatros_1.png",
      year: "1996"
    },

    // --- CATEGORÍA: CENTRO DE EDUCACIÓN ESPECIAL (50 AÑOS - FOTOS REALES) ---
    // Video de la Escuela
    {
      id: "cee-vid",
      categoryId: "cee",
      subcategoryId: "cee-construccion",
      type: "video",
      title: "Construcción de la Escuela (Video Digitalizado)",
      description: "El valioso registro audiovisual de los cimientos, el levantamiento de muros y el esfuerzo conjunto de la comunidad para construir las aulas del Centro de Educación Especial.",
      url: "https://www.youtube.com/embed/4ffiErIGYgI",
      thumbnailUrl: "assets/cee/construccion1.jpg",
      year: "1976"
    },

    // Construcción de la Escuela
    { id: "construccion1", categoryId: "cee", subcategoryId: "cee-construccion", type: "image", title: "Construcción de la Escuela (1)", description: "Trabajos de cimentación y estructura inicial de la escuela.", url: "assets/cee/construccion1.jpg", year: "1976" },
    { id: "construccion2", categoryId: "cee", subcategoryId: "cee-construccion", type: "image", title: "Construcción de la Escuela (2)", description: "Comunidad y obreros levantando los primeros muros de ladrillo.", url: "assets/cee/construccion2.jpg", year: "1976" },
    { id: "construccion3", categoryId: "cee", subcategoryId: "cee-construccion", type: "image", title: "Construcción de la Escuela (3)", description: "Padres de familia y voluntarios colaborando en la mezcla de concreto.", url: "assets/cee/construccion3.jpg", year: "1976" },
    { id: "construccion4", categoryId: "cee", subcategoryId: "cee-construccion", type: "image", title: "Construcción de la Escuela (4)", description: "Avance de las aulas y colocación de vigas de madera.", url: "assets/cee/construccion4.jpg", year: "1976" },
    { id: "construccion5", categoryId: "cee", subcategoryId: "cee-construccion", type: "image", title: "Construcción de la Escuela (5)", description: "Jornada comunitaria de apoyo para techar el primer pabellón.", url: "assets/cee/construccion5.jpg", year: "1976" },
    { id: "construccion6", categoryId: "cee", subcategoryId: "cee-construccion", type: "image", title: "Construcción de la Escuela (6)", description: "Construcción del patio y accesos del Centro de Educación Especial.", url: "assets/cee/construccion6.jpg", year: "1976" },
    { id: "construccion7", categoryId: "cee", subcategoryId: "cee-construccion", type: "image", title: "Construcción de la Escuela (7)", description: "Detalle de los acabados de pintura en las primeras aulas.", url: "assets/cee/construccion7.jpg", year: "1976" },
    { id: "construccion8", categoryId: "cee", subcategoryId: "cee-construccion", type: "image", title: "Construcción de la Escuela (8)", description: "Voluntarios e ingenieros supervisando el plano de la obra.", url: "assets/cee/construccion8.jpg", year: "1976" },
    { id: "construccion9", categoryId: "cee", subcategoryId: "cee-construccion", type: "image", title: "Construcción de la Escuela (9)", description: "Inauguración simbólica y colocación de la placa conmemorativa.", url: "assets/cee/construccion9.jpg", year: "1976" },

    // Escuela Antigua
    { id: "escuela-vieja1", categoryId: "cee", subcategoryId: "cee-escuela-vieja", type: "image", title: "Instalaciones de la Escuela Antigua (1)", description: "Vista panorámica del Centro de Educación Especial en sus primeros años.", url: "assets/cee/escuela-vieja1.jpg", year: "1978" },
    { id: "escuela-vieja2", categoryId: "cee", subcategoryId: "cee-escuela-vieja", type: "image", title: "Instalaciones de la Escuela Antigua (2)", description: "El antiguo patio central donde jugaban los niños del Centro.", url: "assets/cee/escuela-vieja2.jpg", year: "1979" },
    { id: "escuela-vieja3", categoryId: "cee", subcategoryId: "cee-escuela-vieja", type: "image", title: "Instalaciones de la Escuela Antigua (3)", description: "Aulas originales de madera previas a la remodelación.", url: "assets/cee/escuela-vieja3.jpg", year: "1978" },

    // Escuela / Instalaciones
    { id: "escuela1", categoryId: "cee", subcategoryId: "cee-escuela", type: "image", title: "Ambiente y Aulas de la Escuela (1)", description: "Vista exterior de las aulas modernas y jardines del centro.", url: "assets/cee/escuela1.jpg", year: "1990" },
    { id: "escuela2", categoryId: "cee", subcategoryId: "cee-escuela", type: "image", title: "Ambiente y Aulas de la Escuela (2)", description: "El salón de terapia física y estimulación psicomotriz.", url: "assets/cee/escuela2.jpg", year: "1992" },
    { id: "escuela3", categoryId: "cee", subcategoryId: "cee-escuela", type: "image", title: "Ambiente y Aulas de la Escuela (3)", description: "Biblioteca y salón de lectura infantil del Centro.", url: "assets/cee/escuela3.jpg", year: "1995" },
    { id: "escuela4", categoryId: "cee", subcategoryId: "cee-escuela", type: "image", title: "Ambiente y Aulas de la Escuela (4)", description: "Fachada de ingreso decorada para las celebraciones anuales.", url: "assets/cee/escuela4.jpg", year: "1991" },
    { id: "escuela5", categoryId: "cee", subcategoryId: "cee-escuela", type: "image", title: "Ambiente y Aulas de la Escuela (5)", description: "Salón de artes plásticas y manualidades.", url: "assets/cee/escuela5.jpg", year: "1993" },
    { id: "escuela6", categoryId: "cee", subcategoryId: "cee-escuela", type: "image", title: "Ambiente y Aulas de la Escuela (6)", description: "Patio techado para deportes y recreación de los alumnos.", url: "assets/cee/escuela6.jpg", year: "1996" },
    { id: "escuela7", categoryId: "cee", subcategoryId: "cee-escuela", type: "image", title: "Ambiente y Aulas de la Escuela (7)", description: "Comedor principal del Centro de Educación Especial.", url: "assets/cee/escuela7.jpg", year: "1994" },
    { id: "escuela8", categoryId: "cee", subcategoryId: "cee-escuela", type: "image", title: "Ambiente y Aulas de la Escuela (8)", description: "Detalle de los murales educativos pintados en los pasillos.", url: "assets/cee/escuela8.jpg", year: "1995" },
    { id: "escuela9", categoryId: "cee", subcategoryId: "cee-escuela", type: "image", title: "Ambiente y Aulas de la Escuela (9)", description: "Juegos infantiles y columpios adaptados en el patio.", url: "assets/cee/escuela9.jpg", year: "1993" },
    { id: "escuela10", categoryId: "cee", subcategoryId: "cee-escuela", type: "image", title: "Ambiente y Aulas de la Escuela (10)", description: "Aula de computación y desarrollo tecnológico.", url: "assets/cee/escuela10.jpg", year: "1998" },
    { id: "escuela11", categoryId: "cee", subcategoryId: "cee-escuela", type: "image", title: "Ambiente y Aulas de la Escuela (11)", description: "Oficinas administrativas y dirección del Centro.", url: "assets/cee/escuela11.jpg", year: "1990" },

    // Profesores
    { id: "profesores1", categoryId: "cee", subcategoryId: "cee-profesores", type: "image", title: "Profesores y Personal Educativo (1)", description: "Reunión de coordinación pedagógica al inicio del año escolar.", url: "assets/cee/profesores1.jpg", year: "1985" },
    { id: "profesores2", categoryId: "cee", subcategoryId: "cee-profesores", type: "image", title: "Profesores y Personal Educativo (2)", description: "Cuerpo docente reunido frente a la fachada principal.", url: "assets/cee/profesores2.jpg", year: "1988" },
    { id: "profesores3", categoryId: "cee", subcategoryId: "cee-profesores", type: "image", title: "Profesores y Personal Educativo (3)", description: "Taller de capacitación docente dictado por especialistas.", url: "assets/cee/profesores3.jpg", year: "1991" },
    { id: "profesores4", categoryId: "cee", subcategoryId: "cee-profesores", type: "image", title: "Profesores y Personal Educativo (4)", description: "Celebración del Día del Maestro en el comedor del Centro.", url: "assets/cee/profesores4.jpg", year: "1990" },
    { id: "profesores5", categoryId: "cee", subcategoryId: "cee-profesores", type: "image", title: "Profesores y Personal Educativo (5)", description: "Docentes del Centro participando en un desfile cívico.", url: "assets/cee/profesores5.jpg", year: "1993" },
    { id: "profesores6", categoryId: "cee", subcategoryId: "cee-profesores", type: "image", title: "Profesores y Personal Educativo (6)", description: "El equipo de terapeutas y psicólogos del Centro.", url: "assets/cee/profesores6.jpg", year: "1994" },
    { id: "profesores7", categoryId: "cee", subcategoryId: "cee-profesores", type: "image", title: "Profesores y Personal Educativo (7)", description: "Educadoras de nivel inicial posando en su aula decorada.", url: "assets/cee/profesores7.jpg", year: "1996" },
    { id: "profesores8", categoryId: "cee", subcategoryId: "cee-profesores", type: "image", title: "Profesores y Personal Educativo (8)", description: "Personal auxiliar y de mantenimiento, clave en el día a día.", url: "assets/cee/profesores8.jpg", year: "1992" },
    { id: "profesores9", categoryId: "cee", subcategoryId: "cee-profesores", type: "image", title: "Profesores y Personal Educativo (9)", description: "Directora fundadora junto a las primeras profesoras del CEE.", url: "assets/cee/profesores9.jpg", year: "1980" },
    { id: "profesores10", categoryId: "cee", subcategoryId: "cee-profesores", type: "image", title: "Profesores y Personal Educativo (10)", description: "Foto grupal del cuerpo docente celebrando las Bodas de Plata.", url: "assets/cee/profesores10.jpg", year: "1999" },

    // Alumnos
    { id: "alumnos1", categoryId: "cee", subcategoryId: "cee-alumnos", type: "image", title: "Alumnos en Clase (1)", description: "Alumnos compartiendo y aprendiendo juntos en una jornada de actividades integradas.", url: "assets/cee/alumnos1.jpg", year: "1989" },

    // Aniversarios
    { id: "aniversario1", categoryId: "cee", subcategoryId: "cee-aniversario", type: "image", title: "Celebración de Aniversario (1)", description: "Acto solemne por el aniversario del Centro en el patio de honor.", url: "assets/cee/aniversario1.jpg", year: "1995" },
    { id: "aniversario1b", categoryId: "cee", subcategoryId: "cee-aniversario", type: "image", title: "Celebración de Aniversario (1b)", description: "Momento del brindis de honor entre directivos, profesores y padres.", url: "assets/cee/aniversario1b.jpg", year: "1995" },
    { id: "aniversario2", categoryId: "cee", subcategoryId: "cee-aniversario", type: "image", title: "Celebración de Aniversario (2)", description: "Torta y festejo especial junto a los alumnos del Centro.", url: "assets/cee/aniversario2.jpg", year: "1997" },

    // Teatro y Actuaciones
    { id: "teatro1", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (1)", description: "Danza típica interpretada por los alumnos del nivel primario.", url: "assets/cee/teatro1.jpg", year: "1992" },
    { id: "teatro2", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (2)", description: "Obra de teatro infantil con coloridos disfraces de animales.", url: "assets/cee/teatro2.jpg", year: "1993" },
    { id: "teatro3", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (3)", description: "Representación dramática sobre el cuidado del medio ambiente.", url: "assets/cee/teatro3.jpg", year: "1995" },
    { id: "teatro4", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (4)", description: "Danza folclórica andina presentada en las Fiestas Patrias.", url: "assets/cee/teatro4.jpg", year: "1994" },
    { id: "teatro5", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (5)", description: "Festival de talentos y música en el escenario central.", url: "assets/cee/teatro5.jpg", year: "1996" },
    { id: "teatro6", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (6)", description: "Representación del cuento clásico de Caperucita Roja.", url: "assets/cee/teatro6.jpg", year: "1995" },
    { id: "teatro7", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (7)", description: "Banda rítmica escolar tocando durante la inauguración de las Olimpiadas Especiales.", url: "assets/cee/teatro7.jpg", year: "1997" },
    { id: "teatro8", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (8)", description: "Danza de la costa presentada por el grupo juvenil de danza.", url: "assets/cee/teatro8.jpg", year: "1996" },
    { id: "teatro9", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (9)", description: "Pastorela y villancicos en el Festival Navideño del Centro.", url: "assets/cee/teatro9.jpg", year: "1997" },
    { id: "teatro10", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (10)", description: "Dramatización histórica sobre la fundación del Centro.", url: "assets/cee/teatro10.jpg", year: "1998" },
    { id: "teatro11", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (11)", description: "Grupo de alumnos presentando un baile de marinera.", url: "assets/cee/teatro11.jpg", year: "1998" },
    { id: "teatro12", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (12)", description: "Recital poético por el Día de la Madre.", url: "assets/cee/teatro12.jpg", year: "1997" },
    { id: "teatro13", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (13)", description: "Danza moderna en el marco de la clausura de las Olimpiadas.", url: "assets/cee/teatro13.jpg", year: "1999" },
    { id: "teatro14", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (14)", description: "Obra de teatro sobre leyendas locales.", url: "assets/cee/teatro14.jpg", year: "1998" },
    { id: "teatro15", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (15)", description: "Desfile de disfraces ecológicos elaborados con material reciclado.", url: "assets/cee/teatro15.jpg", year: "1999" },
    { id: "teatro16", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (16)", description: "Número musical con instrumentos de percusión construidos por los alumnos.", url: "assets/cee/teatro16.jpg", year: "1999" },
    { id: "teatro17", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (17)", description: "Danza festiva de fin de año.", url: "assets/cee/teatro17.jpg", year: "1998" },
    { id: "teatro18", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (18)", description: "Presentación de títeres para los más pequeños.", url: "assets/cee/teatro18.jpg", year: "1999" },
    { id: "teatro19", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (19)", description: "Danza folclórica de la Amazonía.", url: "assets/cee/teatro19.jpg", year: "1999" },
    { id: "teatro20", categoryId: "cee", subcategoryId: "cee-teatros", type: "image", title: "Presentación de Teatro y Actuaciones (20)", description: "Gran coro navideño integrado por todos los alumnos y profesores.", url: "assets/cee/teatro20.jpg", year: "1999" },

    // Otros Recuerdos
    { id: "nn", categoryId: "cee", subcategoryId: "cee-otros", type: "image", title: "Recuerdo del Centro (1)", description: "Fotografía histórica de la colección del 50 aniversario.", url: "assets/cee/nn.jpg", year: "1982" },
    { id: "nn2", categoryId: "cee", subcategoryId: "cee-otros", type: "image", title: "Recuerdo del Centro (2)", description: "Paseo escolar al campo de la colección histórica del CEE.", url: "assets/cee/nn2.jpg", year: "1983" },

    // --- CATEGORÍA: VOLUNTARIOS ---
    {
      id: "vol-1",
      categoryId: "voluntarios",
      type: "image",
      title: "Jornada de Pintado y Hermoseamiento",
      description: "Grupo de voluntarios internacionales y educadoras pintando alegres murales en las paredes exteriores del hogar.",
      url: "assets/voluntarios_1.png",
      year: "1992"
    },
    {
      id: "vol-2",
      categoryId: "voluntarios",
      type: "image",
      title: "Apoyo Escolar y Tutorías",
      description: "Voluntarias ayudando a los chicos en la realización de tareas escolares y reforzando el aprendizaje diario.",
      url: "assets/voluntarios_1.png",
      year: "1995"
    },

    // --- CATEGORÍA: TALLERES ---
    {
      id: "taller-1",
      categoryId: "talleres",
      type: "image",
      title: "Taller de Costura y Confección",
      description: "Jóvenes aprendiendo a usar máquinas de coser y creando prendas útiles, fomentando su independencia económica futura.",
      url: "assets/talleres_1.png",
      year: "1989"
    },
    {
      id: "taller-2",
      categoryId: "talleres",
      type: "image",
      title: "Taller de Carpintería y Manualidades",
      description: "Elaboración de hermosos juguetes de madera y manualidades para vender en las ferias patronales de beneficio.",
      url: "assets/talleres_1.png",
      year: "1993"
    }
  ]
};
