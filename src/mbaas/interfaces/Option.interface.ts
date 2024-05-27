export interface Option {
  img: string;
  description: string;
  infoVideo?: InfoVideo;
  kindPostMessage?: string;
}

export interface InfoVideo {
  contenido: string;
  encabezado: string;
  continuar: {
    texto: string;
  };
  video: {
    link: string;
  };
}
