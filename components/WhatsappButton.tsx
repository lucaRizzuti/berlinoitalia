import { site } from "@/lib/site";

export function WhatsappButton() {
  return (
    <a
      href={site.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      className="fixed bottom-5 right-4 z-50 inline-flex items-center gap-2 border-2 border-ink bg-[#25D366] px-4 py-3 font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-white shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
    >
      <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.21c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.66.15-.19.29-.76.94-.93 1.13-.17.19-.34.22-.63.07-.29-.15-1.21-.45-2.3-1.43-.85-.76-1.42-1.69-1.59-1.98-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.58-.49-.5-.66-.5h-.56c-.19 0-.49.07-.75.37-.26.29-.98.96-.98 2.34 0 1.38 1 2.71 1.14 2.9.15.19 1.97 3 4.78 4.21.67.29 1.2.46 1.61.59.68.22 1.29.19 1.78.12.54-.08 1.72-.7 1.96-1.37.24-.66.24-1.23.17-1.37-.07-.15-.27-.22-.56-.37z" />
        <path d="M16.01 3C8.83 3 3 8.82 3 16c0 2.53.74 4.99 2.13 7.09L3 29l6.1-2.05A12.93 12.93 0 0016.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.67c-2.14 0-4.24-.57-6.08-1.66l-.44-.26-3.62 1.22 1.18-3.53-.29-.46A10.62 10.62 0 015.33 16c0-5.89 4.79-10.68 10.68-10.68S26.69 10.11 26.69 16s-4.79 10.67-10.68 10.67z" />
      </svg>
      <span className="hidden sm:inline">Scrivici su WhatsApp</span>
    </a>
  );
}
