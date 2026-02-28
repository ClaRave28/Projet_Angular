export interface Movie {
  id?: number;
  title: string;
  releaseDate: string;
  director: string;
  rate?: number;
  synopsis: string;
  image?: string;
  // Ajout des commentaires
  comment?: string;
  userRate?: number;
  userRateScena?:number;
  userRateActeurs?:number;
  userRateDecors?:number;
  noteMoyenne?:number;
  hasRated?: boolean;

}
