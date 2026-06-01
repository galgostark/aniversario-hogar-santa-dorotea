/**
 * BASE DE DATOS DE RECUERDOS - 38 ANIVERSARIO ASOCIACIÓN SANTA DOROTEA
 * 
 * INSTRUCCIONES PARA EL USUARIO:
 * 1. Para agregar tus fotos reales:
 *    - Guarda tus fotos escaneadas en la carpeta 'assets/' (por ejemplo: 'foto1.jpg', 'foto2.jpg').
 *    - Reemplaza el valor de 'url' en los elementos de abajo con la ruta de tu foto (ej. 'assets/foto1.jpg').
 * 2. Para agregar tu video real de la escuela:
 *    - Guarda el video digitalizado en la carpeta 'assets/' con el nombre 'video_construccion.mp4'.
 *    - La aplicación detectará automáticamente el archivo y lo reproducirá. Si aún no lo has colocado,
 *      la app mostrará un hermoso simulador retro interactivo de "cine antiguo".
 * 3. Puedes editar libremente los títulos y descripciones que se muestran en la pantalla.
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
        { id: "cee-todo", title: "Ver Todo (50 años)" },
        { id: "cee-construccion", title: "Construcción y Video" },
        { id: "cee-profesores", title: "Profesores de la Escuela" },
        { id: "cee-actuaciones", title: "Actuaciones y Teatros" },
        { id: "cee-alumnos", title: "Alumnos del Centro" }
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
      description: "Fundadores y primeras coordinadoras planificando las actividades de la Asociación Santa Dorotea en sus inicios.",
      url: "assets/inicios_1.png", // Reutilizamos temporalmente
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

    // --- CATEGORÍA: CENTRO DE EDUCACIÓN ESPECIAL (50 AÑOS) ---
    // Subcategoría: Construcción y Video
    {
      id: "cee-vid",
      categoryId: "cee",
      subcategoryId: "cee-construccion",
      type: "video",
      title: "Construcción de la Escuela (Video Digitalizado)",
      description: "El valioso registro audiovisual de los cimientos, el levantamiento de muros y el esfuerzo conjunto de la comunidad para construir las aulas del Centro de Educación Especial. ¡Dale Play para ver la historia!",
      url: "assets/video_construccion.mp4",
      thumbnailUrl: "assets/construccion_1.png",
      year: "1976"
    },
    {
      id: "cee-const-1",
      categoryId: "cee",
      subcategoryId: "cee-construccion",
      type: "image",
      title: "Poniendo los Primeros Ladrillos",
      description: "Voluntarios y padres de familia trabajando arduamente bajo el sol en la cimentación de las primeras aulas de la escuela.",
      url: "assets/construccion_1.png",
      year: "1976"
    },
    // Subcategoría: Profesores
    {
      id: "cee-prof-1",
      categoryId: "cee",
      subcategoryId: "cee-profesores",
      type: "image",
      title: "Cuerpo Docente de la Escuela (Bodas de Plata)",
      description: "Grupo de profesores pioneros que dedicaron su vida a la enseñanza especial, retratados en las aulas del Centro.",
      url: "assets/profesores_1.png",
      year: "1991"
    },
    // Subcategoría: Actuaciones
    {
      id: "cee-act-1",
      categoryId: "cee",
      subcategoryId: "cee-actuaciones",
      type: "image",
      title: "Obra Teatral Infantil CEE",
      description: "Presentación teatral de los alumnos del Centro de Educación Especial celebrando el día del niño en el patio central.",
      url: "assets/teatros_1.png", // Usando teatro
      year: "1998"
    },
    // Subcategoría: Alumnos
    {
      id: "cee-alumn-1",
      categoryId: "cee",
      subcategoryId: "cee-alumnos",
      type: "image",
      title: "Sonrisas en el Aula de Clase",
      description: "Alumnos compartiendo un momento de juego y estudio en la clase de desarrollo sensorial y motriz.",
      url: "assets/alumnos_1.png",
      year: "1985"
    },

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
