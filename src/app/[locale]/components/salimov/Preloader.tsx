'use client'

import { useEffect } from "react";

// Mémorise (pour la durée de la page) que l'écran de chargement a déjà été joué :
// un changement de langue recrée la page sans rechargement, il ne doit pas le rejouer.
let played = false;

// Écran de chargement Salimov : ligne qui se remplit puis deux rideaux qui s'ouvrent.
// Rendu côté serveur (visible dès le premier affichage), animé en CSS pur.
export default function Preloader() {
  const skip = played;

  useEffect(() => {
    played = true;
  }, []);

  // Hydratation : au premier chargement `played` est faux des deux côtés, donc identique au serveur.
  if (skip) return null;

  return (
    <div className="sal-preloader" aria-hidden="true">
      <div className="line" />
    </div>
  );
}
