// Écran de chargement Salimov : ligne qui se remplit puis deux rideaux qui s'ouvrent.
// Pur CSS : disparaît seul, sans JavaScript.
export default function Preloader() {
  return (
    <div className="sal-preloader" aria-hidden="true">
      <div className="line" />
    </div>
  );
}
