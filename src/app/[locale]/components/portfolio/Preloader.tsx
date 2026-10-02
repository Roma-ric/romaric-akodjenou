// Écran de chargement en CSS pur : il disparaît tout seul (voir globals.css),
// sans JavaScript et sans masquer le contenu pour les moteurs de recherche.
export default function Preloader() {
  return (
    <div
      aria-hidden="true"
      className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black"
    >
      <div className="preloader-line h-1 w-40 origin-left rounded-full bg-yellow-500" />
    </div>
  );
}
