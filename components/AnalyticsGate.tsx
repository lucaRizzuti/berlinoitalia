"use client";

import { useEffect } from "react";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

const FLAG = "va-disabled";

/**
 * Wrapper di <Analytics /> che permette di escludere il proprio browser dal
 * tracciamento: visitando /?notrack=1 si salva un segnalino in localStorage
 * (persiste su quel browser/dispositivo); /?notrack=0 lo rimuove.
 * Non è un filtro per IP — Vercel Web Analytics non registra IP — ma
 * un opt-out per dispositivo, più stabile di un IP (che in Germania cambia
 * spesso sulle connessioni domestiche).
 */
export function AnalyticsGate() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const notrack = params.get("notrack");
    if (notrack === null) return;

    try {
      if (notrack === "0") {
        localStorage.removeItem(FLAG);
      } else {
        localStorage.setItem(FLAG, "1");
      }
    } catch {
      // localStorage non disponibile (es. modalità privata): ignora.
    }

    params.delete("notrack");
    const query = params.toString();
    const next = window.location.pathname + (query ? `?${query}` : "") + window.location.hash;
    window.history.replaceState({}, "", next);
  }, []);

  return (
    <Analytics
      beforeSend={(event: BeforeSendEvent) => {
        try {
          if (localStorage.getItem(FLAG) === "1") return null;
        } catch {
          // localStorage non disponibile: non filtrare.
        }
        return event;
      }}
    />
  );
}
